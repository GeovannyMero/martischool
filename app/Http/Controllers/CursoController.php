<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Modelos\Curso;
use \App\Modelos\NivelEducativo;
use Illuminate\Support\Facades\Auth;

class CursoController extends Controller
{
    public function index()
    {
        return view('General.Curso.Index');
    }

    public function all()
    {

        try
        {
            if(Auth::check())
            {
                $curso = Curso::all();
            }
        }catch(Exception $e)
        {
            return response()->json(['mensaje' => $e->getMessage()]);
        }
        return $curso;
    }

    public function niveles()
    {
        try
        {
            if(Auth::check())
            {
                return NivelEducativo::all();
            }
        }catch(Exception $ex)
        {
            return response()->json(['mensaje' => $ex->getMessage()]);
        }

    }

    public function update(Request $request, int $id)
    {
        try
        {
            if(Auth::check())
            {
                if($id != 0)
                {
                    $curso = Curso::find($id);
                    if($curso != null)
                    {
                        $curso->nombre = $request->nombre != null ? $request->nombre : $curso->nombre;
                        $curso->curso_letra = $request->curso_letra != null ? $request->curso_letra : $curso->curso_letra;
                        $curso->curso_numero = $request->curso_numero != null ? $request->curso_numero : $curso->curso_numero;
                        $curso->curso_siguiente = $request->curso_siguiente != null ? $request->curso_siguiente : $curso->curso_siguiente;
                        $curso->id_nivel = $request->id_nivel != null ? $request->id_nivel : $curso->id_nivel;
                        $curso->activo = $request->activo == false ? false : true;
                        $curso->updated_by = Auth::user()->name;
                        if($curso->save())
                        {
                            return response()->json(["mensaje"=>"Se actualizó correctamente."]);
                        }
                    }
                }
            }
        }catch(Exception $ex)
        {
            return response()->json(['mensaje' => $ex->getMessage()]);
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
                    $curso = new Curso;
                    $curso->nombre = $request->nombre;
                    $curso->curso_letra = $request->curso_letra;
                    $curso->curso_numero = $request->curso_numero;
                    $curso->curso_siguiente = $request->curso_siguiente;
                    $curso->id_nivel = $request->id_nivel;
                    $curso->activo = true;
                    $curso->created_by = Auth::user()->name;
                    $curso->updated_by = Auth::user()->name;
                    if($curso->save())
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
