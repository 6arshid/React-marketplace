<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AdminPageController;
use App\Http\Controllers\AdminProPanelController;
use App\Http\Controllers\AdminReservedUsernameController;
use App\Http\Controllers\AdminTransactionController;
use App\Http\Controllers\AdminReportController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SellerPageController;
use App\Http\Controllers\SocialLinkController;
use App\Http\Controllers\StoreController;
use App\Http\Controllers\Auth\AccountTypeController;
use App\Http\Controllers\StripeConfigController;
use App\Http\Controllers\StripeWebhookController;
use App\Http\Controllers\SubscriptionController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\AdminAppearanceController;
use App\Http\Controllers\AdminGeneralConfigController;
use App\Http\Controllers\AdminSitemapController;
use App\Http\Controllers\AdminUserController;
use App\Http\Controllers\SitemapController;
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
    Route::post('/profile/logo', [ProfileController::class, 'updateLogo'])->name('profile.logo');
    Route::delete('/profile/logo', [ProfileController::class, 'deleteLogo'])->name('profile.logo.delete');
    Route::post('/profile/cover', [ProfileController::class, 'updateCover'])->name('profile.cover');
    Route::delete('/profile/cover', [ProfileController::class, 'deleteCover'])->name('profile.cover.delete');
    Route::get('/profile/become-seller', [ProfileController::class, 'becomeSeller'])->name('profile.become-seller');
    Route::get('/profile/become-buyer', [ProfileController::class, 'becomeBuyer'])->name('profile.become-buyer');
    Route::get('/account-type', [AccountTypeController::class, 'show'])->name('account-type.show');
    Route::post('/account-type', [AccountTypeController::class, 'store'])->name('account-type.store');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('categories', CategoryController::class);
    Route::resource('products', ProductController::class);
    Route::get('/products/{product}/reviews', [\App\Http\Controllers\ReviewController::class, 'index'])->name('reviews.index');
    Route::post('/products/{product}/reviews', [\App\Http\Controllers\ReviewController::class, 'store'])->name('reviews.store');
    Route::post('/reviews/{review}/replies', [\App\Http\Controllers\ReviewController::class, 'reply'])->name('reviews.reply');
    Route::delete('/reviews/{review}', [\App\Http\Controllers\ReviewController::class, 'destroy'])->name('reviews.destroy');
    Route::post('/reviews/{review}/like', [\App\Http\Controllers\ReviewController::class, 'like'])->name('reviews.like');
    Route::post('/reviews/{review}/dislike', [\App\Http\Controllers\ReviewController::class, 'dislike'])->name('reviews.dislike');
    Route::resource('pages', SellerPageController::class)->names('seller.pages');
    Route::resource('social-links', SocialLinkController::class)->except(['create', 'edit', 'show']);
    Route::post('/cart/add/{product}', [\App\Http\Controllers\CartController::class, 'add'])->name('cart.add');
    Route::get('/cart', [\App\Http\Controllers\CartController::class, 'show'])->name('cart.show');
    Route::post('/cart/checkout', [\App\Http\Controllers\CartController::class, 'checkout'])->name('cart.checkout');
    Route::get('/cart/success/{order}', [\App\Http\Controllers\CartController::class, 'success'])->name('cart.success');

    Route::get('/orders', [\App\Http\Controllers\OrderController::class, 'index'])->name('orders.index');
    Route::get('/orders/downloads', [\App\Http\Controllers\OrderController::class, 'downloads'])->name('orders.downloads');
    Route::patch('/orders/{order}', [\App\Http\Controllers\OrderController::class, 'update'])->name('orders.update');

    Route::get('/transactions', [TransactionController::class, 'index'])->name('transactions.index');
    Route::get('/transactions/money', [TransactionController::class, 'money'])->name('transactions.money');
    Route::post('/transactions/request', [TransactionController::class, 'request'])->name('transactions.request');

    Route::get('/sales', [\App\Http\Controllers\SalesController::class, 'index'])->name('sales.index');

    Route::get('/subscription', [SubscriptionController::class, 'index'])->name('subscription.index');
    Route::post('/subscription/checkout', [SubscriptionController::class, 'checkout'])->name('subscription.checkout');
    Route::get('/subscription/success', [SubscriptionController::class, 'success'])->name('subscription.success');
    Route::post('/subscription/cancel', [SubscriptionController::class, 'cancel'])->name('subscription.cancel');

    Route::post('/notifications/read-all', [\App\Http\Controllers\NotificationController::class, 'markAllRead'])->name('notifications.read-all');
    Route::get('/notifications', [\App\Http\Controllers\NotificationController::class, 'index'])->name('notifications.index');

    Route::post('/report/{user:username}', [ReportController::class, 'store'])->name('report.store');
});

