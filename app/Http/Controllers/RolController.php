<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use \App\Modelos\Rol;
use \App\Modelos\Permiso;
class RolController extends Controller
{
    public function index()
    {
        return view('General.Rol.Index');

    }

    public function all()
    {
        $roles;
        try
        {
            if(Auth::check())
            {
               $roles = Rol::where('activo', true)->get();
            //    $roles = Rol::find(1);
            //    dd($roles->permiso->get());
            }
        }catch(Exception $e)
        {
            return response()->json(['mensaje' => $e->getMessage()]);
        }
        return $roles;
    }

    public function update(Request $request, $id)
    {
        try
        {
            if(Auth::check())
            {
                if($id !== 0)
                {
                    $rol = Rol::find($id);
                    if($rol != null)
                    {
                        $rol->nombre = $request->nombre != null ? $request->nombre : $rol->nombre;
                        $rol->descripcion = $request->descripcion != null ? $request->descripcion : $rol->descripcion;
                        $rol->activo = $request->activo == false ? false : true;
                        $rol->updated_by = Auth::user()->name;

                        if($rol->save()){
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
    //Eliminar
    public function delete($id)
    {
        try
        {
            if(Auth::check())
            {
                if($id != 0)
                {
                    $rol = Rol::find($id);
                    $rol->activo = false;
                    if($rol->save())
                    {
                        return response()->json(["mensaje"=>"Se eliminó correctamente."]);
                    }
                }
            }
        }catch(Exception $e)
        {
            return response()->json(['mensaje' => $e->getMessage()]);
        }

    }
    //insertar
    public function insert(Request $request)
    {
        try
        {
            if(Auth::check())
            {
                if($request != null)
                {
                    $rol = new Rol;
                    $rol->nombre = $request->nombre;
                    $rol->descripcion = $request->descripcion != null ? $request->descripcion : "";
                    $rol->activo = true;
                    $rol->created_by = Auth::user()->name;
                    $rol->updated_by = Auth::user()->name;
                    if($rol->save())
                    {
                        return response()->json(['mensaje'=> 'Se guardo correctamente']);
                    }

                }
            }
        }catch(Exception $e)
        {
            return response()->json(['mensaje' => $e->getMessage()]);
        }
    }
}
