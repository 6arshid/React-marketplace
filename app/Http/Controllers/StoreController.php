<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Category;
use Inertia\Inertia;
use Inertia\Response;

class StoreController extends Controller
{
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
