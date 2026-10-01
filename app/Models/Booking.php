<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
      protected $fillable = [
        'reference',
        'name',
        'email',
        'phone',
        'purpose',
        'budget',
        'custom_budget',
        'meeting_type',
        'date',
        'time',
        'location',
        'status'
    ];
}
