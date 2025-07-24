<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Setting;

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

        $settings = Setting::whereIn('key', ['default_ns1', 'default_ns2'])->pluck('value', 'key');
        $ns1 = $settings['default_ns1'] ?? 'ns1.server.com';
        $ns2 = $settings['default_ns2'] ?? 'ns2.server.com';

        $request->user()->domains()->create([
            'domain' => strtolower($request->domain),
            'ns1' => $ns1,
            'ns2' => $ns2,
        ]);

        return redirect()->back();
    }
}
