<?php

namespace App\Modelos;

use Illuminate\Database\Eloquent\Model;

class Permiso extends Model
{
    protected $table = 'permiso';
    protected $primarykey = 'id';
    public $timestamps = 'false';

    // public function rol_permiso()
    // {
    //     return $this->hasMany('App\Rol_Permiso');
    // }
}
