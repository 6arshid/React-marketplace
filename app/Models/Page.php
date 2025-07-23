<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Page extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'slug', 'description', 'images'];

    protected $casts = [
        'images' => 'array',
    ];

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
