<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use \App\Modelos\Paralelos;
use PHPUnit\Framework\Exception;

class ParaleloController extends Controller
{
    public function index()
    {
        return view('General.Paralelo.Index');
    }
    public function all()
    {

        try {
            if (Auth::check()) {
                $paralelos = Paralelos::all();
            }
        } catch (Exception $e) {
            return response()->json(['mensaje' => $e->getMessage()]);
        }
        return $paralelos;
    }

    public function update(Request $request, int $id)
    {
        try {
            if(Auth::check())
            {
                if($id != 0)
                {
                    $paralelo = Paralelos::find($id);
                    if($paralelo != null)
                    {
                        $paralelo->nombre = $request->nombre != null ? $request->nombre : $paralelo->nombre;
                        $paralelo->activo = $request->activo == false ? false : true;
                        $paralelo->updated_by = Auth::user()->name;
                        if($paralelo->save())
                        {
                            return response()->json(["mensaje"=>"Se actualizó correctamente."]);
                        }
                    }
                }
            }
        } catch (Exception $e) {
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
                    $paralelo = new Paralelos();
                    $paralelo->nombre = $request->nombre;
                    $paralelo->activo = true;
                    $paralelo->created_by = Auth::user()->name;
                    $paralelo->updated_by = Auth::user()->name;
                    if($paralelo->save())
                    {
                        return response()->json(["mensaje"=>"Se guardó correctamente."]);
                    }
                }
            }
        }catch(Exception $e)
        {
            return response()->json(['mensaje' => $e->getMessage()]);
        }
    }
}
