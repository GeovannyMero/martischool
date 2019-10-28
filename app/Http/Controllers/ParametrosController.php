<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Modelos\Parametros;

class ParametrosController extends Controller
{
    public function index(){
        return view ('General.Parametros.index');
    }

    public function all(){
        try {
            if(Auth::check()){
                $parametros = Parametros::all();
            }
        } catch (Exception $e) {
            return response()->json(['mensaje' => $e->getMessage()]);
        }
        return $parametros;
    }

    public function insert(Request $request){
        try {
            if(Auth::check()){
                if($request != null){
                    $parametros = new Parametros;
                    $parametros->nombre = $request->nombre;
                    $parametros->codigo = $request->codigo;
                    $parametros->descripcion = $request->descripcion;
                    $parametros->activo = true;
                    $parametros->created_by = Auth::user()->name;
                    $parametros->updated_by = Auth::user()->name;
                    if($parametros->save()){
                        return response()->json(['mensaje' => 'Se guardo correctamente.']);
                    }
                }
            }
        } catch (Exception $e) {
            return response()->json(['mensaje' => $e.getMessage()]);
        }
    }

}
