<?php

namespace App\Http\Controllers;

use App\Models\StripeConfig;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Stripe\Webhook;
use Stripe\StripeClient;

class StripeWebhookController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $config = StripeConfig::first();
        if (! $config) {
            return response('no config', 400);
        }

        $payload = $request->getContent();
        $sig = $request->header('Stripe-Signature');
        $secret = config('services.stripe.webhook_secret');

        try {
            $event = Webhook::constructEvent($payload, $sig, $secret);
        } catch (\Throwable $e) {
            return response('invalid', 400);
        }

        $stripe = new StripeClient($config->secret_key);

        if ($event->type === 'invoice.paid') {
            $subscription = $event->data->object;
            $user = User::where('stripe_customer_id', $subscription->customer)->first();
            if ($user) {
                $user->update(['pro_panel' => true, 'pro_panel_expires_at' => now()->addMonth()]);
            }
        }

        if ($event->type === 'invoice.payment_failed' || $event->type === 'customer.subscription.deleted') {
            $subscription = $event->data->object;
            $user = User::where('stripe_customer_id', $subscription->customer)->first();
            if ($user) {
                $user->update(['pro_panel' => false]);
            }
        }

        if ($event->type === 'checkout.session.completed') {
            $session = $event->data->object;
            $user = User::find($session->client_reference_id);
            if ($user) {
                Transaction::create([
                    'user_id' => $user->id,
                    'amount' => $config->price ?? 10,
                    'status' => 'success',
                    'reference' => $session->payment_intent,
                ]);
                $user->update([
                    'pro_panel' => true,
                    'pro_panel_expires_at' => now()->addMonth(),
                    'stripe_customer_id' => $session->customer,
                ]);
            }
        }

        return response('success');
    }
}
