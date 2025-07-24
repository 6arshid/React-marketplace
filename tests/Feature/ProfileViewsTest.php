<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProfileViewsTest extends TestCase
{
    use RefreshDatabase;

    public function test_profile_views_increment_when_viewed(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)->get(route('profile.show', $user->username));

        $this->assertDatabaseHas('users', [
            'id' => $user->id,
            'profile_views' => 1,
        ]);

    }
}
