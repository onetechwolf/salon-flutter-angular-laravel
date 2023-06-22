<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Category extends Model
{
    use HasFactory;

    protected $table = 'categories';

    public $timestamps = true; //by default timestamp false

    protected $fillable = ['name', 'parent_id', 'cover','status','extra_field'];

    protected $hidden = [
        'updated_at', 'created_at',
    ];

    protected $casts = [
        'status' => 'integer',
    ];

    public function parent(): BelongsTo
    {
        return $this->belongsTo(PreCategory::class, 'parent_id');
    }
}
