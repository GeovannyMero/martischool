<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use \App\Modelos\DetallesComportamiento;
use Exception;

class DetallesComportamientoController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function guardarDetalles(Request $request)
    {
        //dd($request);
        try {
            if($request != null)
            {
                if($request->comportamientoId > 0)
                {

                    $detalles = new DetallesComportamiento();
                    $detalles->fecha = $request->fecha;
                    $detalles->tipo = strtoupper($request->tipo) == 'POSITIVO' ? 'P' : 'N';
                    $detalles->comentario = $request->comentario;
                    $detalles->comportamiento_id = $request->comportamientoId;
                    $detalles->created_by = Auth::user()->name;
                    $detalles->updated_by = Auth::user()->name;
                    if($detalles->save())
                    {

                        return response()->json(['mensaje' => 'Se guardo con exito.']);
                    }
                }
            }
        } catch (Exception $e) {
            return response()->json(['mensaje' => $e->getMessage()]);
        }
    }

    public function detalles(int $comportamientoId){
        try {
            if($comportamientoId > 0)
            {
                $detalles = DetallesComportamiento::where('comportamiento_id', $comportamientoId)->get();
            }
        } catch (Exception $e) {
            return response()->json(['mensaje' => $e->getMessage()]);
        }
        return $detalles;
    }
}
