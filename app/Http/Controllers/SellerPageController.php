<?php

namespace App\Http\Controllers;

use App\Models\Page;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class SellerPageController extends Controller
{
    public function index(): Response
    {
        $pages = Page::where('user_id', auth()->id())->latest()->get();

        return Inertia::render('SellerPages/Index', [
            'pages' => $pages,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('SellerPages/Create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'images' => 'nullable|array',
            'images.*' => 'file',
        ]);

        $data['slug'] = Page::generateUniqueSlug();

        if ($request->hasFile('images')) {
            $paths = [];
            foreach ($request->file('images') as $img) {
                $paths[] = $img->store('pages', 'public');
            }
            $data['images'] = $paths;
        }

        $request->user()->pages()->create($data);

        return Redirect::route('seller.pages.index');
    }

    public function edit(Page $page): Response
    {
        return Inertia::render('SellerPages/Edit', [
            'page' => $page,
        ]);
    }

    public function update(Request $request, Page $page)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'images' => 'nullable|array',
            'images.*' => 'sometimes',
        ]);

        if ($request->hasFile('images')) {
            $paths = [];
            foreach ($request->file('images') as $img) {
                $paths[] = $img->store('pages', 'public');
            }
            $data['images'] = array_merge($request->input('images', []), $paths);
        }

        $data['slug'] = $page->slug;

        $page->update($data);

        return Redirect::route('seller.pages.index');
    }

    public function destroy(Page $page)
    {
        $page->delete();
        return Redirect::route('seller.pages.index');
    }

}
