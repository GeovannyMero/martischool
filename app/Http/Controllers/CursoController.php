<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Modelos\Curso;
use \App\Modelos\NivelEducativo;
use Illuminate\Support\Facades\Auth;

class CursoController extends Controller
{
    public function index()
    {
        return view('General.Curso.Index');
    }

    public function all()
    {
        $curso;
        try
        {
            if(Auth::check())
            {
                $curso = Curso::all();
            }
        }catch(Exception $e)
        {
            return response()->json(['mensaje' => $e->getMessage()]);
        }
        return $curso;
    }

    public function niveles(){
return NivelEducativo::all();
    }
}
