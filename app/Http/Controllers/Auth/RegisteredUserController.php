<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\ReservedUsername;
use App\Models\Page;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'username' => ['required', 'string', 'min:5', 'unique:'.User::class, Rule::notIn(ReservedUsername::pluck('username'))],
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'trc20_usdt_wallet' => 'nullable|string',
            'bitcoin_wallet' => 'nullable|string',
            'is_seller' => 'required|boolean',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'username' => $request->username,
            'name' => $request->name,
            'email' => $request->email,
            'trc20_usdt_wallet' => $request->trc20_usdt_wallet,
            'bitcoin_wallet' => $request->bitcoin_wallet,
            'is_seller' => $request->boolean('is_seller'),
            'password' => Hash::make($request->password),
        ]);

        if ($user->is_seller) {
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

        event(new Registered($user));

        Auth::login($user);

        return redirect(route('dashboard', absolute: false));
    }
}
