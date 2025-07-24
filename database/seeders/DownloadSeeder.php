<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\Models\Order;
use App\Models\User;
use App\Models\Product;
use App\Models\Category;

class DownloadSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::where('email', 'admin@admin.com')->first();
        if (! $user) {
            return;
        }

        $category = Category::where('user_id', $user->id)->first() ?? Category::factory()->create(['user_id' => $user->id]);
        $product = Product::where('user_id', $user->id)->first() ?? Product::factory()->create([
            'user_id' => $user->id,
            'category_id' => $category->id,
        ]);

        for ($i = 0; $i < 50; $i++) {
            Order::create([
                'buyer_id' => $user->id,
                'seller_id' => $user->id,
                'items' => [
                    ['product_id' => $product->id, 'attribute_id' => null, 'price' => $product->price],
                ],
                'amount' => $product->price,
                'shipping_info' => null,
                'is_digital' => true,
                'status' => fake()->randomElement(['pending', 'paid', 'shipped']),
                'tracking_code' => Str::uuid(),
                'postal_tracking_code' => null,
                'buyer_wallet' => null,
            ]);
        }
    }
}
