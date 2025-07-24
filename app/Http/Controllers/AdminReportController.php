<?php

namespace App\Http\Controllers;

use App\Models\Report;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class AdminReportController extends Controller
{
    public function index(): Response
    {
        $reports = Report::with('reporter', 'reportedUser')
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Reports/Index', [
            'reports' => $reports,
        ]);
    }

    public function suspend(User $user): RedirectResponse
    {
        $user->update(['suspended_at' => now(), 'logo' => null, 'cover' => null]);

        foreach ($user->products as $product) {
            if ($product->images) {
                foreach ($product->images as $img) {
                    Storage::disk('public')->delete($img);
                }
            }
            $product->update(['images' => null]);
        }

        if ($user->logo) {Storage::disk('public')->delete($user->logo);}
        if ($user->cover) {Storage::disk('public')->delete($user->cover);}

        return Redirect::back();
    }
}
