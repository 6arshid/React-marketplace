<?php

namespace App\Http\Middleware;

use App\Models\Domain;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckUserDomain
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $host = $request->getHost();
        $appHost = parse_url(config('app.url'), PHP_URL_HOST);

        if ($host !== $appHost && $request->path() === '/') {
            $domain = Domain::where('domain', $host)->where('status', 'approved')->first();
            if ($domain && $domain->user->pro_panel) {
                return redirect()->route('profile.show', $domain->user->username);
            }
        }

        return $next($request);
    }
}
