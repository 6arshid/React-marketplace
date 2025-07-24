<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'flash' => [
                'success' => session('success'),
                'error' => session('error'),
            ],
            'cart' => function () {
                $cart = session('cart', ['seller_id' => null, 'items' => []]);

                return [
                    'count' => count($cart['items']),
                    'total' => collect($cart['items'])->sum('price'),
                ];
            },
            'notifications' => function () use ($request) {
                if (! $request->user()) {
                    return [];
                }

                return $request->user()->unreadNotifications()
                    ->latest()
                    ->take(5)
                    ->get()
                    ->map(fn ($n) => [
                        'id' => $n->id,
                        'data' => $n->data,
                        'created_at' => $n->created_at->diffForHumans(),
                    ]);
            },
            'notifications_count' => function () use ($request) {
                return $request->user()?->unreadNotifications()->count() ?? 0;
            },
            'stripe' => function () {
                try {
                    $config = \App\Models\StripeConfig::first();
                } catch (\Throwable $e) {
                    $config = null;
                }

                return [
                    'public_key' => $config?->api_key,
                    'price' => $config?->price,
                ];
            },
            'pages' => function () {
                try {
                    return \App\Models\Page::select('title','slug')->get();
                } catch (\Throwable $e) {
                    return [];
                }
            },
            'settings' => function () {
                try {
                    return \App\Models\Setting::pluck('value','key');
                } catch (\Throwable $e) {
                    return [];
                }
            },
        ];
    }
}
