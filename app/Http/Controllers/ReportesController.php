<?php

namespace App\Http\Controllers;

use App\Modelos\Curso;
use App\Modelos\Planificacion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use mysql_xdevapi\Exception;
use Illuminate\Support\Facades\DB;
use App\Modelos\Personal;
use App\Modelos\PersonalPlanificacion;

class ReportesController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function InformeComportamiento()
    {
        return view("General.Reportes.informe_comportamiento");
    }

    public function ObtenerDatosComportamiento()
    {
        $datosComportamiento = null;
        try {
            $rol = Auth::user()->rol->nombre;
            if (strtoupper($rol) == "ADMINISTRADOR" || strtoupper($rol) == "PROFESOR") {
                $idCurso = self::ObtenerCursoPorPersonal(7);

                if ($idCurso > 0) {
                    $estudiantesPorCurso = DB::table('estudiante')
                        ->leftjoin('comportamiento', 'estudiante.id', '=', 'comportamiento.estudiante_id')
                        ->leftjoin("parcial", function ($join){
                          $join->on("parcial.id", "=", "comportamiento.parcial_id")
                          ->where("parcial.activo", "=", true);
                        })
                        ->leftjoin("catalogo", function($join){
                            $join->on("catalogo.id", "=","parcial.catalogo_id")
                                ->where("catalogo.activo","=",true);
                        })
                        //->select('estudiante.id', 'estudiante.primerNombre', 'estudiante.segundoNombre', 'estudiante.primerApellido', 'estudiante.segundoApellido',
                          //  'comportamiento.id as comportamientoId', 'comportamiento.parcial_id', 'comportamiento.nota', 'estudiante.activo', "parcial.nombre as parcial", "catalogo.nombre as quintil")
                        ->select(DB::raw("UPPER(CONCAT(estudiante.\"primerNombre\",' ' ,estudiante.\"segundoNombre\", ' ', estudiante.\"primerApellido\", ' ', estudiante.\"segundoApellido\")) as alumno"), DB::raw("case when comportamiento.\"nota\" is null then 0 else comportamiento.\"nota\" end as nota"),DB::raw("case when parcial.\"nombre\" is null then 'Parcial1' else parcial.\"nombre\" end as parcial"), DB::raw("case when catalogo.\"nombre\" is null then 'Quintil' else catalogo.\"nombre\" end as quintil"))//Quintil
                        ->where("estudiante.activo", "=", true)
                        ->where("estudiante.idCurso", "=", $idCurso)
                        ->get();
                    //dd($estudiantesPorCurso);
                    return  $estudiantesPorCurso;
                } else {
                    dd("NO");
                }
            }
        } catch (Exception $e) {
            return response()->json(['mensaje' => $e->getMessage()]);
        }
    }

    private function ObtenerCursoPorPersonal(int $id_user)
    {
        $idCurso = 0;
        try {
            if ($id_user > 0) {
                $idCurso = DB::table("personal")
                    ->join("personal_planificacion", "personal_planificacion.personal_id", "=", "personal.id")
                    ->join("planificacion", "planificacion.id", "=", "personal_planificacion.planificacion_id")
                    ->join("curso", function ($join) {
                        $join->on("curso.id", "=", "planificacion.curso_id")
                            ->where("curso.activo", "=", true);
                    })
                    ->where("personal.id_user", "=", $id_user)
                    ->select("curso.id as id")
                    ->first();
                //->get();
                $personal = Personal::where("id_user", $id_user)->first();
                $personalPlanificacion = PersonalPlanificacion::where("personal_id", $personal->id)->first();
                $planificacion = Planificacion::where("id", $personalPlanificacion->planificacion_id)->first();
                $curso = Curso::where("id", $planificacion->curso_id)->where("activo", 1)->first();
                $idCurso = $curso->id;

                return $idCurso;
            }
        } catch (Exception $e) {
            throw new Exception($e->getMessage());
        }
    }
}
