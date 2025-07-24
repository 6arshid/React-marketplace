<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Page;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class GoogleController extends Controller
{
    public function redirect()
    {
        return Socialite::driver('google')->redirect();
    }

    public function callback()
    {
        $googleUser = Socialite::driver('google')->stateless()->user();

        $user = User::firstOrCreate(
            ['email' => $googleUser->getEmail()],
            [
                'name' => $googleUser->getName() ?: $googleUser->getNickname(),
                'username' => uniqid() . $this->generateUsername($googleUser->getNickname() ?: explode('@', $googleUser->getEmail())[0]),
                'google_id' => $googleUser->getId(),
                'password' => bcrypt(Str::random(16)),
                'email_verified_at' => now(),
            ]
        );

        $wasNew = $user->wasRecentlyCreated;

        if (!$user->google_id) {
            $user->google_id = $googleUser->getId();
            $user->save();
        }

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

        Auth::login($user, true);

        if ($wasNew) {
            session(['choose_account_type' => true]);
            return redirect()->route('account-type.show');
        }

        return redirect()->intended(route('dashboard', absolute: false));
    }

    protected function generateUsername(string $base): string
    {
        $username = Str::slug($base);
        $original = $username;
        $i = 1;
        while (User::where('username', $username)->exists()) {
            $username = $original . $i++;
        }
        return $username;
    }
}
