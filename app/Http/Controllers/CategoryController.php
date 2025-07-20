<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    public function index(): Response
    {
        $categories = Category::where('user_id', auth()->id())->get();

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
        $request->merge([
            'slug' => $this->generateUniqueSlug(
                $request->input('slug') ?: $request->input('name')
            ),
        ]);

        $data = $request->validate([
            'name' => 'required|string|unique:categories,name',
            'slug' => 'required|string|unique:categories,slug',
        ]);

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
        $request->merge([
            'slug' => $this->generateUniqueSlug(
                $request->input('slug') ?: $request->input('name'),
                $category->id
            ),
        ]);

        $data = $request->validate([
            'name' => 'required|string|unique:categories,name,' . $category->id,
            'slug' => 'required|string|unique:categories,slug,' . $category->id,
        ]);

        $category->update($data);

        return Redirect::route('categories.index');
    }

    public function destroy(Category $category): RedirectResponse
    {
        $category->delete();

        return Redirect::route('categories.index');
    }

    private function generateUniqueSlug(string $value, int $ignoreId = 0): string
    {
        $base = Str::slug($value);
        $slug = $base;

        while (
            Category::where('slug', $slug)
                ->when($ignoreId, fn ($q) => $q->where('id', '!=', $ignoreId))
                ->exists()
        ) {
            $slug = $base.'-'.uniqid();
        }

        return $slug;
    }
}
