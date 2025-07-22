<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DownloadTest extends TestCase
{
    use RefreshDatabase;

    public function test_downloads_page_is_displayed(): void
    {
        $user = User::factory()->create();
        $category = Category::factory()->create(['user_id' => $user->id]);

        $product = Product::create([
            'user_id' => $user->id,
            'category_id' => $category->id,
            'title' => 'Test',
            'slug' => 'test',
            'price' => 10,
            'is_digital' => true,
            'main_file' => 'files/test.txt',
        ]);

        Order::create([
            'buyer_id' => $user->id,
            'seller_id' => $user->id,
            'items' => [['product_id' => $product->id, 'attribute_id' => null, 'price' => 10]],
            'amount' => 10,
            'is_digital' => true,
            'status' => 'pending',
            'tracking_code' => 'code',
        ]);

        $response = $this->actingAs($user)->get(route('orders.downloads'));

        $response->assertOk();
    }
}
