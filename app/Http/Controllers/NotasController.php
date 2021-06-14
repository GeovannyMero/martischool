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
                //obtiene el rol del usuario
                $rol = Auth::user()->rol->nombre;
                $anio = date("Y");
                if (strtoupper($rol) == "PROFESOR") {
                    //Obtiene datos del personal mediante el usuario
                    $personalUsuario = Personal::where("id_user", Auth::user()->id)->first();
                    //$personalplanificacion = PersonalPlanificacion::where("personal_id", $personalUsuario->id)->first();
                    //dd($personalUsuario);
                    if($personalUsuario != null){
                        if($personalUsuario->id > 0)
                        {
                            $curso = DB::table("periodo")
                            //$curso = DB::table('planificacion')
                            ->join("planificacion", "planificacion.id_periodo", "=", "periodo.id")
                                ->join('personal_planificacion', 'planificacion.id', '=', 'personal_planificacion.planificacion_id')
                                ->join('curso', 'planificacion.curso_id', '=', 'curso.id')
                                ->join('paralelo', 'planificacion.paralelo_id', '=', 'paralelo.id')
                                ->join('estudiante','curso.id', '=', 'estudiante.idCurso')
                                ->where('personal_planificacion.personal_id',$personalUsuario->id)
                                ->where("periodo.periodo_inicio", "=", $anio)
                                ->groupBy('curso.nombre','paralelo.nombre', 'curso.id', 'paralelo.id', 'planificacion.paralelo_id', 'planificacion.curso_id')
                                ->select('curso.nombre as curso','curso.id as idCurso','paralelo.id as idParalelo',
                                    'paralelo.nombre as paralelo',
                                    //DB::raw('count(estudiante.id) as cantEstudiante')
                                   DB::raw("(select count(1) from estudiante where estudiante.\"idParalelo\" = planificacion.\"paralelo_id\" and estudiante.\"idCurso\" = planificacion.\"curso_id\") as cantEstudiante")
                                )
                                ->get();
                            //->toSql();
                            //dd($curso);
                        }
                    }
                }else if(strtoupper($rol) == "ADMINISTRADOR"){
                    $curso = DB::table("periodo")
                        ->join("planificacion", "planificacion.id_periodo", "=", "periodo.id")
                        ->join("curso", "curso.id", "=", "planificacion.curso_id")
                        ->join("paralelo", "paralelo.id", "=", "planificacion.paralelo_id")
                        ->leftJoin("estudiante", "curso.id", "=", "estudiante.idCurso")
                        ->where("periodo.activo", "=", true)
                        ->where("planificacion.activo", "=", true)
                        ->where("periodo_inicio", "=", $anio)
                        ->groupBy('curso.nombre','paralelo.nombre', 'curso.id', 'paralelo.id')
                        ->select("curso.nombre as curso", "curso.id as idCurso", "paralelo.id as idParalelo", "paralelo.nombre as paralelo", DB::raw('count(estudiante.id) as cantEstudiante'))
                        ->get();
                    //dd($curso);
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
                    return view ('General.Notas.comportamiento')->with(['idCurso' => $idcurso])->with(["idParalelo" => $idParalelo]);
                }
            }
        } catch (Exception $e) {
            return  response()->json(["mensaje" => $e.getMessage()]);
        }
    }

    public function comportamientoPorCurso(int $idcurso, int $idParalelo)
    {
        //dd($idParalelo);
        try {
            //$estudiantesPorCurso = Estudiantes::where('idCurso', $idcurso)->get();
            $estudiantesPorCurso = DB::table('estudiante')
            ->leftjoin('comportamiento',function($join){
                $join->on('estudiante.id', '=', 'comportamiento.estudiante_id')
                    ->where("comportamiento.parcial_id", "=", "1");
            })// 'estudiante.id', '=', 'comportamiento.estudiante_id')
            ->select('estudiante.id', 'estudiante.primerNombre','estudiante.segundoNombre', 'estudiante.primerApellido','estudiante.segundoApellido',
            'comportamiento.id as comportamientoId', 'comportamiento.parcial_id', 'comportamiento.nota', 'estudiante.activo')
                ->where("estudiante.activo", "=", true)
                ->where("estudiante.idCurso", "=", $idcurso)
                ->where("estudiante.idParalelo", "=", $idParalelo)
                ->distinct()
            ->get();
            //->toSql();
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
                    return response()->json(['codigo' => 0, 'mensaje' => 'Se guardo con exito']);
                }
            }
        } catch (Exception $e) {
            return response()->json(['mensaje' => $e->getMessage()]);
        }
    }

    public function ObtnerComportamientoPorEstudianteParcial(int $idEstudiante, int $idParcial){
        try {
            $comportamiento = Comportamiento::where("parcial_id", "=", $idParcial)->where("estudiante_id", "=", $idEstudiante)->first();
        }catch (Exception $e){
            return response()->json(['mensaje' => $e->getMessage()]);
        }
        return $comportamiento;

    }



}
