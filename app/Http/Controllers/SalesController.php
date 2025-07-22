<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SalesController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('Sales/Index', [
            'orders' => $request->user()->sales()->with('buyer')->latest()->get(),
        ]);
    }
}
