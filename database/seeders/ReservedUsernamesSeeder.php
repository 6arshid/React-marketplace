<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ReservedUsernamesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $usernames = [
            'admin',
            'administrator',
            'user',
            'users',
            'support',
            'root',
        ];

        foreach ($usernames as $name) {
            DB::table('reserved_usernames')->updateOrInsert([
                'username' => $name,
            ]);
        }
    }
}
