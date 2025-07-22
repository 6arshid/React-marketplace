<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Update the user's settlement information.
     */
    public function updateSettlement(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'trc20_usdt_wallet' => ['nullable', 'string'],
            'iban' => ['nullable', 'string'],
            'swift_code' => ['nullable', 'string'],
        ]);

        $request->user()->update($validated);

        return Redirect::back();
    }

    /**
     * Update the user's contact information.
     */
    public function updateContact(Request $request): RedirectResponse
    {
        $rules = [
            'whatsapp_number' => ['nullable', 'string'],
            'telegram_username' => ['nullable', 'string'],
            'public_email' => ['nullable', 'string', 'email'],
        ];

        if ($request->user()->pro_panel && ! $request->user()->is_admin) {
            $rules['stripe_api_key'] = ['nullable', 'string'];
            $rules['stripe_secret_key'] = ['nullable', 'string'];
        }

        $validated = $request->validate($rules);

        if (! $request->user()->pro_panel || $request->user()->is_admin) {
            unset($validated['stripe_api_key'], $validated['stripe_secret_key']);
        }

        $request->user()->update($validated);

        return Redirect::back();
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
