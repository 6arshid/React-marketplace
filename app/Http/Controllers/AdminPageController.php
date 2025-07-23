<?php

namespace App\Http\Controllers;

use App\Models\Page;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class AdminPageController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Pages/Index', [
            'pages' => Page::latest()->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Pages/Create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'images' => 'nullable|array',
            'images.*' => 'file',
        ]);

        $data['slug'] = $this->generateUniqueSlug();

        if ($request->hasFile('images')) {
            $paths = [];
            foreach ($request->file('images') as $img) {
                $paths[] = $img->store('pages', 'public');
            }
            $data['images'] = $paths;
        }

        Page::create($data);

        return Redirect::route('admin.pages.index');
    }

    public function edit(Page $page): Response
    {
        return Inertia::render('Admin/Pages/Edit', [
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

        $page->update($data);

        return Redirect::route('admin.pages.index');
    }

    public function destroy(Page $page)
    {
        $page->delete();
        return Redirect::route('admin.pages.index');
    }

    private function generateUniqueSlug(): string
    {
        do {
            $slug = uniqid();
        } while (Page::where('slug', $slug)->exists());

        return $slug;
    }
}
