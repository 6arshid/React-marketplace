<?php

namespace App\Http\Controllers;

use App\Models\StripeConfig;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Stripe\Stripe;
use Stripe\StripeClient;
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
            'publicKey' => $config?->api_key,
        ]);
    }

    public function checkout(Request $request)
    {
        $user = $request->user();
        $config = StripeConfig::firstOrFail();

        $stripe = new StripeClient($config->secret_key);

        $session = $stripe->checkout->sessions->create([
            'mode' => 'subscription',
            'customer_email' => $user->email,
            'client_reference_id' => $user->id,
            'line_items' => [
                [
                    'price_data' => [
                        'currency' => 'usd',
                        'product_data' => ['name' => 'Pro Subscription'],
                        'unit_amount' => ($config->price ?? 10) * 100,
                        'recurring' => ['interval' => 'month'],
                    ],
                    'quantity' => 1,
                ],
            ],
            'success_url' => route('subscription.success', [], false) . '?session_id={CHECKOUT_SESSION_ID}',
            'cancel_url' => route('profile.edit', [], false),
        ]);

        return response()->json(['url' => $session->url]);
    }

    public function success(Request $request): RedirectResponse
    {
        $sessionId = $request->get('session_id');

        if (! $sessionId) {
            return Redirect::route('profile.edit');
        }

        $config = StripeConfig::firstOrFail();
        $stripe = new StripeClient($config->secret_key);
        $session = $stripe->checkout->sessions->retrieve($sessionId);

        $user = User::find($session->client_reference_id);

        Transaction::create([
            'user_id' => $user->id,
            'amount' => $config->price ?? 10,
            'status' => $session->payment_status === 'paid' ? 'success' : 'failed',
            'reference' => $session->payment_intent,
        ]);

        if ($session->payment_status === 'paid') {
            $user->update([
                'pro_panel' => true,
                'pro_panel_expires_at' => now()->addMonth(),
            ]);
        }

        return Redirect::route('profile.edit');
    }
}
