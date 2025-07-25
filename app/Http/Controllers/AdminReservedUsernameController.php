<?php

namespace App\Http\Controllers;

use App\Models\ReservedUsername;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class AdminReservedUsernameController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/ReservedUsernames', [
            'reservedUsernames' => ReservedUsername::orderBy('username')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'username' => ['required', 'string', 'min:3', 'unique:reserved_usernames,username'],
        ]);

        ReservedUsername::create(['username' => strtolower($validated['username'])]);

        return Redirect::back()
            ->with('success', __('messages.reserved_username_added'));
    }

    public function destroy(ReservedUsername $reservedUsername): RedirectResponse
    {
        $reservedUsername->delete();

        return Redirect::back()
            ->with('success', __('messages.reserved_username_deleted'));
    }
}
