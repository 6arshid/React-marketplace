<?php

namespace Tests;

use Illuminate\Foundation\Testing\Concerns\InteractsWithContainer;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    use CreatesApplication, InteractsWithContainer;

    protected function setUp(): void
    {
        parent::setUp();

        $this->withoutVite();
    }
}
