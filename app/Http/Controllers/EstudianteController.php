<?php

namespace App\Http\Controllers;

use \App\Modelos\Estudiantes;
use Illuminate\Http\Request;
use  \App\Http\Controllers\Controller;


class EstudianteController extends Controller
{
    public function index(){
        return view ('General.Estudiante.estudiante');
    }

    public function all(){
        try{
            $estudiantes = Estudiantes::all();
        }catch(Exception $e){
            return response()->json(["mensaje" => $e->getMessage()]);
        }
        return $estudiantes;
    }

//GUARDAR
    public function saveEstudiante(Request $request){
        try{
            
            if($request->id == ""){
               // dd($request);
              // var_dump($request);
                $estudiante = new Estudiantes;
               // return response()->json(["mensaje"=>"OK"]);
                $estudiante->identificacion = $request->identificacion;
                $estudiante->tipoidentificacion = $request->tipoidentificacion;
                $estudiante->primernombre = $request->primernombre;
                $estudiante->segundonombre = $request->segundonombre;
                $estudiante->apellidopaterno = $request->apellidopaterno;
                $estudiante->apellidomaterno = $request->apellidomaterno;
                $estudiante->fechanacimiento = $request->fechanacimiento;
                $estudiante->genero = $request->genero;
                
                if($estudiante->save()){
                    return response()->json(["mensaje"=> "Se guardo correctamente"]);
                }
            }
                        
        }catch(Exception $e){
            return response()->json(["mensaje"=>$e->getMessage()]);
        }
    }
///estudiante/update/
    public function update(Request $request, $id){
        try{
            if($id != 0){
                $estudiante = Estudiantes::find($id);
                if($estudiante != null){
                    $estudiante->identificacion = ($request->identificacion) == null ? $estudiante->identificacion : $request->identificacion;
                    if($estudiante->save()){
                        return response()->json(["mensaje"=>"Se actualizó correctamente."]);
                    }
                }
                
            }
        }catch(Exception $e){
            return response()->json(["mensaje"=>$e->getMessage()]);
        }
    }
}
