<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Order;
use App\Models\User;

class DownloadSeeder extends Seeder
{
    public function run(): void
    {
        $user = User::where('email', 'kalouvalou3@gmail.com')->first();
        if ($user) {
            Order::factory(50)->create([
                'is_digital' => true,
                'buyer_id' => $user->id,
            ]);
        } else {
            Order::factory(50)->create(['is_digital' => true]);
        }
    }
}
