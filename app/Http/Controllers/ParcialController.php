<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Modelos\Parcial;
use Exception;

class ParcialController extends Controller
{
    public function index()
    {
        return view('General.Parciales.index');
    }

    public function all()
    {
        try {
            if(Auth::check())
            {
                $parciales = Parcial::all();
            }
        } catch (Exception $e) {
            return response()->json(['mensaje' => $e.getMessage()]);
        }
        return $parciales;
    }

    public function insert(Request $request)
    {
        try {
            if(Auth::check()){
                if($request != null)
                {
                    $parcial = new Parcial;
                    $parcial->catalogo_id = $request->catalogo_id;
                    $parcial->nombre = $request->nombre;
                    $parcial->descripcion = $request->descripcion;
                    $parcial->activo = true;
                    $parcial->created_by = Auth::user()->name;
                    $parcial->update_by = Auth::user()->name;
                    if($parcial->save()){
                        return response()->json(['mensaje' => 'El registro se guardo correctamente.']);
                    }
                }
            }
        } catch (Exception $e) {
            return response()->json(['mensaje' => $e->getMessage()]);
        }
    }

    public function update(Request $request, int $id)
    {
        try {
            if(Auth::check())
            {
                if($request != null && $id > 0)
                {
                    $parcial = Parcial::find($id);
                    if($parcial != null)
                    {
                        $parcial->catalogo_id = $request->catalogo_id != null ? $request->catalogo_id : $parcial->catalogo_id;
                        $parcial->nombre = $request->nombre != null ? $request->nombre : $parcial->nombre;
                        $parcial->descripcion = $request->descripcion != null ? $request->descripcion : $parcial->descripcion;
                        $parcial->activo = true;

                        $parcial->update_by = Auth::user()->name;
                        if($parcial->save()){
                            return response()->json(["mensaje"=>"Se actualizó correctamente."]);
                        }
                    }
                }
            }
        } catch (Exception $e) {
            return response()->json(['mensaje' => $e->getMessage()]);
        }
    }

    public function parciales()
    {
        try {
            if(Auth::check())
            {
                $parciales = DB::table('parcial')
                ->join('catalogo', 'parcial.catalogo_id', '=', 'catalogo.id')
                //->where('parcial.activo', true)
                ->select('parcial.id', 'parcial.nombre', 'catalogo.descripcion')
                ->get();

            }
        } catch (Exception $e) {
            return response()->json(['mensaje' => $e->getMessage()]);
        }
        return $parciales;

    }

    public function remove(int $id)
    {
        try
        {
            if(Auth::check())
            {
                if($id > 0)
                {
                    $parcial = Parcial::find($id);
                    if($parcial != null)
                    {
                        $parcial->activo = false;
                        if($parcial->save())
                        {
                            return response()->json(['mensaje'=> 'Se eliminó correctamente']);
                        }
                    }
                }
            }
        } catch(Exception $e)
        {
            return response()->json(['mensaje' => $e->getMessage()]);
        }
    }
}
