<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\StripeConfig;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        // Create admin user
        $user = User::updateOrCreate(
            ['email' => 'kalouvalou3@gmail.com'],
            [
                'username' => 'kalouvalou3',
                'name' => 'kalouvalou3',
                'password' => Hash::make('kalouvalou3@gmail.com'),
                'is_admin' => true,
                'stripe_api_key' => 'pk_test_51R7LMwGdTRLiMmQbFh44O6dUIbn40mJg2o3ZpH2ZFEzoMqqD6M7Fm9c7C6QRMq7NYLACyQw943X9hUoEdgzsDQSd00ooBnYsBA',
                'stripe_secret_key' => 'sk_test_51R7LMwGdTRLiMmQbN2N9ah04zKaVTJVfwKOo6CMpWnX7m4y4VA0sRPe4rSp04vPADxU5egIjLvLEEmlcQS8O6LFa00y965GlmC',
            ]
        );

        // Create or update stripe configuration
        StripeConfig::updateOrCreate(
            ['id' => 1],
            [
                'api_key' => 'pk_test_51R7LMwGdTRLiMmQbFh44O6dUIbn40mJg2o3ZpH2ZFEzoMqqD6M7Fm9c7C6QRMq7NYLACyQw943X9hUoEdgzsDQSd00ooBnYsBA',
                'secret_key' => 'sk_test_51R7LMwGdTRLiMmQbN2N9ah04zKaVTJVfwKOo6CMpWnX7m4y4VA0sRPe4rSp04vPADxU5egIjLvLEEmlcQS8O6LFa00y965GlmC',
            ]
        );
    }
}
