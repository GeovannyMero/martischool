<?php

namespace App\Modelos;

use Illuminate\Database\Eloquent\Model;

class Personal extends Model
{
    protected $table = 'personal';
    protected $primarykey = 'id';
    public $timestamps = 'false';

    public function user()
    {
        return $this->belongsTo("App\User");
    }
}
