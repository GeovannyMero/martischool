<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use PHPUnit\Framework\Exception;
use \App\Modelos\Planificacion;
use Illuminate\Support\Facades\Auth;
use \App\Modelos\Periodo;
use \App\Modelos\Curso;
use \App\Modelos\Paralelos;
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

    public function insert(Request $request)
    {
        try {
            if (Auth::check()) {
                if ($request != null)
                {
                    $planificacion = new Planificacion();
                    $planificacion->id_periodo = $request->id_periodo;
                    $planificacion->id_curso = $request->id_curso;
                    $planificacion->id_paralelo = $request->id_paralelo;
                    $planificacion->activo = true;
                    $planificacion->created_by = Auth::user()->get();
                    $planificacion->updated_by = Auth::user()->get();
                    if($planificacion->save()){
                        return response()->json(["mensaje"=>"Se actualizó correctamente."]);
                    }
                }
            }
        } catch (Exception $e) {
            return response()->json(['mensaje' => $e->getMessage()]);
        }
    }

    public function update(Request $request, int $id)
    {
        try {
            if ($id !== 0) {
                $planificacion = Planificacion::find($id);
                if ($planificacion !== null) {

                    $planificacion->id_curso = $request->id_curso != null ? $request->id_curso : $planificacion->id_curso;
                    $planificacion->id_paralelo = $request->id_paralelo != null  ? $request->id_paralelo : $planificacion->id_paralelo;
                    $planificacion->activo = $request->activo == false ? false : true;
                    $planificacion->updated_by = Auth::user()->name;
                    if($planificacion->save())
                    {
                        return response()->json(["mensaje"=>"Se actualizó correctamente."]);
                    }
                 }
            }
        } catch (Exception $e) {
            return response()->json(['mensaje' => $e->getMessage()]);
        }
    }

    public function prePlanificacion()
    {
        try {
            //$datos = Periodo::where('activo', true)->get();
            $cursos = Curso::where('activo', true)->get();
            //$paralelos = Paralelos::where('activo', true)->get();
            //$datos = collect(['cursos' => $cursos]);
            //dump($datos);

        } catch (Exception $e) {
            return response()->json(['mensaje' => $e->getMessage()]);
        }
        return $cursos;
    }

    public function paralelos()
    {
        try {
            //$datos = Periodo::where('activo', true)->get();
            //$cursos = Curso::where('activo', true)->get();
            $paralelos = Paralelos::where('activo', true)->get();
            //$datos = collect(['cursos' => $cursos]);
            //dump($datos);

        } catch (Exception $e) {
            return response()->json(['mensaje' => $e->getMessage()]);
        }
        return $paralelos;
    }

    public function periodos()
    {
        try {
            $periodos = Periodo::where('activo', true)->get();
        } catch (Exception $e) {
            return response()->json(['mensaje' => $e->getMessage()]);
        }
        return $periodos;
    }

    public function findByCourse(int $idCurso){
        try{
            if($idCurso != null)
            {
                $paralelos = Planificacion::where('id_curso',$idCurso)->get();

            }
        }catch(Exception $e){
            return response()->json(['mensaje' => $e->getMessage()]);
        }
        return $paralelos;
    }

    public function findParalelo(int $idCurso){
        $paralelos = Curso::find($idCurso)->paralelos()->get();
        return $paralelos;
    }
}
