<?php

namespace App\Http\Controllers;

use App\Models\StripeConfig;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class StripeConfigController extends Controller
{
    public function edit(): Response
    {
        $config = StripeConfig::first();

        return Inertia::render('Admin/StripeConfig', [
            'config' => $config,
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'api_key' => 'required|string',
            'secret_key' => 'required|string',
            'commission_percent' => 'required|integer|min:0|max:100',
        ]);

        StripeConfig::updateOrCreate(['id' => 1], $data);

        return Redirect::route('admin.stripe.edit')
            ->with('success', __('messages.stripe_config_updated'));
    }
}
