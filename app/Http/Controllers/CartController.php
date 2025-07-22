<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Attribute;
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
            ];
        });

        return \Inertia\Inertia::render('Cart/Index', [
            'items' => $items,
            'total' => $items->sum('price'),
        ]);
    }
}
