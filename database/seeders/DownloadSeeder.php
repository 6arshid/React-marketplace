<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Order;

class DownloadSeeder extends Seeder
{
    public function run(): void
    {
        Order::factory(50)->create(['is_digital' => true]);
    }
}
