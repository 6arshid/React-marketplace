<?php

namespace App\Http\Controllers;

use App\Models\Report;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class ReportController extends Controller
{
    public function store(Request $request, User $user): RedirectResponse
    {
        $data = $request->validate([
            'reason' => ['required', 'string'],
            'evidence' => ['nullable', 'file', 'mimes:jpg,jpeg,png,gif,mov,mp4'],
        ]);

        $path = null;
        if ($request->hasFile('evidence')) {
            $path = $request->file('evidence')->store('reports', 'public');
        }

        Report::create([
            'reporter_id' => $request->user()?->id,
            'reported_user_id' => $user->id,
            'reason' => $data['reason'],
            'evidence' => $path,
        ]);

        return Redirect::back();
    }
}
