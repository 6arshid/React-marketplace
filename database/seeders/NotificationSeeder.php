<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\Models\User;
use App\Models\Order;
use App\Models\Product;
use App\Models\Category;
use App\Notifications\OrderPlaced;
use App\Notifications\OrderStatusUpdated;

class NotificationSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::where('email', 'admin@admin.com')->first();
        if (! $admin) {
            return;
        }

        $category = Category::where('user_id', $admin->id)->first() ?? Category::factory()->create(['user_id' => $admin->id]);
        $product = Product::where('user_id', $admin->id)->first() ?? Product::factory()->create([
            'user_id' => $admin->id,
            'category_id' => $category->id,
        ]);

        for ($i = 0; $i < 1; $i++) {
            $order = Order::create([
                'buyer_id' => $admin->id,
                'seller_id' => $admin->id,
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

            $type = fake()->randomElement([
                OrderPlaced::class,
                OrderStatusUpdated::class,
            ]);

            $admin->notify(new $type($order));
        }
    }
}
