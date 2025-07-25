<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use App\Models\Setting;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        $settings = Setting::whereIn('key', ['default_ns1', 'default_ns2'])->pluck('value', 'key');

        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
            'ns1' => $settings['default_ns1'] ?? 'ns1.server.com',
            'ns2' => $settings['default_ns2'] ?? 'ns2.server.com',
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

        return Redirect::route('profile.edit')
            ->with('success', __('messages.profile_updated'));
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

        return Redirect::back()
            ->with('success', __('messages.settlement_updated'));
    }

    /**
     * Update the user's contact information.
     */
    public function updateContact(Request $request): RedirectResponse
    {
        $rules = [
            'trc20_usdt_wallet' => ['nullable', 'string'],
            'bitcoin_wallet' => ['nullable', 'string'],
            'whatsapp_number' => ['nullable', 'string'],
            'telegram_username' => ['nullable', 'string'],
            'instagram_username' => ['nullable', 'string'],
            'facebook_username' => ['nullable', 'string'],
            'public_email' => ['nullable', 'string', 'email'],
            'about' => ['nullable', 'string'],
            'footer_text' => ['nullable', 'string'],
        ];

        if (! $request->user()->is_admin) {
            $rules['stripe_api_key'] = ['nullable', 'string'];
            $rules['stripe_secret_key'] = ['nullable', 'string'];
        }

        $validated = $request->validate($rules);

        if ($request->user()->is_admin) {
            unset($validated['stripe_api_key'], $validated['stripe_secret_key']);
        }

        $request->user()->update($validated);

        return Redirect::back()
            ->with('success', __('messages.contact_updated'));
    }

    public function updateLogo(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'logo' => ['required', 'file', 'image', 'max:' . $this->maxUploadSize()],
        ]);

        $path = $data['logo']->store('logos', 'public');

        if ($request->user()->logo) {
            Storage::disk('public')->delete($request->user()->logo);
        }

        $request->user()->update(['logo' => $path]);

        return Redirect::back()
            ->with('success', __('messages.logo_updated'));
    }

    public function updateCover(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'cover' => ['required', 'file', 'image', 'max:' . $this->maxUploadSize()],
        ]);

        $path = $data['cover']->store('covers', 'public');

        if ($request->user()->cover) {
            Storage::disk('public')->delete($request->user()->cover);
        }

        $request->user()->update(['cover' => $path]);

        return Redirect::back()
            ->with('success', __('messages.cover_updated'));
    }

    public function deleteLogo(Request $request): RedirectResponse
    {
        if ($request->user()->logo) {
            Storage::disk('public')->delete($request->user()->logo);
            $request->user()->update(['logo' => null]);
        }

        return Redirect::back()
            ->with('success', __('messages.logo_deleted'));
    }

    public function deleteCover(Request $request): RedirectResponse
    {
        if ($request->user()->cover) {
            Storage::disk('public')->delete($request->user()->cover);
            $request->user()->update(['cover' => null]);
        }

        return Redirect::back()
            ->with('success', __('messages.cover_deleted'));
    }

    public function becomeSeller(Request $request): RedirectResponse
    {
        $request->user()->update(['is_seller' => true]);

        return Redirect::back()
            ->with('success', __('messages.become_seller'));
    }

    public function becomeBuyer(Request $request): RedirectResponse
    {
        $request->user()->update(['is_seller' => false]);

        return Redirect::back()
            ->with('success', __('messages.become_buyer'));
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

        return Redirect::to('/')
            ->with('success', __('messages.account_deleted'));
    }
}
