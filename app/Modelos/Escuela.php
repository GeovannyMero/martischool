<?php

namespace App\Modelos;

use Illuminate\Database\Eloquent\Model;

class Escuela extends Model
{
    protected $table = 'escuela';
    protected $primarykey = 'id';
    public $timestamps = 'false';
}
