<?php

namespace Database\Factories;

use App\Models\Order;
use App\Models\User;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/** @extends Factory<Order> */
class OrderFactory extends Factory
{
    protected $model = Order::class;

    public function definition(): array
    {
        $buyer = User::factory();
        $product = Product::factory()->create();
        $seller = $product->user ?? User::factory();
        return [
            'buyer_id' => $buyer,
            'seller_id' => $seller,
            'items' => [
                ['product_id' => $product->id, 'attribute_id' => null, 'price' => $product->price]
            ],
            'amount' => $product->price,
            'shipping_info' => null,
            'is_digital' => true,
            'status' => $this->faker->randomElement(['pending', 'paid', 'shipped']),
            'tracking_code' => Str::uuid(),
            'postal_tracking_code' => null,
            'buyer_wallet' => null,
        ];
    }
}
