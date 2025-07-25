<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use App\Models\Language;

class SetLocale
{
    public function handle(Request $request, Closure $next)
    {
        $locale = $request->get('lang', session('lang', config('app.locale')));
        App::setLocale($locale);
        $direction = Language::where('code', $locale)->value('direction') ?? 'ltr';
        session(['lang' => $locale, 'dir' => $direction]);

        return $next($request);
    }
}
