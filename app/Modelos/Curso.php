<?php

namespace App\Modelos;

use Illuminate\Database\Eloquent\Model;

class Curso extends Model
{
    protected $table = 'curso';
    protected $primarykey = 'id';
    public $timestamps = 'false';


    public function paralelos(){
        return $this->belongsToMany('App\Modelos\Paralelos');
    }
}


