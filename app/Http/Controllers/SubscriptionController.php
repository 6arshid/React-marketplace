<?php

namespace App\Http\Controllers;

use App\Models\StripeConfig;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class SubscriptionController extends Controller
{
    public function index(Request $request): Response
    {
        $config = StripeConfig::first();

        return Inertia::render('Subscription', [
            'price' => $config?->price ?? 10,
            'user' => $request->user(),
        ]);
    }

    public function subscribe(Request $request): RedirectResponse
    {
        $user = $request->user();
        $config = StripeConfig::first();

        Transaction::create([
            'user_id' => $user->id,
            'amount' => $config?->price ?? 10,
            'status' => 'success',
            'reference' => 'manual',
        ]);

        $user->update([
            'pro_panel' => true,
            'pro_panel_expires_at' => now()->addMonth(),
        ]);

        return Redirect::route('subscription.index');
    }
}
