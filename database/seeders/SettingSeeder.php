<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Setting;

class SettingSeeder extends Seeder
{
    public function run(): void
    {
        $defaults = [
            'welcome_footer_text' => 'Built with ❤️ using Laravel',
            'footer_privacy_url' => '#',
            'footer_terms_url' => '#',
            'footer_support_url' => '#',
            'guest_footer_payment_label' => 'Secure payments',
        ];

        foreach ($defaults as $key => $value) {
            Setting::updateOrCreate(['key' => $key], ['value' => $value]);
        }
    }
}
