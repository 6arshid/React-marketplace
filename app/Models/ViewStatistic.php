<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ViewStatistic extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'date',
        'product_views',
        'profile_views',
    ];

    protected function casts(): array
    {
        return [
            'date' => 'date',
            'product_views' => 'integer',
            'profile_views' => 'integer',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
