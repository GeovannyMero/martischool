<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Modelos\Periodo;
use PHPUnit\Framework\Exception;
use Illuminate\Support\Facades\Auth;

class PeriodoController extends Controller
{
    public function index()
    {
        return view ('General.Periodo.index');
    }

    public function all()
    {
        try
        {
            $periodo = Periodo::all();
        } catch (Exception $e)
        {
            return response()->json(['mensaje' => $e->getMessage()]);
        }
        return $periodo;
    }

    public function insert(Request $request)
    {
        try
        {
            if($request != null)
            {
                $periodo = new Periodo();
                $periodo->periodo_inicio = $request->periodo_inicio;
                $periodo->periodo_fin = $request->periodo_fin;
                $periodo->fecha_inicio = $request->fecha_inicio;
                $periodo->fecha_fin = $request->fecha_fin;
                $periodo->activo = true;
                $periodo->created_by  = Auth::user()->name;
                $periodo->updated_by  = Auth::user()->name;
                if($periodo->save())
                {
                    return response()->json(['mensaje'=> 'Se guardo correctamente']);
                }


            }
        }catch(Exception  $e)
        {
            return response()->json(['mensaje' => $e->getMessage()]);
        }
    }
}