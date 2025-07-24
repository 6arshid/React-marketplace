<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Order;
use App\Models\User;

class OrderSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::where('email', 'admin@admin.com')->first();
        if ($user) {
            Order::factory(50)->create(['buyer_id' => $user->id]);
        } else {
            Order::factory(50)->create();
        }
    }
}
