<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use PHPUnit\Framework\Exception;
use Illuminate\Support\Facades\Auth;
use \App\Modelos\Personal;

class PersonalController extends Controller
{
    public function index()
    {
        try {
            if (Auth::check()) {
                return view('General.Personal.index');
            }
        } catch (Exception $e) {
            return response()->json(['mensaje' => $e->getMessage()]);
        }
    }

    public function all()
    {
        try {
            if(Auth::check())
            {
                $personal = Personal::all();
            }
        } catch (Exception $e) {
            return response()->json(['mensaje' => $e->getMessage()]);
        }
        return $personal;
    }

    public function update(Request $request, int $id)
    {
        try
        {
            if(Auth::check())
            {
                if($id != 0)
                {
                    $personal = Personal::find($id);
                    if($personal != null)
                    {
                        $personal->cedula = $request->cedula != null ? $request->cedula : $personal->cedula;
                        $personal->primerNombre = $request->primerNombre != null ? $request->primerNombre : $personal->primerNombre;
                        $personal->segundoNombre = $request->segundoNombre != null ? $request->segundoNombre : $personal->segundoNombre;
                        $personal->primerApellido = $request->primerApellido != null ? $request->primerApellido : $personal->primerApellido;
                        $personal->segundoApellido = $request->segundoApellido != null ? $request->segundoApellido : $personal->segundoApellido;
                        $personal->fechaNacimiento = $request->fechaNacimiento != null ? $request->fechaNacimiento : $personal->fechaNacimiento;
                        $personal->Genero = $request->Genero != null ? $request->Genero : $personal->Genero;
                        $personal->activo = $request->activo != true ? false : true;
                        $personal->direccion = $request->direccion != null ? $request->direccion : $personal->direccion;
                        $personal->correo = $request->correo != null ? $request->correo : $personal->correo;
                        $personal->telefono = $request->telefono != null ? $request->telefono : $personal->telefono;
                        $personal->accesoSistema = $request->accesoSistema ? $request->accesoSistema : $personal->accesoSistema;
                        $personal->id_rol = $request->id_rol != null ? $request->id_rol : $personal->id_rol;
                        $personal->update_by = Auth::user()->name;
                        if($personal->save())
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
            if(Auth::check())
            {
                if($request != null)
                {
                    $personal = new Personal;
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
                    if($personal->save())
                    {
                        return response()->json(["mensaje"=>"Se actualizó correctamente."]);
                    }
                }
            }
        }catch(Exception $e)
        {
            return response()->json(['mensaje' => $e->getMessage()]);
        }
    }

    public function remove(int $id)
    {
        try
        {
            if(Auth::check())
            {
                if($id != 0)
                {
                    $personal = Personal::find($id);
                    if($personal != null)
                    {
                        $personal->activo = false;
                        if($personal->save())
                        {
                            return response()->json(["mensaje"=>"Se eliminó correctamente."]);
                        }
                    }
                }
            }
        }catch(Exception $e)
        {
            return response()->json(['mensaje' => $e->getMessage()]);
        }
    }


}
