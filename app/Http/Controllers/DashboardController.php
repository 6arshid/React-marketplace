<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();

        $ordersCount = $user->orders()->count();
        $salesCount = $user->sales()->count();
        $productsCount = $user->products()->count();
        $revenue = $user->sales()
            ->whereIn('status', ['paid', 'shipped', 'completed'])
            ->sum('amount');

        $recentOrders = $user->is_seller
            ? $user->sales()->with('buyer')->latest()->take(5)->get()
            : $user->orders()->with('seller')->latest()->take(5)->get();

        $recentProducts = $user->products()->latest()->take(5)->get();

        $cart = session('cart', ['items' => []]);

        return Inertia::render('Dashboard', [
            'stats' => [
                'orders_count' => $ordersCount,
                'orders_change' => '+0%',
                'revenue' => '$' . $revenue,
                'revenue_change' => '+0%',
                'products_count' => $productsCount,
                'products_change' => '+0',
                'sales_count' => $salesCount,
                'sales_change' => '+0%',
                'cart_count' => count($cart['items']),
                'cart_change' => '+0',
            ],
            'recentOrders' => $recentOrders,
            'recentProducts' => $recentProducts,
        ]);
    }
}
