<?php

namespace App\Http\Controllers;

use App\Models\Domain;
use App\Models\Setting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class AdminDomainController extends Controller
{
    public function index(): Response
    {
        $domains = Domain::with('user:id,name,email')
            ->orderByDesc('created_at')
            ->paginate(10)
            ->withQueryString();

        $settings = Setting::whereIn('key', ['default_ns1', 'default_ns2'])->pluck('value', 'key');

        $ns1 = $settings['default_ns1'] ?? 'ns1.server.com';
        $ns2 = $settings['default_ns2'] ?? 'ns2.server.com';

        return Inertia::render('Admin/Domains', [
            'domains' => $domains,
            'ns1' => $ns1,
            'ns2' => $ns2,
        ]);
    }

    public function approve(Domain $domain): RedirectResponse
    {
        $domain->update(['status' => 'approved']);

        return Redirect::back()
            ->with('success', __('messages.domain_approved'));
    }

    public function reject(Domain $domain): RedirectResponse
    {
        $domain->update(['status' => 'rejected']);

        return Redirect::back()
            ->with('success', __('messages.domain_rejected'));
    }

    public function update(Domain $domain, Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'ns1' => 'required|string',
            'ns2' => 'required|string',
        ]);

        $domain->update($validated);

        return Redirect::back()
            ->with('success', __('messages.domain_updated'));
    }

    public function destroy(Domain $domain): RedirectResponse
    {
        $domain->delete();

        return Redirect::back()
            ->with('success', __('messages.domain_deleted'));
    }

    public function updateDefaults(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'ns1' => 'required|string',
            'ns2' => 'required|string',
        ]);

        Setting::updateOrCreate(['key' => 'default_ns1'], ['value' => $data['ns1']]);
        Setting::updateOrCreate(['key' => 'default_ns2'], ['value' => $data['ns2']]);

        return Redirect::back()
            ->with('success', __('messages.domain_defaults_updated'));
    }
}
