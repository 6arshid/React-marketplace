<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Category;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class ProductTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_create_product(): void
    {
        Storage::fake('public');

        $user = User::factory()->create();
        $category = Category::factory()->create(['user_id' => $user->id]);

        $response = $this->actingAs($user)->post(route('products.store'), [
            'title' => 'Test Product',
            'description' => 'desc',
            'price' => 10,
            'category_id' => $category->id,
            'is_digital' => true,
            'demo_file' => UploadedFile::fake()->create('demo.txt'),
            'main_file' => UploadedFile::fake()->create('main.txt'),
            'images' => [UploadedFile::fake()->image('img.jpg')],
            'attributes' => [],
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('products', [
            'title' => 'Test Product',
            'user_id' => $user->id,
        ]);
    }

    public function test_pro_user_needs_contact_info_before_creating_product(): void
    {
        $user = User::factory()->create([
            'pro_panel' => true,
            'whatsapp_number' => null,
            'telegram_username' => null,
            'public_email' => null,
        ]);
        $category = Category::factory()->create(['user_id' => $user->id]);

        $response = $this->actingAs($user)->get(route('products.create'));

        $response->assertRedirect(route('profile.edit'));
        $response->assertSessionHas('error');
    }

    public function test_product_views_increment_when_viewed(): void
    {
        $user = User::factory()->create();
        $category = Category::factory()->create(['user_id' => $user->id]);

        $product = $user->products()->create([
            'title' => 'View Test',
            'slug' => 'view-test',
            'price' => 5,
            'category_id' => $category->id,
        ]);

        $this->actingAs($user)->get(route('products.show', $product->slug));

        $this->assertDatabaseHas('products', [
            'id' => $product->id,
            'views' => 1,
        ]);

        $this->assertDatabaseHas('view_statistics', [
            'user_id' => $user->id,
            'date' => now()->toDateString().' 00:00:00',
            'product_views' => 1,
        ]);
    }
}
