<?php

namespace App\Http\Controllers;

use App\Modelos\Personal;
use App\Modelos\PersonalPlanificacion;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use \App\Modelos\Estudiantes;
use \App\Modelos\Comportamiento;

class NotasController extends Controller
{
    public function __construct(){
        $this->middleware('auth');
    }
    public function index()
    {
        return view('General.Notas.index');
    }

    public function cursos(){
        $curso = null;
        try {
            if(Auth::check())
            {
                //Obtiene datos del personal mediante el usuario
                $personalUsuario = Personal::where("id_user", Auth::user()->id)->first();
                //$personalplanificacion = PersonalPlanificacion::where("personal_id", $personalUsuario->id)->first();
                //dd($personalUsuario);
                if($personalUsuario != null){
                    if($personalUsuario->id > 0)
                    {
                        $curso = DB::table('planificacion')
                            ->join('personal_planificacion', 'planificacion.id', '=', 'personal_planificacion.planificacion_id')
                            ->join('curso', 'planificacion.curso_id', '=', 'curso.id')
                            ->join('paralelo', 'planificacion.paralelo_id', '=', 'paralelo.id')
                            ->join('estudiante','curso.id', '=', 'estudiante.idCurso')
                            ->where('personal_planificacion.personal_id',$personalUsuario->id)
                            ->groupBy('curso.nombre','paralelo.nombre', 'curso.id', 'paralelo.id')
                            ->select('curso.nombre as curso','curso.id as idCurso','paralelo.id as idParalelo','paralelo.nombre as paralelo', DB::raw('count(estudiante.id) as cantEstudiante'))
                            ->get();
                        //dd($curso);
                    }
                }

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
            //$estudiantesPorCurso = Estudiantes::where('idCurso', $idcurso)->get();
            $estudiantesPorCurso = DB::table('estudiante')
            ->leftjoin('comportamiento', 'estudiante.id', '=', 'comportamiento.estudiante_id')
            ->select('estudiante.id', 'estudiante.primerNombre',
            'comportamiento.id as comportamientoId', 'comportamiento.parcial_id', 'comportamiento.nota', 'estudiante.activo')
            ->get();
            //dd($estudiantesPorCurso);
        } catch (Exception $e) {
            return response()->json(['mensaje' => $e->getMessage()]);
        }
        return $estudiantesPorCurso;
    }

    public function guardarNota(Request $request)
    {
        try {
            if($request != null){
                if($request->comportamientoId == null){
                    $comportamiento = new Comportamiento();
                    $comportamiento->parcial_id = $request->parcial_id;
                    $comportamiento->estudiante_id = $request->id;
                    $comportamiento->nota = $request->nota;
                    $comportamiento->activo = true;
                    $comportamiento->created_by = Auth::user()->name;
                    $comportamiento->updated_by = Auth::user()->name;
                }else{
                    //valida si existe nota para el parcial y para el estudiante
                    $comportamiento = DB::table('comportamiento')
                                        ->where('parcial_id', $request->parcial_id)
                                        ->where('estudiante_id', $request->id)
                                        ->count();
                    if($comportamiento == 0)
                    {
                        $comportamiento = new Comportamiento();
                        $comportamiento->parcial_id = $request->parcial_id;
                        $comportamiento->estudiante_id = $request->id;
                        $comportamiento->nota = $request->nota;
                        $comportamiento->activo = true;
                        $comportamiento->created_by = Auth::user()->name;
                        $comportamiento->updated_by = Auth::user()->name;
                    }
                }

                if($comportamiento->save()){
                    return response()->json(['mensaje' => 'Se guardo con exito']);
                }
            }
        } catch (Exception $e) {
            return response()->json(['mensaje' => $e->getMessage()]);
        }
    }


}
