<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Modelos\TipoFamiliar;

class TipoFamiliarController extends Controller
{
    public function __construct(){
        $this->middleware('auth');
    }
    public function ObtenerTipoFamiliar()
    {
        try
        {
            $tipoFamiliar = TipoFamiliar::where('activo', true)->get();

        }catch (Exception $e)
        {
            return response()->json(['mensaje' => $e->getMessage()]);
        }
        return  $tipoFamiliar;
    }
}
