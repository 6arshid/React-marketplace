<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/** @extends Factory<Product> */
class ProductFactory extends Factory
{
    protected $model = Product::class;

    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'category_id' => Category::factory(),
            'title' => $this->faker->words(3, true),
            'slug' => Str::slug($this->faker->unique()->words(3, true)) . '-' . Str::random(5),
            'description' => $this->faker->sentence(),
            'price' => $this->faker->randomFloat(2, 1, 100),
            'images' => [$this->faker->imageUrl()],
            'is_digital' => true,
            'is_voucher' => false,
            'shipping_cost' => null,
            'demo_file' => null,
            'main_file' => 'files/' . Str::random(10) . '.txt',
        ];
    }
}
