<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class AdminGeneralConfigController extends Controller
{
    public function edit(): Response
    {
        $keys = [
            'APP_NAME',
            'APP_ENV',
            'APP_DEBUG',
            'APP_LOCALE',
            'APP_FALLBACK_LOCALE',
            'APP_FAKER_LOCALE',
            'SESSION_DRIVER',
            'SESSION_LIFETIME',
            'SESSION_ENCRYPT',
            'SESSION_PATH',
            'SESSION_DOMAIN',
            'MAIL_MAILER',
            'MAIL_SCHEME',
            'MAIL_HOST',
            'MAIL_PORT',
            'MAIL_USERNAME',
            'MAIL_PASSWORD',
            'MAIL_FROM_ADDRESS',
            'MAIL_FROM_NAME',
            'AWS_ACCESS_KEY_ID',
            'AWS_SECRET_ACCESS_KEY',
            'AWS_DEFAULT_REGION',
            'AWS_BUCKET',
            'AWS_USE_PATH_STYLE_ENDPOINT',
            'VITE_APP_NAME',
            'VITE_PWA_NAME',
            'VITE_PWA_SHORT_NAME',
            'VITE_PWA_DESCRIPTION',
            'VITE_PWA_THEME_COLOR',
            'VITE_PWA_BACKGROUND_COLOR',
            'VITE_PWA_ICON',
            'GOOGLE_CLIENT_ID',
            'GOOGLE_CLIENT_SECRET',
            'MAX_UPLOAD_SIZE_MB',
        ];

        $env = [];
        foreach ($keys as $k) {
            $env[$k] = env($k);
        }

        return Inertia::render('Admin/GeneralConfig', [
            'env' => $env,
        ]);
    }

    public function update(Request $request)
    {
        $data = $request->validate([
            'APP_NAME' => 'required|string',
            'APP_ENV' => 'required|in:local,production',
            'APP_DEBUG' => 'required|in:true,false',
            'APP_LOCALE' => 'required|string',
            'APP_FALLBACK_LOCALE' => 'required|string',
            'APP_FAKER_LOCALE' => 'required|string',
            'SESSION_DRIVER' => 'required|in:file,database',
            'SESSION_LIFETIME' => 'required',
            'SESSION_ENCRYPT' => 'required|in:true,false',
            'SESSION_PATH' => 'required|string',
            'SESSION_DOMAIN' => 'nullable',
            'MAIL_MAILER' => 'required|string',
            'MAIL_SCHEME' => 'nullable',
            'MAIL_HOST' => 'required|string',
            'MAIL_PORT' => 'required',
            'MAIL_USERNAME' => 'nullable',
            'MAIL_PASSWORD' => 'nullable',
            'MAIL_FROM_ADDRESS' => 'required|string',
            'MAIL_FROM_NAME' => 'required|string',
            'AWS_ACCESS_KEY_ID' => 'nullable|string',
            'AWS_SECRET_ACCESS_KEY' => 'nullable|string',
            'AWS_DEFAULT_REGION' => 'required|string',
            'AWS_BUCKET' => 'nullable|string',
            'AWS_USE_PATH_STYLE_ENDPOINT' => 'required|in:true,false',
            'VITE_APP_NAME' => 'required|string',
            'VITE_PWA_NAME' => 'nullable|string',
            'VITE_PWA_SHORT_NAME' => 'nullable|string',
            'VITE_PWA_DESCRIPTION' => 'nullable|string',
            'VITE_PWA_THEME_COLOR' => 'nullable|string',
            'VITE_PWA_BACKGROUND_COLOR' => 'nullable|string',
            'pwa_icon' => ['nullable','file','image','max:'.$this->maxUploadSize()],
            'GOOGLE_CLIENT_ID' => 'nullable|string',
            'GOOGLE_CLIENT_SECRET' => 'nullable|string',
            'MAX_UPLOAD_SIZE_MB' => 'required|numeric',
        ]);

        $envData = $data;
        if ($request->hasFile('pwa_icon')) {
            $path = $request->file('pwa_icon')->store('pwa', 'public');
            $envData['VITE_PWA_ICON'] = $path;
        }
        unset($envData['pwa_icon']);

        $this->updateEnvFile($envData);

        return Redirect::route('admin.general-config.edit')
            ->with('success', __('messages.general_config_updated'));
    }

    private function updateEnvFile(array $data): void
    {
        $path = base_path('.env');
        if (!file_exists($path)) {
            return;
        }

        $env = file_get_contents($path);
        foreach ($data as $key => $value) {
            $value = $value === null ? 'null' : $value;
            if (str_contains($value, ' ') && !(str_starts_with($value, '"') && str_ends_with($value, '"'))) {
                $value = '"' . $value . '"';
            }
            $pattern = "/^{$key}=.*$/m";
            $line = "{$key}={$value}";
            if (preg_match($pattern, $env)) {
                $env = preg_replace($pattern, $line, $env);
            } else {
                $env .= PHP_EOL . $line;
            }
        }
        file_put_contents($path, $env);
    }
}

