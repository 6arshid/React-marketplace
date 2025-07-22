<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminTransactionController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Transactions', [
            'transactions' => Transaction::with('user')->latest()->get(),
        ]);
    }
}
