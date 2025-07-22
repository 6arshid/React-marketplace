<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Order;
use App\Notifications\OrderPlaced;
use App\Notifications\OrderStatusUpdated;

class NotificationSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::where('email', 'kalouvalou3@gmail.com')->first();

        if ($admin) {
            for ($i = 0; $i < 50; $i++) {
                $order = Order::factory()->create(['buyer_id' => $admin->id]);
                $type = fake()->randomElement([
                    OrderPlaced::class,
                    OrderStatusUpdated::class,
                ]);
                $admin->notify(new $type($order));
            }
        } else {
            for ($i = 0; $i < 50; $i++) {
                $user = User::inRandomOrder()->first() ?? User::factory()->create();
                $order = Order::inRandomOrder()->first() ?? Order::factory()->create();
                $type = fake()->randomElement([
                    OrderPlaced::class,
                    OrderStatusUpdated::class,
                ]);
                $user->notify(new $type($order));
            }
        }
    }
}
