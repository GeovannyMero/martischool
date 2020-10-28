<?php

namespace App\Modelos;

use Illuminate\Database\Eloquent\Model;

class EstudiantesRepresentante extends Model
{
    protected $table = 'estudiantes_representante';
    protected $primarykey = 'id';
    public $timestamps = 'false';
}
