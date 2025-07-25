<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Category;
use App\Models\User;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::where('email', 'admin@admin.com')->first();
        if (! $user) {
            return;
        }

        $category = Category::where('user_id', $user->id)->first() ?? Category::factory()->create(['user_id' => $user->id]);
        Product::factory(1)->create([
            'user_id' => $user->id,
            'category_id' => $category->id,
        ]);
    }
}
