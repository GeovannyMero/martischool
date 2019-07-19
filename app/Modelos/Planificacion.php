<?php

namespace App\Modelos;

use Illuminate\Database\Eloquent\Model;

class Planificacion extends Model
{
    protected $table = 'planificacion';
    protected $primarykey = 'id';
    public $timestamps = 'false';
}
