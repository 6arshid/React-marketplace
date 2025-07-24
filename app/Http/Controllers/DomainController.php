<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DomainController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'domain' => ['required', 'string', 'unique:domains,domain'],
        ]);

        if (! $request->user()->pro_panel) {
            abort(403);
        }

        $request->user()->domains()->create([
            'domain' => strtolower($request->domain),
            'ns1' => 'ns1.server.com',
            'ns2' => 'ns2.server.com',
        ]);

        return redirect()->back();
    }
}
