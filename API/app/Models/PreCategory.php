<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PreCategory extends Model
{
    use HasFactory;

    protected $table = 'pre_categories';

    public $timestamps = true; //by default timestamp false

    protected $fillable = ['name','cover','status','extra_field'];

    protected $hidden = [
        'updated_at', 'created_at',
    ];

    protected $casts = [
        'status' => 'integer',
    ];
}
