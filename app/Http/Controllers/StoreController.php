<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Category;
use Inertia\Inertia;
use Inertia\Response;

class StoreController extends Controller
{
    public function profile(User $user): Response
    {
        $categories = $user->categories()->get(['id', 'name', 'slug']);
        $products = $user->products()->latest()->get(['id', 'title', 'slug', 'price', 'images']);

        return Inertia::render('Store/Profile', [
            'user' => $user->only('name', 'username', 'logo', 'cover'),
            'categories' => $categories,
            'products' => $products,
            'isOwner' => auth()->check() && auth()->id() === $user->id,
        ]);
    }

    public function category(User $user, Category $category): Response
    {
        $products = $category->products()->where('user_id', $user->id)->get();

        return Inertia::render('Store/CategoryProducts', [
            'user' => $user->only('name', 'username'),
            'category' => $category,
            'products' => $products,
        ]);
    }
}