Route::get('{user:username}/store/categories/{category:slug}', [StoreController::class, 'category'])
    ->name('store.categories.show');
Route::get('{user:username}/pages/{page:slug}', [StoreController::class, 'page'])->name('store.pages.show');

Route::middleware(['auth', 'is_admin'])->prefix('admin')->group(function () {
    Route::get('/', [AdminController::class, 'index'])->name('admin.index');
    Route::get('/stripe-config', [StripeConfigController::class, 'edit'])->name('admin.stripe.edit');
    Route::post('/stripe-config', [StripeConfigController::class, 'update'])->name('admin.stripe.update');
    Route::get('/pro-panel', [AdminProPanelController::class, 'index'])->name('admin.pro-panel.index');
    Route::post('/pro-panel', [AdminProPanelController::class, 'update'])->name('admin.pro-panel.update');
    Route::post('/pro-panel/user', [AdminProPanelController::class, 'saveUser'])->name('admin.pro-panel.user');
    Route::delete('/pro-panel/{user}', [AdminProPanelController::class, 'disable'])->name('admin.pro-panel.disable');
    Route::get('/transactions', [AdminTransactionController::class, 'index'])->name('admin.transactions.index');
    Route::get('/transactions/money', [AdminTransactionController::class, 'money'])->name('admin.transactions.money');
    Route::post('/transactions/{transaction}/pay', [AdminTransactionController::class, 'pay'])->name('admin.transactions.pay');
    Route::post('/transactions/pay-all', [AdminTransactionController::class, 'payAll'])->name('admin.transactions.pay-all');
    Route::get('/reserved-usernames', [AdminReservedUsernameController::class, 'index'])->name('admin.reserved-usernames.index');
    Route::post('/reserved-usernames', [AdminReservedUsernameController::class, 'store'])->name('admin.reserved-usernames.store');
    Route::delete('/reserved-usernames/{reservedUsername}', [AdminReservedUsernameController::class, 'destroy'])->name('admin.reserved-usernames.destroy');

    Route::get('/appearance', [AdminAppearanceController::class, 'edit'])->name('admin.appearance.edit');
    Route::post('/appearance', [AdminAppearanceController::class, 'update'])->name('admin.appearance.update');

    Route::get('/general-config', [AdminGeneralConfigController::class, 'edit'])->name('admin.general-config.edit');
    Route::post('/general-config', [AdminGeneralConfigController::class, 'update'])->name('admin.general-config.update');

    Route::get('/sitemap', [AdminSitemapController::class, 'index'])->name('admin.sitemap.index');

    Route::resource('pages', AdminPageController::class)
        ->except(['show'])
        ->names('admin.pages');

    Route::get('/reports', [AdminReportController::class, 'index'])->name('admin.reports.index');
    Route::post('/reports/{user}/suspend', [AdminReportController::class, 'suspend'])->name('admin.reports.suspend');
    Route::post('/reports/{user}/unsuspend', [AdminReportController::class, 'unsuspend'])->name('admin.reports.unsuspend');

    Route::get('/users', [AdminUserController::class, 'index'])->name('admin.users.index');
    Route::post('/users/{user}/suspend', [AdminUserController::class, 'suspend'])->name('admin.users.suspend');
    Route::post('/users/{user}/unsuspend', [AdminUserController::class, 'unsuspend'])->name('admin.users.unsuspend');
    Route::delete('/users/{user}', [AdminUserController::class, 'destroy'])->name('admin.users.destroy');
    Route::post('/users/{user}/make-admin', [AdminUserController::class, 'makeAdmin'])->name('admin.users.make-admin');
    Route::post('/users/{user}/remove-admin', [AdminUserController::class, 'removeAdmin'])->name('admin.users.remove-admin');
});

Route::post('/stripe/webhook', StripeWebhookController::class)->name('stripe.webhook');

Route::get('/track', function () {
    return Inertia::render('Orders/TrackForm');
})->name('orders.track-form');

Route::get('/track/{code}', [\App\Http\Controllers\OrderController::class, 'track'])->name('orders.track');

Route::get('/pages/{page:slug}', [PageController::class, 'show'])->name('pages.show');

Route::get('/sitemap{index?}.xml', [SitemapController::class, 'index'])
    ->where('index', '\\d*');

require __DIR__.'/auth.php';

Route::get('/{user:username}', [StoreController::class, 'profile'])->name('profile.show');
