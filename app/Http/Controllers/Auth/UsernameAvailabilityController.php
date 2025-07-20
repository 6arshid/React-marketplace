<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
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
            'username' => 'required|string|min:5',
        ]);

        $available = !User::where('username', $request->username)->exists();

        return response()->json(['available' => $available]);
    }
}
