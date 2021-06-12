<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use \App\Modelos\Profesor;
use \App\Modelos\Rol;
class ProfesorController extends Controller
{
    public function index ()
    {
        if(Auth::check())
        {
            return view('General.Profesor.index');
        }
    }

    public function all()
    {
        try
        {
            if(Auth::check())
            {
                $profesor = Profesor::all();
            }
        }catch(Exception $e)
        {
            return response()->json(['mensaje' => $e->getMessage()]);
        }
        return $profesor;
    }

    public function getRolProfesor()
    {
        try
        {
            if(Auth::check())
            {
                $rol = Rol::where('activo', true)
                    ->where("nombre", "=", "Profesor")
                    ->get();
            }
        }catch(Exception $e)
        {
            return response()->json(['mensaje' => $e->getMessage()]);
        }
        return $rol;
    }

    public function update(int $id, Request $request)
    {
        try{
            if(Auth::check())
            {
                if($id != null)
                {
                    $profesor = Profesor::find($id);
                    if($profesor != null)
                    {
                        $profesor->cedula = $request->cedula != null ? $request->cedula : $profesor->cedula;
                        $profesor->nombre = $request->nombre != null ? $request->nombre : $profesor->nombre;
                        $profesor->apellidos = $request->apellidos != null ? $request->apellidos : $profesor->apellidos;
                        $profesor->id_rol = $request->id_rol != null ? $request->id_rol : $profesor->id_rol;
                        $profesor->correo = $request->correo != null ? $request->correo : $profesor->correo;
                        $profesor->activo = $request->activo != true ? false : true;
                        $profesor->updated_by = Auth::user()->name;
                        if($profesor->save())
                        {
                            return response()->json(["mensaje"=>"Se actualizó correctamente."]);
                        }
                    }
                }
            }
        }catch(Exception $e)
        {
            return response()->json(['mensaje' => $e->getMessage()]);
        }
    }

    public function insert(Request $request)
    {
        try
        {
            if(Auth::check()){
                if($request != null)
                {
                    $profesor = new Profesor();
                    $profesor->cedula = $request->cedula;
                    $profesor->nombre = $request->nombre;
                    $profesor->apellidos = $request->apellidos;
                    $profesor->id_rol = $request->id_rol;
                    $profesor->correo = $request->correo;
                    $profesor->activo = true;
                    $profesor->created_by = Auth::user()->name;
                    $profesor->updated_by = Auth::user()->name;
                    $profesor->id_user = 3;//TODO: Se debe crear el usuario
                    if($profesor->save())
                    {
                        return response()->json(["mensaje"=>"Se guardó correctamente."]);
                    }
                }
            }
        }catch(Exception $e)
        {

        }
    }
}
