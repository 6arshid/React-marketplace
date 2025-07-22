<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\StripeConfig;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class AdminProPanelController extends Controller
{
    public function index(Request $request): Response
    {
        $config = StripeConfig::first();
        $proUsers = User::where('pro_panel', true)
            ->orderByDesc('pro_panel_expires_at')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/ProPanel', [
            'config' => $config,
            'proUsers' => $proUsers,
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'price' => 'required|integer',
        ]);

        StripeConfig::updateOrCreate(['id' => 1], $data);

        return Redirect::route('admin.pro-panel.index');
    }

    public function saveUser(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'email' => ['required', 'email', 'exists:users,email'],
            'expires_at' => ['required', 'date'],
        ]);

        $user = User::where('email', $validated['email'])->first();
        $user->update([
            'pro_panel' => true,
            'pro_panel_expires_at' => $validated['expires_at'],
        ]);

        return Redirect::route('admin.pro-panel.index');
    }
}
