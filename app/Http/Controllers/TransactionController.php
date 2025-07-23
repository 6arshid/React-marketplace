<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Str;
use App\Models\StripeConfig;
use Inertia\Inertia;
use Inertia\Response;

class TransactionController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('Transactions/Index', [
            'transactions' => $request->user()->transactions()->latest()->get(),
        ]);
    }

    public function money(Request $request): JsonResponse
    {
        return response()->json(
            $request->user()->transactions()->latest()->get()
        );
    }

    public function request(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'amount' => ['required', 'integer', 'min:1'],
        ]);

        $commissionPercent = optional(StripeConfig::first())->commission_percent ?? 2;
        $net = (int) ($data['amount'] - ($data['amount'] * $commissionPercent / 100));

        $request->user()->transactions()->create([
            'amount' => $net,
            'status' => 'success',
            'reference' => (string) Str::uuid(),
        ]);

        return Redirect::back()->with('success', 'Payout request submitted successfully');
    }
}
