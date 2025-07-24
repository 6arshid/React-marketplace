<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Product;
use Inertia\Inertia;
use Inertia\Response;

class AdminSitemapController extends Controller
{
    public function index(): Response
    {
        $users = User::orderByDesc('id')->get(['id', 'name', 'username']);
        $products = Product::orderByDesc('id')->get(['id', 'title', 'slug']);

        return Inertia::render('Admin/Sitemap', [
            'users' => $users,
            'products' => $products,
            'sitemapUrl' => url('/sitemap.xml'),
        ]);
    }
}
