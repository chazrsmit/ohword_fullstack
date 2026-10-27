<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Word extends Model
{
    protected $fillable = [
        'word',
        'phonetics',
        'type1',
        'type2',
        'def1',
        'def1bis',
        'def2',
        'def2bis',
        'source'
    ];
}
