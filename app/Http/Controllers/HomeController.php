<?php

namespace App\Http\Controllers;

use App\Modelos\Curso;
use App\Modelos\Personal;
use Illuminate\Http\Request;
use App\Modelos\Rol;
use App\Modelos\Periodo;
use App\Modelos\PersonalPlanificacion;
use App\Modelos\Planificacion;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index(Request $request)
    {
        $plani = 0;
        $periodo = 0;
        $cursos = 0;
        $personal = 0;
        if(Auth::check()){
            $anio = date("Y");
            if (Auth::user()->hasRol("Profesor"))
            {
                $personal = Personal::where("id_user", "=", Auth::user()->id)->first();
                $periodo = Periodo::where("periodo_inicio", "=", $anio)->where("activo", "=", true)->first();
                $planificacion = PersonalPlanificacion::where("personal_id", "=", $personal->id)->first();
                //dd($planificacion);
                //$plani = Planificacion::where("id", "=", $planificacion->planificacion_id)->count();
                $plani = DB::table("periodo")
                    ->join("planificacion", "periodo.id", "=","planificacion.id_periodo")
                    ->where("periodo.periodo_inicio", "=", $anio)
                    ->where("planificacion.id", "=", $planificacion->planificacion_id)
                    ->select(DB::raw("count(curso_id) as cursos"))
                    ->first();
                //dd($plani);

            }elseif (Auth::user()->hasRol("Administrador")){
                $personal = Personal::where("activo", "=", true)->count();
                $periodo = Periodo::where("periodo_inicio", "=", $anio)->where("activo", "=", true)->first();
                $plani = DB::table("periodo")
                    ->join("planificacion", "periodo.id", "=","planificacion.id_periodo")
                    ->where("periodo.periodo_inicio", "=", $anio)
                    ->select(DB::raw("count(curso_id) as cursos"))
                    ->first();
                //dd($plani->cursos);

            }
        }
        //$request->user()->authorizeRoles(['user', 'admin']);
        /*$rol_id = $request->user()->rol_id;
        //dd(Rol::find($id_rol)->nombre);
        $rol = Rol::find($rol_id)->nombre;

        $totalCursos = Curso::where('activo', 'true')->count();
        $personal = Personal::where('activo', true)->count();
        $periodoActual = Periodo::where('activo', true)->where('periodo_inicio', '2020')->select('periodo_inicio')->first();*/

        //return view('home')->with('totalCursos',$totalCursos)->with('personal', $personal)->with('periodoActual', $periodoActual);
        return  view('home')->with("plani", $plani)->with(["personal" => $personal])->with(["periodo" => $periodo]);
    }
}
