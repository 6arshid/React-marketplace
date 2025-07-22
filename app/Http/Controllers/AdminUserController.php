<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class AdminUserController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Users', [
            'users' => User::all(),
        ]);
    }

    public function update(Request $request, User $user): RedirectResponse
    {
        $data = $request->validate([
            'pro_panel' => ['required', 'boolean'],
            'stripe_api_key' => ['nullable', 'string'],
            'stripe_secret_key' => ['nullable', 'string'],
            'pro_panel_expires_at' => ['nullable', 'date'],
        ]);

        $user->update($data);

        return Redirect::back();
    }
}
