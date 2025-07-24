<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class StatisticsController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();

        $topProducts = $user->products()
            ->orderByDesc('views')
            ->take(10)
            ->get(['id', 'title', 'slug', 'views']);

        $totalViews = $user->products()->sum('views');

        return Inertia::render('Statistics', [
            'topProducts' => $topProducts,
            'totalViews' => $totalViews,
        ]);
    }
}
