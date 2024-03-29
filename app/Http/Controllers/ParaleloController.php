<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use \App\Modelos\Paralelos;
use PHPUnit\Framework\Exception;
use Illuminate\Support\Facades\DB;

class ParaleloController extends Controller
{
    public function index()
    {
        return view('General.Paralelo.Index');
    }
    public function all()
    {

        try {
            if (Auth::check()) {
                $paralelos = Paralelos::all();
            }
        } catch (Exception $e) {
            return response()->json(['mensaje' => $e->getMessage()]);
        }
        return $paralelos;
    }

    public function update(Request $request, int $id)
    {
        try {
            if(Auth::check())
            {
                if($id != 0)
                {
                    $paralelo = Paralelos::find($id);
                    if($paralelo != null)
                    {
                        $paralelo->nombre = $request->nombre != null ? $request->nombre : $paralelo->nombre;
                        $paralelo->activo = $request->activo != null ? $request->activo : $paralelo->activo;
                        $paralelo->updated_by = Auth::user()->name;
                        if($paralelo->save())
                        {
                            return response()->json(["mensaje"=>"Se actualizó correctamente."]);
                        }
                    }
                }
            }
        } catch (Exception $e) {
            return response()->json(['mensaje' => $e->getMessage()]);
        }
    }

    public function insert(Request $request)
    {
        try
        {
            if(Auth::check())
            {
                if($request != null)
                {
                    $paralelo = new Paralelos();
                    $paralelo->nombre = $request->nombre;
                    $paralelo->activo = true;
                    $paralelo->created_by = Auth::user()->name;
                    $paralelo->updated_by = Auth::user()->name;
                    if($paralelo->save())
                    {
                        return response()->json(["mensaje"=>"Se guardó correctamente."]);
                    }
                }
            }
        }catch(Exception $e)
        {
            return response()->json(['mensaje' => $e->getMessage()]);
        }
    }

    public function ParaleloCurso()
    {
        try {
            $paralelosCurso = DB::table('paralelo')
            ->join('planificacion','planificacion.paralelo_id', '=', 'paralelo.id')
            ->join('curso', 'curso.id', '=', 'planificacion.curso_id')
            ->select('curso.id as idCurso', 'paralelo.id as idParalelo','paralelo.nombre')->get();
        } catch (Exception $e) {
            return response()->json(['mensaje' => $e->getMessage()]);
        }
        return $paralelosCurso;
    }

    public function delete(int $id)
    {
        try
        {
            if(Auth::check())
            {
                $paralelo = Paralelos::find($id);
                if($paralelo != null)
                {
                    $paralelo->activo = false;
                    if($paralelo->save()){
                        return response()->json(['mensaje'=> 'Se eliminó correctamente']);
                    }
                }
            }
        } catch (Exception $e) {
            return response()->json(['mensaje' => $e->getMessage()]);
        }

    }
}
