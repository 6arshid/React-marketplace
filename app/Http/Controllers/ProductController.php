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
            ->latest()
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

        $user = $request->user();
        if ($user->pro_panel && (! $user->whatsapp_number || ! $user->telegram_username || ! $user->public_email)) {
            return Redirect::route('profile.edit')
                ->with('error', 'Please complete your WhatsApp Number, Telegram Username and Public Email before creating a product.');
        }

        return Inertia::render('Products/Create', [
            'categories' => Category::where('user_id', $request->user()->id)->get(),
        ]);
    }

    public function show(Product $product): Response
    {
        $product->increment('views');

        return Inertia::render('Products/Show', [
            'product' => $product->fresh()->load('category', 'attributes'),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'category_id' => 'required|exists:categories,id',
            'is_digital' => 'boolean',
            'shipping_cost' => 'nullable|numeric',
            'demo_file' => 'nullable|file',
            'main_file' => 'nullable|file',
            'images' => 'nullable|array',
            'images.*' => 'file',
            'attributes' => 'array',
            'attributes.*.title' => 'required|string',
            'attributes.*.option' => 'required|string',
            'attributes.*.price' => 'numeric',
        ]);

        $data['slug'] = $this->generateUniqueSlug();

        if ($request->hasFile('demo_file')) {
            $data['demo_file'] = $request->file('demo_file')->store('demos', 'public');
        }

        if ($request->hasFile('main_file')) {
            $data['main_file'] = $request->file('main_file')->store('files', 'public');
        }

        if ($request->hasFile('images')) {
            $paths = [];
            foreach ($request->file('images') as $img) {
                $paths[] = $img->store('images', 'public');
            }
            $data['images'] = $paths;
        }

        $product = $request->user()->products()->create($data);

        if (! empty($data['attributes'])) {
            foreach ($data['attributes'] as $attr) {
                $product->attributes()->create($attr);
            }
        }

        return Redirect::route('products.show', $product->slug);
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
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'category_id' => 'required|exists:categories,id',
            'is_digital' => 'boolean',
            'shipping_cost' => 'nullable|numeric',
            'demo_file' => 'nullable',
            'main_file' => 'nullable',
            'images' => 'nullable|array',
            'images.*' => 'sometimes',
            'attributes' => 'array',
            'attributes.*.id' => 'sometimes|exists:attributes,id',
            'attributes.*.title' => 'required|string',
            'attributes.*.option' => 'required|string',
            'attributes.*.price' => 'numeric',
        ]);

        if ($request->hasFile('demo_file')) {
            $data['demo_file'] = $request->file('demo_file')->store('demos', 'public');
        } elseif ($request->input('demo_file') === null) {
            $data['demo_file'] = null;
        }

        if ($request->hasFile('main_file')) {
            $data['main_file'] = $request->file('main_file')->store('files', 'public');
        } elseif ($request->input('main_file') === null) {
            $data['main_file'] = null;
        }

        if ($request->hasFile('images')) {
            $paths = [];
            foreach ($request->file('images') as $img) {
                $paths[] = $img->store('images', 'public');
            }
            $data['images'] = array_merge($request->input('images', []), $paths);
        }

        $data['slug'] = $product->slug;

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

    private function generateUniqueSlug(): string
    {
        do {
            $slug = uniqid();
        } while (Product::where('slug', $slug)->exists());

        return $slug;
    }
}
