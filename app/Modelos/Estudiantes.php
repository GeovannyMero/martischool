<?php

namespace App\Modelos;

use Illuminate\Database\Eloquent\Model;

class Estudiantes extends Model
{
    protected $table = 'estudiante';
    protected $primarykey = 'id';
    public $timestamps = 'false';

    public function representantes()
    {
        return $this->belongsToMany('App\Modelos\Representante');
    }
}

