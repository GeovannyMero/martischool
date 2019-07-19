<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use PHPUnit\Framework\Exception;
use \App\Modelos\Planificacion;
use Illuminate\Support\Facades\Auth;
use \App\Modelos\Periodo;
use \App\Modelos\Curso;
use Illuminate\Support\Collection;

class PlanificacionController extends Controller
{
    public function Index()
    {
        try {
            return view('General.Planificacion.index');
        } catch (Exception $e) {
            return response()->json(['mensaje' => $e->getMessage()]);
        }
    }

    public function all()
    {
        try {
            if (Auth::check()) {
                $planificacion = Planificacion::all();
            }
        } catch (Exception $e) {
            return response()->json(['mensaje' => $e->getMessage()]);
        }
        return $planificacion;
    }

    public function prePlanificacion(){
        try{
            $datos = Periodo::where('activo', true)->get();
            //$cursos = Curso::where('activo', true)->get();
            //$datos = collect(['periodo' => $periodos]);
            //dump($datos);

        }catch(Exception $e)
        {
            return response()->json(['mensaje' => $e->getMessage()]);
        }
        return $datos;
    }
}
