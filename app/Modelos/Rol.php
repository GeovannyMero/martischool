<?php

namespace App\Modelos;

use Illuminate\Database\Eloquent\Model;
use App\Modelos\Permiso;

class Rol extends Model
{
    protected $table = 'rol';
    protected $primarykey = 'id';
    public $timestamps = 'false';

    public function rol_permiso()
    {
        return $this->hasMany('App\Rol_Permiso');
    }
    // public function permiso()
    // {
    //     return $this->hasMany('App\Modelos\Permiso')->using('App\Modelos\Rol_Permiso');
    // }

    public function user()
    {
        return $this->hasMany('App\User');
    }

}
