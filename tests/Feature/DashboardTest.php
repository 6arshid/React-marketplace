<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class DashboardTest extends TestCase
{
    use RefreshDatabase;

    public function test_dashboard_displays_stats(): void
    {
        $user = User::factory()->create(['is_seller' => true]);
        $category = Category::factory()->create(['user_id' => $user->id]);
        $product = Product::factory()->create([
            'user_id' => $user->id,
            'category_id' => $category->id,
        ]);

        Order::factory()->create([
            'buyer_id' => $user->id,
            'seller_id' => $user->id,
            'amount' => 15,
            'status' => 'paid',
            'items' => [
                ['product_id' => $product->id, 'attribute_id' => null, 'price' => $product->price],
            ],
        ]);

        $response = $this->actingAs($user)->get(route('dashboard'));

        $response->assertInertia(fn (Assert $page) => $page
            ->component('Dashboard')
            ->where('stats.orders_count', 1)
            ->where('stats.products_count', 1)
            ->where('stats.sales_count', 1)
            ->has('recentOrders')
            ->has('recentProducts')
        );
    }
}
