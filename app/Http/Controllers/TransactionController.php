<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
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
}
