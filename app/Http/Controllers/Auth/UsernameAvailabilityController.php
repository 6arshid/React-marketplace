<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\ReservedUsername;
use App\Models\User;
use Illuminate\Http\Request;

class UsernameAvailabilityController extends Controller
{
    /**
     * Check if given username is available.
     */
    public function __invoke(Request $request)
    {
        $request->validate([
            'username' => 'required|string|min:4',
        ]);

        $reserved = ReservedUsername::where('username', $request->username)->exists();
        $available = ! User::where('username', $request->username)->exists() && ! $reserved;

        return response()->json(['available' => $available]);
    }
}
