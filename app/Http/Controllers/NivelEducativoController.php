<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Modelos\NivelEducativo;
use Illuminate\Support\Facades\Auth;
class NivelEducativoController extends Controller
{
    public function index(){
        return view('General.NivelEducativo.index');
    }

    public function all()
    {

        try
        {
            if(Auth::check())
            {
                $nivel_educativo = NivelEducativo::all();
            }
        }catch(Exception $e)
        {
            return response()->json(['mensaje' => $e->getMessage()]);
        }
        return $nivel_educativo;
    }

    public function update(Request $request, $id)
    {
        try
        {
            if(Auth::check())
            {
                if($id != 0)
                {
                    $nivel_educativo = NivelEducativo::find($id);
                    if($nivel_educativo != null)
                    {
                        $nivel_educativo->nombre = $request->nombre != null ? $request->nombre : $nivel_educativo->nombre;
                        $nivel_educativo->descripcion = $request->descripcion != null ? $request->descripcion : $nivel_educativo->descripcion;
                        $nivel_educativo->activo = $request->activo != null ? $request->activo : $nivel_educativo->activo;
                        $nivel_educativo->updated_by = Auth::user()->name;
                        if($nivel_educativo->save())
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
                    $nivel_educativo = new NivelEducativo;
                    $nivel_educativo->nombre = $request->nombre;
                    $nivel_educativo->descripcion = $request->descripcion;
                    $nivel_educativo->activo = true;
                    $nivel_educativo->created_by = Auth::user()->name;
                    $nivel_educativo->updated_by = Auth::user()->name;
                    if($nivel_educativo->save())
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

    public function remove(int $id)
    {
        try
        {
            if(Auth::check())
            {
                if($id !== 0)
                {
                    $nivel_educativo = NivelEducativo::find($id);
                    if($nivel_educativo != null)
                    {
                        $nivel_educativo->activo = false;
                        if($nivel_educativo->save())
                        {
                            return response()->json(["mensaje"=>"Se eliminó correctamente."]);
                        }
                    }
                }
            }

        }catch(Exception $e){
            return response()->json(['mensaje' => $e->getMessage()]);
        }

    }


}
