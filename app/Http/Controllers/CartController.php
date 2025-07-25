<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Attribute;
use App\Models\User;
use App\Models\StripeConfig;
use App\Models\Transaction;
use App\Models\Order;
use App\Notifications\OrderPlaced;
use App\Notifications\OrderStatusUpdated;
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
            return Redirect::back()->with('error', __('messages.cart_other_seller'));
        }

        if (! $cart['seller_id']) {
            $cart['seller_id'] = $product->user_id;
        }

        $cart['items'][] = [
            'product_id' => $product->id,
            'attribute_id' => $attribute?->id,
            'price' => $attribute?->price ?? $product->price,
            'shipping_cost' => $product->is_digital ? 0 : ($product->shipping_cost ?? 0),
            'is_digital' => $product->is_digital,
        ];

        session(['cart' => $cart]);

        return Redirect::back()->with('success', __('messages.cart_item_added'));
    }

    public function show()
    {
        $cart = session('cart', ['seller_id' => null, 'items' => []]);

        $items = collect($cart['items'])->map(function ($item) {
            $product = Product::find($item['product_id']);
            $attribute = $item['attribute_id'] ? Attribute::find($item['attribute_id']) : null;

            $shippingCost = $item['shipping_cost'] ?? ($product && ! $product->is_digital ? ($product->shipping_cost ?? 0) : 0);

            return [
                'product_title' => $product?->title,
                'product_slug'  => $product?->slug,
                'attribute' => $attribute ? $attribute->title . ' - ' . $attribute->option : null,
                'price' => $item['price'],
                'shipping_cost' => $shippingCost,
                'is_digital' => $product?->is_digital,
            ];
        });
        $requiresShipping = $items->contains(fn ($i) => ! $i['is_digital']);
        $total = $items->sum(fn ($i) => $i['price'] + $i['shipping_cost']);

        $seller = null;
        if ($cart['seller_id']) {
            $user = User::find($cart['seller_id']);
            if ($user) {
                $seller = [
                    'id' => $user->id,
                    'name' => $user->name,
                    'username' => $user->username,
                    'whatsapp_number' => $user->whatsapp_number,
                    'telegram_username' => $user->telegram_username,
                    'public_email' => $user->public_email,
                    'stripe_api_key' => $user->stripe_api_key,
                    'pro_panel' => $user->pro_panel,
                    'trc20_usdt_wallet' => $user->trc20_usdt_wallet,
                    'bitcoin_wallet' => $user->bitcoin_wallet,
                ];
            }
        }

        return \Inertia\Inertia::render('Cart/Index', [
            'items' => $items,
            'total' => $total,
            'seller' => $seller,
            'requires_shipping' => $requiresShipping,
        ]);
    }

    public function checkout(Request $request)
    {
        $cart = session('cart', ['seller_id' => null, 'items' => []]);

        if (! $cart['seller_id'] || count($cart['items']) === 0) {
            return Redirect::route('cart.show')->with('error', __('messages.cart_empty'));
        }

        $seller = User::findOrFail($cart['seller_id']);

        $items = collect($cart['items'])->map(function ($item) {
            $product = Product::find($item['product_id']);
            $shippingCost = $item['shipping_cost'] ?? ($product && ! $product->is_digital ? ($product->shipping_cost ?? 0) : 0);

            return [
                'product_id' => $item['product_id'],
                'attribute_id' => $item['attribute_id'],
                'price' => $item['price'],
                'shipping_cost' => $shippingCost,
                'is_digital' => $product?->is_digital,
            ];
        });
        $total = $items->sum(fn ($i) => $i['price'] + $i['shipping_cost']);

        $requiresShipping = $items->contains(fn ($i) => ! $i['is_digital']);

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
        $buyerWallet = $request->validate([
            'buyer_wallet' => 'nullable|string',
        ])['buyer_wallet'] ?? null;

        $paymentMethod = $request->input('payment_method', 'crypto');

        $order = Order::create([
            'buyer_id' => $request->user()->id,
            'seller_id' => $seller->id,
            'items' => $items->map(fn ($i) => [
                'product_id' => $i['product_id'],
                'attribute_id' => $i['attribute_id'],
                'price' => $i['price'],
                'shipping_cost' => $i['shipping_cost'],
            ])->toArray(),
            'amount' => (int) $total,
            'shipping_info' => $shipping,
            'buyer_wallet' => $buyerWallet,
            'is_digital' => ! $requiresShipping,
            'status' => 'pending',
            'tracking_code' => (string) \Illuminate\Support\Str::uuid(),
        ]);

        $seller->notify(new OrderPlaced($order));

        if ($paymentMethod === 'crypto') {
            session()->forget('cart');

            return response()->json([
                'url' => route('orders.track', $order->tracking_code),
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

        $session = $stripe->checkout->sessions->create([
            'mode' => 'payment',
            'customer_email' => $request->user()->email,
            'line_items' => [
                [
                    'price_data' => [
                        'currency' => 'usd',
                        'product_data' => ['name' => __('messages.marketplace_order')],
                        'unit_amount' => (int) ($total * 100),
                    ],
                    'quantity' => 1,
                ],
            ],
            'success_url' => route('cart.success', $order) . '?session_id={CHECKOUT_SESSION_ID}',
            'cancel_url' => route('cart.show'),
        ]);

        session()->forget('cart');

        return response()->json([
            'url' => $session->url,
        ]);
    }

    public function success(Request $request, Order $order)
    {
        $sessionId = $request->get('session_id');

        if (! $sessionId) {
            return Redirect::route('orders.track', $order->tracking_code);
        }

        if ($order->seller->pro_panel && $order->seller->stripe_secret_key) {
            $secret = $order->seller->stripe_secret_key;
            $commission = 0;
        } else {
            $config = StripeConfig::firstOrFail();
            $secret = $config->secret_key;
            $commission = $order->amount * (($config->commission_percent ?? 2) / 100);
        }

        $stripe = new StripeClient($secret);
        $session = $stripe->checkout->sessions->retrieve($sessionId);

        $status = $session->payment_status === 'paid' ? ($order->seller->pro_panel ? 'paid' : 'success') : 'failed';

        Transaction::create([
            'user_id' => $order->seller_id,
            'amount' => (int) ($order->amount - $commission),
            'status' => $status,
            'reference' => $session->payment_intent,
        ]);

        $order->update([
            'status' => $session->payment_status === 'paid' ? 'paid' : 'failed',
        ]);

        $order->buyer->notify(new OrderStatusUpdated($order));

        return Redirect::route('orders.track', $order->tracking_code)
            ->with('success', __('messages.payment_successful'));
    }
}
