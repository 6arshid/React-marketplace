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
                'name' => '中文',
                'code' => 'zh',
                'direction' => 'ltr',
                'translations' => json_decode(file_get_contents(resource_path('js/locales/zh/translation.json')), true),
            ],
                                 [
                'name' => 'हिन्दी',
                'code' => 'hi',
                'direction' => 'ltr',
                'translations' => json_decode(file_get_contents(resource_path('js/locales/hi/translation.json')), true),
            ],
              [
                'name' => 'Español',
                'code' => 'es',
                'direction' => 'ltr',
                'translations' => json_decode(file_get_contents(resource_path('js/locales/es/translation.json')), true),
            ],
                          [
                'name' => 'Français',
                'code' => 'fr',
                'direction' => 'ltr',
                'translations' => json_decode(file_get_contents(resource_path('js/locales/fr/translation.json')), true),
            ],
            [
                'name' => 'فارسی',
                'code' => 'fa',
                'direction' => 'rtl',
                'translations' => json_decode(file_get_contents(resource_path('js/locales/fa/translation.json')), true),
            ],
                        [
                'name' => 'العربية',
                'code' => 'ar',
                'direction' => 'rtl',
                'translations' => json_decode(file_get_contents(resource_path('js/locales/ar/translation.json')), true),
            ],
        ];

        foreach ($languages as $lang) {
            Language::updateOrCreate(['code' => $lang['code']], $lang);
        }
    }
}
