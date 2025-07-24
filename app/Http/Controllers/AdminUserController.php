<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class AdminUserController extends Controller
{
    public function index(): Response
    {
        $users = User::orderByDesc('id')
            ->select('id', 'name', 'username', 'email', 'is_admin', 'suspended_at')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
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

        if ($user->logo) {
            Storage::disk('public')->delete($user->logo);
        }
        if ($user->cover) {
            Storage::disk('public')->delete($user->cover);
        }

        return Redirect::back();
    }

    public function unsuspend(User $user): RedirectResponse
    {
        $user->update(['suspended_at' => null]);

        return Redirect::back();
    }

    public function destroy(User $user): RedirectResponse
    {
        $user->delete();

        return Redirect::back();
    }

    public function makeAdmin(User $user): RedirectResponse
    {
        $user->update(['is_admin' => true]);

        return Redirect::back();
    }
}
