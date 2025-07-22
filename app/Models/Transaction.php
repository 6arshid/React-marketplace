<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int $user_id
 * @property int $amount
 * @property string $status
 * @property string|null $reference
 */
class Transaction extends Model
{
    protected $fillable = [
        'user_id',
        'amount',
        'status',
        'reference',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
