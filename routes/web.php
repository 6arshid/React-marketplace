<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\StoreController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\StripeConfigController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::patch('/profile/settlement', [ProfileController::class, 'updateSettlement'])->name('profile.settlement.update');
    Route::patch('/profile/contact', [ProfileController::class, 'updateContact'])->name('profile.contact.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('categories', CategoryController::class);
    Route::resource('products', ProductController::class);
});

Route::get('{user:username}/store/categories/{category:slug}', [StoreController::class, 'category'])
    ->name('store.categories.show');

Route::middleware(['auth', 'is_admin'])->prefix('admin')->group(function () {
    Route::get('/', [AdminController::class, 'index'])->name('admin.index');
    Route::get('/stripe-config', [StripeConfigController::class, 'edit'])->name('admin.stripe.edit');
    Route::post('/stripe-config', [StripeConfigController::class, 'update'])->name('admin.stripe.update');
});

require __DIR__.'/auth.php';
