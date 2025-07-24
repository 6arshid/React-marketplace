<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;

class SetLocale
{
    public function handle(Request $request, Closure $next)
    {
        $locale = $request->get('lang', session('lang', config('app.locale')));
        App::setLocale($locale);
        session(['lang' => $locale]);

        return $next($request);
    }
}
