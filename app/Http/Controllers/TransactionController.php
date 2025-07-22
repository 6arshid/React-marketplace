<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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
}
