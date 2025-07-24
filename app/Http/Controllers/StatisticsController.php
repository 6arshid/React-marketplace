<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\ViewStatistic;

class StatisticsController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();

        $topProducts = $user->products()
            ->orderByDesc('views')
            ->take(10)
            ->get(['id', 'title', 'slug', 'views']);

        $startDate = now()->subDays(29)->startOfDay();
        $dates = collect(range(0, 29))->map(fn ($i) => $startDate->copy()->addDays($i)->toDateString());
        $stats = $user->viewStatistics()
            ->whereBetween('date', [$dates->first(), $dates->last()])
            ->get()
            ->keyBy('date');

        $profileViews = $dates->map(fn ($d) => $stats[$d]->profile_views ?? 0);

        return Inertia::render('Statistics', [
            'topProducts' => $topProducts,
            'labels' => $dates,
            'profileViews' => $profileViews,
        ]);
    }
}
