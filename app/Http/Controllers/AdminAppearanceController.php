<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class AdminAppearanceController extends Controller
{
    public function edit(): Response
    {
        $settings = Setting::pluck('value','key');

        return Inertia::render('Admin/Appearance', [
            'settings' => $settings,
        ]);
    }

    public function update(Request $request)
    {
        $data = $request->validate([
            'app_logo' => ['nullable','file','mimetypes:image/svg+xml,text/plain'],
            'welcome_tagline' => ['nullable','string','max:255'],
            'welcome_footer_text' => ['nullable','string','max:255'],
            'privacy_url' => ['nullable','string','max:255'],
            'terms_url' => ['nullable','string','max:255'],
            'support_url' => ['nullable','string','max:255'],
            'guest_footer_payment_label' => ['nullable','string','max:255'],
            'payment_icon1' => ['nullable','file','mimetypes:image/svg+xml,text/plain'],
            'payment_icon2' => ['nullable','file','mimetypes:image/svg+xml,text/plain'],
            'payment_icon3' => ['nullable','file','mimetypes:image/svg+xml,text/plain'],
            'payment_icon4' => ['nullable','file','mimetypes:image/svg+xml,text/plain'],
        ]);

        if ($request->hasFile('app_logo')) {
            $path = $request->file('app_logo')->store('appearance', 'public');
            Setting::updateOrCreate(['key' => 'app_logo'], ['value' => $path]);
        }

        Setting::updateOrCreate(['key' => 'welcome_tagline'], ['value' => $data['welcome_tagline'] ?? '']);

        Setting::updateOrCreate(['key' => 'welcome_footer_text'], ['value' => $data['welcome_footer_text'] ?? '']);
        Setting::updateOrCreate(['key' => 'footer_privacy_url'], ['value' => $data['privacy_url'] ?? '']);
        Setting::updateOrCreate(['key' => 'footer_terms_url'], ['value' => $data['terms_url'] ?? '']);
        Setting::updateOrCreate(['key' => 'footer_support_url'], ['value' => $data['support_url'] ?? '']);
        Setting::updateOrCreate(['key' => 'guest_footer_payment_label'], ['value' => $data['guest_footer_payment_label'] ?? '']);

        for ($i = 1; $i <= 4; $i++) {
            if ($request->hasFile("payment_icon{$i}")) {
                $path = $request->file("payment_icon{$i}")->store('appearance', 'public');
                Setting::updateOrCreate(['key' => "payment_icon{$i}"], ['value' => $path]);
            }
        }

        return Redirect::route('admin.appearance.edit');
    }
}
