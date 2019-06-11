<?php

namespace App\Modelos;

use Illuminate\Database\Eloquent\Model;

class Rol_Permiso extends Model
{
    protected $table = 'rol_permiso';
    protected $primarykey = 'id';
    public $timestamps = 'false';

    public function rol()
    {
        return $this->belongsTo('App\Rol');
    }

    public function permiso()
    {
        return $this->belongsTo('App\Permiso');
    }
}
