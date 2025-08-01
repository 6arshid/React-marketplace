<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Redirect;
use App\Notifications\OrderStatusUpdated;

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

        $order->buyer->notify(new OrderStatusUpdated($order));

        return Redirect::back()->with('success', __('messages.order_updated'));
    }

    public function downloads(Request $request): Response
    {
        $ordersQuery = $request->user()
            ->orders()
            ->where('is_digital', true)
            ->whereIn('status', ['accepted', 'paid'])
            ->orderByDesc('id');

        $orders = $ordersQuery
            ->paginate(10)
            ->through(function (Order $order) {
                $files = collect($order->items)->map(function ($item) {
                    $product = Product::find($item['product_id']);
                    return $product && $product->main_file ? [
                        'title' => $product->title,
                        'path' => $product->main_file,
                    ] : null;
                })->filter()->values();

                $vouchers = collect($order->items)->flatMap(function ($item) {
                    $product = Product::find($item['product_id']);
                    if ($product && $product->is_voucher) {
                        return $product->vouchers->map(fn ($v) => [
                            'product' => $product->title,
                            'code' => $v->public_code,
                        ]);
                    }
                    return [];
                })->values();

                return [
                    'id' => $order->id,
                    'tracking_code' => $order->tracking_code,
                    'files' => $files,
                    'vouchers' => $vouchers,
                ];
            })
            ->withQueryString();

        $totalOrders = $ordersQuery->count();

        $totalFiles = 0;
        $totalVouchers = 0;
        $ordersQuery->clone()->get()->each(function (Order $order) use (&$totalFiles, &$totalVouchers) {
            foreach ($order->items as $item) {
                $product = Product::find($item['product_id']);
                if ($product && $product->main_file) {
                    $totalFiles++;
                }
                if ($product && $product->is_voucher) {
                    $totalVouchers += $product->vouchers()->count();
                }
            }
        });

        return Inertia::render('Orders/Downloads', [
            'orders' => $orders,
            'totalOrders' => $totalOrders,
            'totalFiles' => $totalFiles,
            'totalVouchers' => $totalVouchers,
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

        $vouchers = collect($order->items)->flatMap(function ($item) {
            $product = Product::find($item['product_id']);
            if ($product && $product->is_voucher) {
                return $product->vouchers->map(fn ($v) => [
                    'product' => $product->title,
                    'code' => $v->public_code,
                ]);
            }
            return [];
        })->values();

        return Inertia::render('Orders/Track', [
            'order' => $order->only(['tracking_code', 'status', 'postal_tracking_code']),
            'files' => $files,
            'vouchers' => $vouchers,
        ]);
    }
}
