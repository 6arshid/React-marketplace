<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $username
 */
class ReservedUsername extends Model
{
    protected $fillable = ['username'];
}
