<?php

namespace App\Modelos;

use Illuminate\Database\Eloquent\Model;

class Profesor extends Model
{
    protected $table = 'profesor';
    protected $primarykey = 'id';
    public $timestamps = 'false';
}
