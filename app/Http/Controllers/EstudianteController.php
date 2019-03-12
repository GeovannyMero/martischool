<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Modelos\Estudiantes;

class EstudianteController extends Controller
{
    public function index(){
        return view ('General.Estudiante.estudiante');
    }

    public function all(){
        try{
            $estudiantes = Estudiantes::all();
        }catch(Exception $e){

        }
        return $estudiantes;
    }
}
