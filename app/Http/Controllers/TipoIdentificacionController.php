<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Modelos\TipoIdentificacion;

class TipoIdentificacionController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    public  function  ObtenerTipoIdentificacion()
    {
        try {
            $tipoIdentificacion = TipoIdentificacion::where('activo', true)->get();
        }catch (Exception $e)
        {
            return response()->json(['mensaje' => $e->getMessage()]);
        }
        return $tipoIdentificacion;
    }

}
