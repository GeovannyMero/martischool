<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Modelos\Escuela;
use \App\Modelos\Personal;
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
                            ->select('personal.id as id', 'personal.cedula as cedula', 'personal.primerNombre as primerNombre', 'personal.segundoNombre as segundoNombre', 'personal.primerApellido as primerApellido', 'personal.segundoApellido as segundoApellido', 'personal.activo as activo', 'personal.id_rol as id_rol', 'rol.nombre as nombreRol', 'personal.id_user as id_user, users.name as nombreUsuario', 'personal.correo as correo', 'users.escuela_id as escuela_id')
                            ->get();
                            //dd($personal);
             }
         } catch (Exception $e) {
            return response()->json(["mensaje" => $e->getMessage()]);
         }
         return $personal;

     }

     public function ExisteAdministrator($cedula)
     {
        try {
            if(strlen($cedula) >= 9)
            {
                $existAdmin = DB::table('personal')->where('cedula', $cedula)->exists();
                return $existAdmin;
            }
        } catch (Exception $e) {
            return false;
        }
     }

     public function guardarAdministradores()
     {
         $cedula = "0931254569";
        try {
            $existeAdmin = $this->ExisteAdministrator($cedula);
            if(!$existeAdmin)
            {
                if (Auth::check())
                {
                    DB::beginTransaction();
                    $personal = new Personal;
                    $usuario = new User;
                    $personal->cedula = $request->cedula;
                    $personal->primerNombre = $request->primerNombre;
                    $personal->segundoNombre = $request->segundoNombre;
                    $personal->primerApellido = $request->primerApellido;
                    $personal->segundoApellido = $request->segundoApellido;
                    $personal->fechaNacimiento = $request->fechaNacimiento;
                    $personal->Genero = $request->Genero;
                    $personal->activo = true;
                    $personal->direccion = $request->direccion;
                    $personal->correo = $request->correo;
                    $personal->telefono = $request->telefono;
                    $personal->accesoSistema = $request->accesoSistema;
                    $personal->id_rol = $request->id_rol;
                    $personal->created_by = Auth::user()->name;
                    $personal->update_by = Auth::user()->name;
                    if($personal->save()){
                        return true;
                    }
                }
            }else
            {
                return true;
            }
            return $existeAdmin;
        } catch (Exception $e) {
            //throw $th;
        }
     }
}
