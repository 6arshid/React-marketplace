<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Attribute;
use App\Models\User;
use App\Models\StripeConfig;
use App\Models\Transaction;
use App\Models\Order;
use Illuminate\Support\Str;
use Stripe\StripeClient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class CartController extends Controller
{
    public function add(Request $request, Product $product)
    {
        $attributeId = $request->input('attribute_id');
        $attribute = null;
        if ($attributeId) {
            $attribute = Attribute::where('product_id', $product->id)->find($attributeId);
        }

        $cart = session()->get('cart', ['seller_id' => null, 'items' => []]);

        if ($cart['seller_id'] && $cart['seller_id'] != $product->user_id) {
            return Redirect::back()->with('error', 'Cart contains products from another seller. Please empty it first.');
        }

        if (! $cart['seller_id']) {
            $cart['seller_id'] = $product->user_id;
        }

        $cart['items'][] = [
            'product_id' => $product->id,
            'attribute_id' => $attribute?->id,
            'price' => $attribute?->price ?? $product->price,
        ];

        session(['cart' => $cart]);

        return Redirect::back()->with('success', 'Added to cart');
    }

    public function show()
    {
        $cart = session('cart', ['seller_id' => null, 'items' => []]);

        $items = collect($cart['items'])->map(function ($item) {
            $product = Product::find($item['product_id']);
            $attribute = $item['attribute_id'] ? Attribute::find($item['attribute_id']) : null;

            return [
                'product_title' => $product?->title,
                'attribute' => $attribute ? $attribute->title . ' - ' . $attribute->option : null,
                'price' => $item['price'],
                'is_digital' => $product?->is_digital,
            ];
        });
        $requiresShipping = $items->contains(fn ($i) => ! $i['is_digital']);

        $seller = null;
        if ($cart['seller_id']) {
            $user = User::find($cart['seller_id']);
            if ($user) {
                $seller = [
                    'id' => $user->id,
                    'name' => $user->name,
                    'whatsapp_number' => $user->whatsapp_number,
                    'telegram_username' => $user->telegram_username,
                    'public_email' => $user->public_email,
                    'stripe_api_key' => $user->stripe_api_key,
                    'pro_panel' => $user->pro_panel,
                ];
            }
        }

        return \Inertia\Inertia::render('Cart/Index', [
            'items' => $items,
            'total' => $items->sum('price'),
            'seller' => $seller,
            'requires_shipping' => $requiresShipping,
        ]);
    }

    public function checkout(Request $request)
    {
        $cart = session('cart', ['seller_id' => null, 'items' => []]);

        if (! $cart['seller_id'] || count($cart['items']) === 0) {
            return Redirect::route('cart.show')->with('error', 'Cart is empty');
        }

        $seller = User::findOrFail($cart['seller_id']);
        $total = collect($cart['items'])->sum('price');

        $requiresShipping = collect($cart['items'])->contains(function ($item) {
            $product = Product::find($item['product_id']);
            return $product && ! $product->is_digital;
        });

        $shipping = null;
        if ($requiresShipping) {
            $shipping = $request->validate([
                'first_name' => 'required|string',
                'last_name' => 'required|string',
                'email' => 'required|email',
                'address' => 'required|string',
                'postal_code' => 'required|string',
                'phone' => 'required|string',
            ]);
        }

        if ($seller->pro_panel && $seller->stripe_secret_key) {
            $secret = $seller->stripe_secret_key;
            $commission = 0;
        } else {
            $config = StripeConfig::firstOrFail();
            $secret = $config->secret_key;
            $commission = $total * (($config->commission_percent ?? 2) / 100);
        }

        $stripe = new StripeClient($secret);
        $intent = $stripe->paymentIntents->create([
            'amount' => (int) ($total * 100),
            'currency' => 'usd',
            'payment_method_types' => ['card'],
        ]);

        Transaction::create([
            'user_id' => $seller->id,
            'amount' => (int) ($total - $commission),
            'status' => 'pending',
            'reference' => $intent->id,
        ]);

        $order = Order::create([
            'buyer_id' => $request->user()->id,
            'seller_id' => $seller->id,
            'items' => $cart['items'],
            'amount' => (int) $total,
            'shipping_info' => $shipping,
            'is_digital' => ! $requiresShipping,
            'status' => 'pending',
            'tracking_code' => (string) \Illuminate\Support\Str::uuid(),
        ]);

        session()->forget('cart');

        return response()->json([
            'client_secret' => $intent->client_secret,
            'tracking_code' => $order->tracking_code,
        ]);
    }
}
