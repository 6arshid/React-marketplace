<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->boolean('pro_panel')->default(false);
            $table->timestamp('pro_panel_expires_at')->nullable();
            $table->text('stripe_api_key')->nullable();
            $table->text('stripe_secret_key')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['pro_panel', 'pro_panel_expires_at', 'stripe_api_key', 'stripe_secret_key']);
        });
    }
};
