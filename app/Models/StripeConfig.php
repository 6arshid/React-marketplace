<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StripeConfig extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'api_key',
        'secret_key',
        'price',
    ];
}
