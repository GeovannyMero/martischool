<?php

namespace App\Modelos;

use Illuminate\Database\Eloquent\Model;

class Estudiantes extends Model
{
    protected $table = 'estudiante';
    protected $primarykey = 'id';
    public $timestamps = 'false';
}

