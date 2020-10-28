<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Modelos\Escuela;
use  \App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
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

    //insertar
    public function insertar(Request $request)
    {
        try
        {
            if(Auth::check())//valida si esta login
            {
                if($request != null)
                {
                    $escuela = new Escuela;
                    $escuela->nombre = $request->nombre;
                    $escuela->descripcion = $request->descripcion;
                    $escuela->activo = $request->activo;
                    $escuela->created_by = Auth::user()->name;
                    $escuela->update_by = Auth::user()->name;
                    if($escuela->save()){
                        return response()->json(['mensaje'=> 'Se guardo correctamente']);
                    }

                }
            }
        }catch(Exception $e)
        {
            return response()->json(["mensaje" => $e->getMessage()]);
        }
    }

    public function administrador($id)
    {
        //dd($id);
        // try {
        //     if($id > 0){
        //         $personal = DB::table('personal')
        //                     ->join("rol", "personal.id_rol", "=", "rol.id")
        //                     ->where("rol.id", 2)
        //                     ->get();
        //     }
        // } catch (Exception $e) {
        //     return response()->json(["mensaje" => $e->getMessage()]);
        // }
        if($id > 0)
            return view('General.Escuela.administradores')->with(['id'=> $id]);
    }
     public function administradores($id)
     {
         $personal = null;
         try {
             if($id > 0)
             {
                $personal = DB::table('personal')
                            ->join('users', 'personal.id_user', '=', 'users.id')
                            ->join('rol', 'users.rol_id', '=', 'rol_id')
                            ->where('users.escuela_id', $id)
                            ->select('personal.cedula')
                            ->get();
                            dd($personal);
             }
         } catch (Exception $e) {
            return response()->json(["mensaje" => $e->getMessage()]);
         }
         return $personal;
     }
}
