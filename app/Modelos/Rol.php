<?php

namespace App\Modelos;

use Illuminate\Database\Eloquent\Model;

class Rol extends Model
{
    protected $table = 'rol';
    protected $primarykey = 'id';
    public $timestamps = 'false';

    public function rol_permiso()
    {
        return $this->hasMany('App\Rol_Permiso');
    }
}
