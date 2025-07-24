<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Category;
use App\Models\Page;
use Inertia\Inertia;
use Inertia\Response;

class StoreController extends Controller
{
    public function profile(User $user): Response
    {
        $user->increment('profile_views');

        $pages = $user->pages()->latest()->get(['id', 'title', 'slug']);
        $categories = $user->categories()->get(['id', 'name', 'slug', 'icon']);
        $products = $user->products()->latest()->get(['id', 'title', 'slug', 'price', 'images', 'views']);

        $socialLinks = $user->socialLinks()->get(['id', 'label', 'url', 'icon']);

        return Inertia::render('Store/Profile', [
            'user' => $user->only('id', 'name', 'username', 'logo', 'cover', 'about', 'whatsapp_number', 'telegram_username', 'instagram_username', 'facebook_username', 'public_email', 'suspended_at'),
            'pages' => $pages,
            'categories' => $categories,
            'products' => $products,
            'socialLinks' => $socialLinks,
            'isOwner' => auth()->check() && auth()->id() === $user->id,
        ]);
    }

    public function category(User $user, Category $category): Response
    {
        $products = $category->products()->where('user_id', $user->id)->get(['id', 'title', 'slug', 'price', 'images', 'views']);

        return Inertia::render('Store/CategoryProducts', [
            'user' => $user->only('name', 'username'),
            'category' => $category,
            'products' => $products,
        ]);
    }

    public function page(User $user, Page $page): Response
    {
        if ($page->user_id !== $user->id) {
            abort(404);
        }
        return Inertia::render('Pages/View', [
            'page' => $page,
            'user' => $user->only('username'),
        ]);
    }
}
