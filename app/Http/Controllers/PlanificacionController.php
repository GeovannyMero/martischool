<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;


class PlanificacionController extends Controller
{
    public function Index(){
        try{
            return view('General.Planificacion.index');
        }catch(Exception $e)
        {
            return response()->json(['mensaje' => $e->getMessage()]);
        }
    }
}
