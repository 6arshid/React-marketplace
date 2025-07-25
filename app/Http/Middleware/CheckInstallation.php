<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckInstallation
{
    public function handle(Request $request, Closure $next): Response
    {
        if (config('database.connections.mysql.database') === 'marketplacereact' && !$request->is('install*')) {
            return redirect()->route('install');
        }

        return $next($request);
    }
}
