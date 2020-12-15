<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Modelos\Escuela;
use \App\Modelos\Personal;
use \App\User;
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

    public function all()
    {
        $escuela = null;
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
                            ->join('rol', 'users.rol_id', '=', 'rol.id')
                            ->where('personal.id_escuela', $id)
                            ->where('users.rol_id' , '=', '1')
                            ->select('personal.id as id', 'personal.cedula as cedula', 'personal.primerNombre as primerNombre', 'personal.segundoNombre as segundoNombre', 'personal.primerApellido as primerApellido', 'personal.segundoApellido as segundoApellido', 'personal.activo as activo', 'personal.id_rol as id_rol', 'rol.nombre as nombreRol', 'personal.id_user as id_user, users.name as nombreUsuario', 'personal.correo as correo', 'personal.id_escuela as escuela_id')
                            ->get();
                            //dd($personal);
             }
         } catch (Exception $e)
         {
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

     public function guardarAdministradores(int $idEscuela, Request $request)
     {
        //dd($request);
        try {
            $existeAdmin = $this->ExisteAdministrator($request->cedula);
            if(!$existeAdmin)
            {
                DB::beginTransaction();
                $usuario = new User;
                $usuario->name = substr($request->primerNombre, 0, 1) . $request->primerApellido;
                //$usuario->name = "gmero";
                $usuario->email = $request->correo;
                $usuario->password = bcrypt($request->cedula);
                $usuario->activo = "true";
                //$usuario->escuela_id = $idEscuela;
                $usuario->rol_id = 1;
                $usuario->created_by = Auth::user()->name;
                //$usuario->created_by = "default";
                //$usuario->update_by = "defau";
                $usuario->update_by = Auth::user()->name;
                if($usuario->save()){
                    DB::commit();
                    $personal = new Personal;
                    $personal->cedula = $request->cedula;
                    $personal->primerNombre = $request->primerNombre;
                    $personal->segundoNombre = $request->segundoNombre;
                    $personal->primerApellido = $request->primerApellido;
                    $personal->segundoApellido = $request->segundoApellido;
                    $personal->fechaNacimiento = "19/11/1993";
                    $personal->Genero = "M";
                    $personal->activo = "true";
                    $personal->direccion = "fragata";
                    $personal->correo = $request->correo;
                    $personal->telefono = "0967869571";
                    $personal->accesoSistema = 1;
                    $personal->id_rol = 1;
                    $personal->id_escuela = $idEscuela;
                    $personal->id_user = $usuario->id;
                    $personal->created_by = Auth::user()->name;
                    $personal->update_by = Auth::user()->name;
                    //$personal->created_by = "default";
                    //$personal->update_by = "default";
                    if($personal->save()){
                        DB::commit();
                        //return true;
                        return response()->json(['mensaje'=> 'Se guardo correctamente']);
                    }

                }


            }else
            {
                return response()->json(['mensaje'=> 'Ya Existe usuario']);
            }

        } catch (Exception $e) {
            DB::rollBack();
            //return false;
            return response()->json(["mensaje" => $e->getMessage()]);
        }
     }

     public function actualizar(int $id, Request $request)
     {
        try {
            if(Auth::check())
            {
                if($id != 0)
                {
                    DB::beginTransaction();
                    $personal = Personal::find($id);
                    if($personal != null)
                    {
                        $personal->cedula = $request->cedula != null ? $request->cedula : $personal->cedula;
                        $personal->primerNombre = $request->primerNombre != null ? $request->primerNombre : $personal->primerNombre;
                        $personal->segundoNombre = $request->segundoNombre != null ? $request->segundoNombre : $personal->segundoNombre;
                        $personal->primerApellido = $request->primerApellido != null ? $request->primerApellido : $personal->primerApellido;
                        $personal->segundoApellido = $request->segundoApellido != null ? $request->segundoApellido : $personal->segundoApellido;
                        $personal->correo = $request->correo != null ? $request->correo : $personal->correo;
                        $personal->activo = $request->activo != null ? $request->activo : $personal->activo;
                        if($personal->save())
                        {
                            DB::commit();
                            return response()->json(['mensaje'=> 'Se actualizó correctamente']);
                        }
                    }
                }
            }
        } catch (Exception $e) {
            DB::rollback();
            return response()->json(["mensaje" => $e->getMessage()]);
        }
     }

     public function eliminar(int $id)
     {
        try {
            if(Auth::check())
            {
                if($id > 0)
                {
                    $personal = Personal::find($id);
                    if($personal != null)
                    {
                        $personal->activo = false;
                        if($personal->save())
                        {
                            return response()->json(["mensaje" => "Se eliminó correctamente."]);
                        }
                    }
                }
            }
        } catch (Exception $e) {
            return response()->json(['mensaje' => $e->getMessage()]);
        }
     }
}
