<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Modelos\Permiso;

class PermisoController extends Controller
{
    public function index()
    {
        return view('General.Permiso.index');
    }
    public function all()
    {
        return Permiso::all();
    }
}
