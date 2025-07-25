<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class AdminTransactionController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Transactions', [
            // Show pending and paid withdraw requests
            'transactions' => Transaction::with('user')
                ->whereIn('status', ['success', 'completed', 'paid'])
                ->orderByDesc('id')
                ->get(),
        ]);
    }

    public function money(): JsonResponse
    {
        return response()->json(
            // Keep list in sync with index view by returning pending and paid
            // withdraw requests
            Transaction::with('user')
                ->whereIn('status', ['success', 'completed', 'paid'])
                ->orderByDesc('id')
                ->get()
        );
    }

    public function pay(Transaction $transaction): RedirectResponse
    {
        $transaction->update(['status' => 'paid']);

        return Redirect::back()->with('success', __('messages.transaction_paid'));
    }

    public function payAll(): RedirectResponse
    {
        Transaction::whereIn('status', ['success', 'completed'])
            ->update(['status' => 'paid']);

        return Redirect::back()->with('success', __('messages.transactions_paid'));
    }
}
