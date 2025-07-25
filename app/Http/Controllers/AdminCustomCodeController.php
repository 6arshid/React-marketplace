<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class AdminCustomCodeController extends Controller
{
    public function edit(): Response
    {
        $settings = Setting::pluck('value', 'key');

        return Inertia::render('Admin/CustomCode', [
            'custom_css' => $settings['custom_css'] ?? '',
            'custom_js' => $settings['custom_js'] ?? '',
        ]);
    }

    public function update(Request $request)
    {
        $data = $request->validate([
            'custom_css' => ['nullable', 'string'],
            'custom_js' => ['nullable', 'string'],
        ]);

        Setting::updateOrCreate(['key' => 'custom_css'], ['value' => $data['custom_css'] ?? '']);
        Setting::updateOrCreate(['key' => 'custom_js'], ['value' => $data['custom_js'] ?? '']);

        return Redirect::route('admin.custom-code.edit')
            ->with('success', __('messages.custom_code_updated'));
    }
}
