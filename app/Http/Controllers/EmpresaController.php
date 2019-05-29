<?php

namespace App\Http\Controllers;

use \App\Modelos\Empresa;
use Illuminate\Http\Request;
use  \App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class EmpresaController extends Controller
{
    public function index(){
        return view ('General.Empresa.index');
    }

    public function all(){
        try{
            if(Auth::check()){
                $empresa = Empresa::where('estado', true)->get();
            }
        }catch(Exception $e){
            return response()->json(["mensaje" => $e->getMessage()]);
        }
        return $empresa;
    }

    public function update(Request $request, $id){
        try{
            if(Auth::check()){
             if($id != 0){
                $empresa = Empresa::find($id);
                
                if($empresa != null){
                    $empresa->nombre = ($request->nombre) != null ? $request->nombre : $empresa->nombre;
                    $empresa->ruc = ($request->ruc) != null ? $request->ruc : $empresa->ruc;
                    $empresa->telefono = $request->telefono != null ? $request->telefono : $empresa->telefono;
                    $empresa->direccion = $request->direccion != null ? $request->direccion : $empresa->direccion;
                    $empresa->correo = $request->correo != null ? $request->correo : $empresa->correo;
                    $empresa->update_by = Auth::user()->name;
                    $empresa->estado = ($request->estado) == false ? false : true;
                    //dd($empresa->estado);
                    if($empresa->save()){
                        return response()->json(["mensaje"=>"Se actualizó correctamente."]);
                    }
                }
                }
            }
        }catch(Exception $e){
            return response()->json(["mensaje" => $e->getMessage()]);
        }
    }

    //Insert
    public function insert(Request $request){
        try{
            if($request->id == ""){
                $empresa = new Empresa;
                $empresa->id = 2;
                $empresa->nombre = $request->nombre;
                $empresa->ruc = $request->ruc;
                $empresa->telefono = $request->telefono;
                $empresa->correo = $request->correo;
                $empresa->created_by = Auth::user()->name;
                $empresa->update_by = Auth::user()->name;
                $empresa->estado = $request->estado;
                $empresa->direccion = $request->direccion;
                if($empresa->save()){
                    return response()->json(['mensaje'=> 'Se guardo correctamente']);
                }


            }

        }catch(Exception $e){
            return response()->json(['mensaje' => $e->getMessage()]);
        }
    }

    //Eliminar o inactivar
    public function delete($id){
        try{
            if($id != "" && $id != 0){
                $empresa = Empresa::find($id);
                $empresa->estado = false;
                if($empresa->save()){
                    return response()->json(['mensaje' => 'Se eliminó correctamente la empresa']);
                }
            }
        }catch(Exception $e){
            return response()->json(['mensaje' => $e->getMessage()]);
        }
    }
    }