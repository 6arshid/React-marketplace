<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SalesController extends Controller
{
    public function index(Request $request): Response
    {
        $orders = $request->user()->sales()->with('buyer')->latest()->get();

        $commissionPercent = 0;
        if (! $request->user()->pro_panel) {
            $commissionPercent = optional(\App\Models\StripeConfig::first())->commission_percent ?? 2;
            $orders->transform(function ($order) use ($commissionPercent) {
                $order->net_amount = (int) ($order->amount - ($order->amount * $commissionPercent / 100));
                return $order;
            });
        }

        return Inertia::render('Sales/Index', [
            'orders' => $orders,
            'commission_percent' => $commissionPercent,
        ]);
    }
}
