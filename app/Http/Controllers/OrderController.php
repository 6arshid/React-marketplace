<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Redirect;

class OrderController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('Orders/Index', [
            'orders' => $request->user()->orders()->with('seller')->latest()->get(),
        ]);
    }

    public function update(Request $request, Order $order)
    {
        $this->authorize('update', $order);

        $data = $request->validate([
            'status' => 'required|string',
            'postal_tracking_code' => 'nullable|string',
        ]);

        $order->update($data);

        return Redirect::back();
    }

    public function downloads(Request $request): Response
    {
        $orders = $request->user()
            ->orders()
            ->where('is_digital', true)
            ->latest()
            ->get()
            ->map(function (Order $order) {
                $files = collect($order->items)->map(function ($item) {
                    $product = Product::find($item['product_id']);
                    return $product && $product->main_file ? [
                        'title' => $product->title,
                        'path' => $product->main_file,
                    ] : null;
                })->filter()->values();

                return [
                    'id' => $order->id,
                    'tracking_code' => $order->tracking_code,
                    'files' => $files,
                ];
            });

        return Inertia::render('Orders/Downloads', [
            'orders' => $orders,
        ]);
    }

    public function track(string $code): Response
    {
        $order = Order::where('tracking_code', $code)->firstOrFail();

        $files = collect($order->items)->map(function ($item) {
            $product = Product::find($item['product_id']);
            return $product && $product->main_file ? [
                'title' => $product->title,
                'path' => $product->main_file,
            ] : null;
        })->filter()->values();

        return Inertia::render('Orders/Track', [
            'order' => $order->only(['tracking_code', 'status', 'postal_tracking_code']),
            'files' => $files,
        ]);
    }
}
