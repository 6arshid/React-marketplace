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
}
