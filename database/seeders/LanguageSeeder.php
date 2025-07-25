<?php

namespace Database\Seeders;

use App\Models\Language;
use Illuminate\Database\Seeder;

class LanguageSeeder extends Seeder
{
    public function run(): void
    {
        $languages = [
            [
                'name' => 'English',
                'code' => 'en',
                'direction' => 'ltr',
                'translations' => json_decode(file_get_contents(resource_path('js/locales/en/translation.json')), true),
            ],
            [
                'name' => 'Farsi',
                'code' => 'fa',
                'direction' => 'rtl',
                'translations' => json_decode(file_get_contents(resource_path('js/locales/fa/translation.json')), true),
            ],
        ];

        foreach ($languages as $lang) {
            Language::updateOrCreate(['code' => $lang['code']], $lang);
        }
    }
}
