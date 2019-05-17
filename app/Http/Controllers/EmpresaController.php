<?php

namespace App\Http\Controllers;

use \App\Modelos\Empresa;
use Illuminate\Http\Request;
use  \App\Http\Controllers\Controller;

class EmpresaController extends Controller
{
    public function index(){
        return view ('General.Empresa.index');
    }

    public function all(){
        //try{
            $empresa = Empresa::all();
        //}catch(Exception $e){
          //  return response()->json(["mensaje" => $e->getMessage()]);
        //}
        return $empresa;
    }

    public function update(Request $request, $id){
        try{
            if($id != 0){
                $empresa = Empresa::find($id);
                if($empresa != null){
                    $empresa->nombre = ($request->nombre) != null ? $request->nombre : $empresa->nombre;
                    $empresa->estado = ($request->estado) != null ? $request->estado : $empresa->estado;
                    if($empresa->save()){
                        return response()->json(["mensaje"=>"Se actualizó correctamente."]);
                    }
                }
            }
        }catch(Exception $e){
            return response()->json(["mensaje" => $e->getMessage()]);
        }
    }
    }