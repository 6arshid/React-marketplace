<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" dir="{{ session('dir', 'ltr') }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        {{-- Load the title from the values managed in Admin General Config --}}
        <title inertia>{{ env('APP_NAME', config('app.name', 'Laravel')) }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;500;600&display=swap" rel="stylesheet">

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
        @php
            try {
                $customCss = \App\Models\Setting::where('key', 'custom_css')->value('value');
                $customJs = \App\Models\Setting::where('key', 'custom_js')->value('value');
            } catch (\Throwable $e) {
                $customCss = $customJs = null;
            }
        @endphp
        @if(!empty($customCss))
            <style>{!! $customCss !!}</style>
        @endif
    </head>
    <body class="font-sans antialiased">
        @inertia
        @if(!empty($customJs))
            <script>{!! $customJs !!}</script>
        @endif
    </body>
</html>
