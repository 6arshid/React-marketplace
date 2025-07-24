<?php

namespace App\Http\Controllers;

use App\Models\Domain;
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

        return Inertia::render('Admin/Domains', [
            'domains' => $domains,
        ]);
    }

    public function approve(Domain $domain): RedirectResponse
    {
        $domain->update(['status' => 'approved']);

        return Redirect::back();
    }

    public function reject(Domain $domain): RedirectResponse
    {
        $domain->update(['status' => 'rejected']);

        return Redirect::back();
    }

    public function update(Domain $domain, Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'ns1' => 'required|string',
            'ns2' => 'required|string',
        ]);

        $domain->update($validated);

        return Redirect::back();
    }

    public function destroy(Domain $domain): RedirectResponse
    {
        $domain->delete();

        return Redirect::back();
    }
}
