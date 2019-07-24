<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use \App\Modelos\Profesor;
use \App\Modelos\Rol;
class ProfesorController extends Controller
{
    public function index ()
    {
        if(Auth::check())
        {
            return view('General.Profesor.index');
        }
    }

    public function all()
    {
        try
        {
            if(Auth::check())
            {
                $profesor = Profesor::all();
            }
        }catch(Exception $e)
        {
            return response()->json(['mensaje' => $e->getMessage()]);
        }
        return $profesor;
    }

    public function getRolProfesor()
    {
        try
        {
            if(Auth::check())
            {
                $rol = Rol::where('activo', true)->get();
            }
        }catch(Exception $e)
        {
            return response()->json(['mensaje' => $e->getMessage()]);
        }
        return $rol;
    }
}
