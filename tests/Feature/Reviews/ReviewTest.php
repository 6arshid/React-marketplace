<?php

namespace Tests\Feature\Reviews;

use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ReviewTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_create_and_delete_review(): void
    {
        $user = User::factory()->create();
        $category = Category::factory()->create(['user_id' => $user->id]);
        $product = Product::factory()->create(['user_id' => $user->id, 'category_id' => $category->id]);

        $response = $this->actingAs($user)->post(route('reviews.store', $product), [
            'rating' => 5,
            'body' => 'Great!',
        ]);
        $response->assertStatus(200);
        $this->assertDatabaseHas('reviews', ['product_id' => $product->id, 'body' => 'Great!']);

        $reviewId = $response->json('id');
        $deleteResponse = $this->actingAs($user)->delete(route('reviews.destroy', $reviewId));
        $deleteResponse->assertStatus(204);
        $this->assertDatabaseMissing('reviews', ['id' => $reviewId]);
    }
}
