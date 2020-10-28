<?php

namespace App\Modelos;

use Illuminate\Database\Eloquent\Model;

class Paralelos extends Model
{
    protected $table = 'paralelo';
    protected $primarykey = 'id';
    public $timestamps = 'false';

    public function cursos(){
        return $this->belongsToMany('App\Modelos\Curso');
    }
}
