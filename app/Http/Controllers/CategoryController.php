<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    public function index(): Response
    {
        $categories = Category::where('user_id', auth()->id())
            ->latest()
            ->get();

        return Inertia::render('Categories/Index', [
            'categories' => $categories,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Categories/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => 'required|string|unique:categories,name',
            'icon' => 'nullable|file|max:' . $this->maxUploadSize(),
        ]);

        $data['slug'] = $this->generateUniqueSlug();

        if ($request->hasFile('icon')) {
            $data['icon'] = $request->file('icon')->store('icons', 'public');
        }

        $request->user()->categories()->create($data);

        return Redirect::route('categories.index');
    }

    public function edit(Category $category): Response
    {
        return Inertia::render('Categories/Edit', [
            'category' => $category,
        ]);
    }

    public function update(Request $request, Category $category): RedirectResponse
    {
        $data = $request->validate([
            'name' => 'required|string|unique:categories,name,' . $category->id,
            'icon' => 'nullable',
        ]);

        if ($request->hasFile('icon')) {
            $request->validate([
                'icon' => 'file|max:' . $this->maxUploadSize(),
            ]);
            $data['icon'] = $request->file('icon')->store('icons', 'public');
        } elseif ($request->input('icon') === null) {
            $data['icon'] = null;
        }

        $data['slug'] = $category->slug;

        $category->update($data);

        return Redirect::route('categories.index');
    }

    public function destroy(Category $category): RedirectResponse
    {
        $category->delete();

        return Redirect::route('categories.index');
    }

    private function generateUniqueSlug(): string
    {
        do {
            $slug = uniqid();
        } while (Category::where('slug', $slug)->exists());

        return $slug;
    }
}
