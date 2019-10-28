<?php

namespace App\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use \App\Modelos\Estudiantes;

class NotasController extends Controller
{
    public function index()
    {
        return view('General.Notas.index');
    }

    public function cursos(){
        try {
            if(Auth::check())
            {
                $curso = DB::table('planificacion')
                ->join('personal_planificacion', 'planificacion.id', '=', 'personal_planificacion.planificacion_id')
                ->join('curso', 'planificacion.curso_id', '=', 'curso.id')
                ->join('paralelo', 'planificacion.paralelo_id', '=', 'paralelo.id')
                ->join('estudiante','curso.id', '=', 'estudiante.idCurso')
                ->where('personal_planificacion.personal_id',5)
                ->groupBy('curso.nombre','paralelo.nombre', 'curso.id', 'paralelo.id')
                ->select('curso.nombre as curso','curso.id as idCurso','paralelo.id as idParalelo','paralelo.nombre as paralelo', DB::raw('count(estudiante.id) as cantEstudiante'))
                ->get();
               // dd($curso);
            }
        } catch (Exception $e) {
            return response()->json(["mensaje" => $e->getMessage()]);
        }
        return $curso;
    }

    public function comportamiento(int $idcurso, int $idParalelo)
    {
        try {
            if(Auth::check())
            {
                if($idcurso > 0 && $idParalelo > 0)
                {
                    return view ('General.Notas.comportamiento')->with(['idCurso' => $idcurso]);
                }
            }
        } catch (Exception $e) {
            return  response()->json(["mensaje" => $e.getMessage()]);
        }
    }

    public function comportamientoPorCurso(int $idcurso)
    {
        try {
            $estudiantesPorCurso = Estudiantes::where('idCurso', $idcurso)->get();
            //dd($estudiantesPorCurso);
        } catch (Exception $e) {
            return response()->json(['mensaje' => $e.getMessage()]);
        }
        return $estudiantesPorCurso;
    }


}
