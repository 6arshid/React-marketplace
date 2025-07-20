<?php

namespace App\Http\Controllers;

use App\Models\Attribute;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(): Response
    {
        $products = Product::with('category')
            ->where('user_id', auth()->id())
            ->get();

        return Inertia::render('Products/Index', [
            'products' => $products,
        ]);
    }

    public function create(Request $request): Response|RedirectResponse
    {
        if (Category::where('user_id', $request->user()->id)->count() === 0) {
            return Redirect::route('categories.create');
        }

        return Inertia::render('Products/Create', [
            'categories' => Category::where('user_id', $request->user()->id)->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|unique:products,slug',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'category_id' => 'required|exists:categories,id',
            'is_digital' => 'boolean',
            'shipping_cost' => 'nullable|numeric',
            'demo_file' => 'nullable|string',
            'main_file' => 'nullable|string',
            'images' => 'nullable|array',
            'images.*' => 'string',
            'attributes' => 'array',
            'attributes.*.title' => 'required|string',
            'attributes.*.option' => 'required|string',
            'attributes.*.price' => 'numeric',
        ]);

        $product = $request->user()->products()->create($data);

        if (! empty($data['attributes'])) {
            foreach ($data['attributes'] as $attr) {
                $product->attributes()->create($attr);
            }
        }

        return Redirect::route('products.index');
    }

    public function edit(Product $product): Response
    {
        return Inertia::render('Products/Edit', [
            'product' => $product->load('attributes'),
            'categories' => Category::where('user_id', auth()->id())->get(),
        ]);
    }

    public function update(Request $request, Product $product): RedirectResponse
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|unique:products,slug,' . $product->id,
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'category_id' => 'required|exists:categories,id',
            'is_digital' => 'boolean',
            'shipping_cost' => 'nullable|numeric',
            'demo_file' => 'nullable|string',
            'main_file' => 'nullable|string',
            'images' => 'nullable|array',
            'images.*' => 'string',
            'attributes' => 'array',
            'attributes.*.id' => 'sometimes|exists:attributes,id',
            'attributes.*.title' => 'required|string',
            'attributes.*.option' => 'required|string',
            'attributes.*.price' => 'numeric',
        ]);

        $product->update($data);

        $product->attributes()->delete();
        if (! empty($data['attributes'])) {
            foreach ($data['attributes'] as $attr) {
                $product->attributes()->create($attr);
            }
        }

        return Redirect::route('products.index');
    }

    public function destroy(Product $product): RedirectResponse
    {
        $product->delete();

        return Redirect::route('products.index');
    }
}
