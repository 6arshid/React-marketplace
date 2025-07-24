<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Page;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class AccountTypeController extends Controller
{
    public function show()
    {
        if (!session('choose_account_type')) {
            return Redirect::route('dashboard');
        }

        return Inertia::render('Auth/AccountType');
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'is_seller' => ['required', 'boolean'],
        ]);

        $user = $request->user();
        $user->is_seller = $request->boolean('is_seller');
        $user->save();

        if ($user->is_seller && !$user->pages()->exists()) {
            $user->pages()->create([
                'title' => 'Return Policy',
                'slug' => Page::generateUniqueSlug('return-'),
                'description' => 'Edit this page to describe your return policy.',
            ]);

            $user->pages()->create([
                'title' => 'About Us',
                'slug' => Page::generateUniqueSlug('about-'),
                'description' => 'Tell your customers about your store here.',
            ]);

            $user->pages()->create([
                'title' => 'Contact Us',
                'slug' => Page::generateUniqueSlug('contact-'),
                'description' => 'Provide your contact information here.',
            ]);
        }

        session()->forget('choose_account_type');

        return Redirect::intended(route('dashboard', absolute: false));
    }
}
