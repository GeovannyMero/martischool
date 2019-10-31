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

    public function update(Request $request, int $id)
    {
        try {
            if($id > 0 && $request != null){
                $parametros = Parametros::find($id);
                if($parametros != null)
                {
                    $parametros->nombre = $request->nombre != null ? $request->nombre : $parametros->nombre;
                    $parametros->codigo = $request->codigo != null ? $request->codigo : $parametros->codigo;
                    $parametros->descripcion = $request->descripcion != null ? $request->descripcion : $parametros->descripcion;
                    $parametros->activo = $request->activo = false ? false : true;
                    $parametros->updated_by = Auth::user()->name;
                    if($parametros->save())
                    {
                        return response()->json(['mensaje' => 'El registro se actualizo con exito.']);
                    }
                }
            }
        } catch (Exception $e) {
            return response()->json(['mensaje' => $e->getMessage()]);
        }
    }

    public function remove(int $id){
        try {
            if(Auth::check())
            {
                if($id > 0){
                    $parametros = Parametros::find($id);
                    if($parametros != null)
                    {
                        $parametros->activo = false;
                        if($parametros->save())
                        {
                            return response()->json(['mensaje' => 'El registro se elimino con exito.']);
                        }
                    }
                }
            }
        } catch (Exception $e) {
            return response()->json(['mensaje' => $e->getMessage()]);
        }
    }

    public function quintiles()
    {
        try {
            $quintiles = Parametros::where('nombre', 'Quintil')->get();
        } catch (Exception $e) {
            return response()->json(['mensaje' => $e.getMessage()]);
        }
        return $quintiles;
    }

}
