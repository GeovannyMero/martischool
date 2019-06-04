<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Modelos\Escuela;
use  \App\Http\Controllers\Controller;

class EscuelaController extends Controller
{
    public function index(){
        try{

                return view('General.Escuela.index');

        }catch(Exception $e){

        }
    }

    public function all(){
        $escuela;
            try{
                $escuela = Escuela::where('activo', true)->get();
            }catch(Exception $e){
                return response()->json(['mensaje' => $e->getMessage()]);
            }
         return $escuela;
    }

    public function update(Request $request, $id)
    {
        try{
           // if(Auth::check()){
                if($id != 0)
                {
                    $escuela = Escuela::find($id);
                    if($escuela != null){
                        $escuela->nombre = $request->nombre == null ? $escuela->nombre : $request->nombre;
                        if($escuela->save()){
                            return response()->json(["mensaje"=>"Se actualizó correctamente."]);
                        }
                    }
                }
         //   }
        }catch(Exception $e){
            return response()->json(["mensaje" => $e->getMessage()]);
        }
    }

    public function delete($id){
        try
        {
            if($id !== 0){
                $escuela = Escuela::find($id);
                $escuela->activo = false;
                if($escuela->save()){
                    return response()->json(["mensaje"=>"Se desactivo la escuela correctamente."]);
                }
            }
        }catch(Exception $e)
        {
            return response()->json(["mensaje" => $e->getMessage()]);
        }
    }
}
