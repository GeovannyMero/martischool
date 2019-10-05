<?php

namespace App\Http\Controllers;

use \App\Modelos\Estudiantes;
use Illuminate\Http\Request;
use  \App\Http\Controllers\Controller;
use App\Modelos\Representante;
use Illuminate\Support\Facades\DB;

class EstudianteController extends Controller
{
    public function index(){
        return view ('General.Estudiante.estudiante');
    }

    public function all(){
        try{
            $estudiantes = Estudiantes::with(['representantes'])->get();
            //$estudiantes = Estudiantes::find(3)->representantes()->get();

            //$estudiantes->with(['representante'])->get();
            // $estudiantes = DB::table('estudiante')
            // ->join('estudiantes_representante', 'estudiante.id', '=', 'estudiantes_representante.estudiantes_id')
            // ->join('representante', 'representante.id', '=', 'estudiantes_representante.representante_id')
            // //->select('estudiante.*')
            // ->get();
            //echo($estudiantes);
        }catch(Exception $e){
            return response()->json(["mensaje" => $e->getMessage()]);
        }
        return $estudiantes->toArray();
    }

//GUARDAR
    public function saveEstudiante(Request $request){
        try{

            if($request->id == ""){
               // dd($request);
              // var_dump($request);
                $estudiante = new Estudiantes;
               // return response()->json(["mensaje"=>"OK"]);
                $estudiante->codigo = $request->codigo;
                $estudiante->cedula = $request->cedula;
                //$estudiante->tipoidentificacion = $request->tipoidentificacion;
                $estudiante->primerNombre = $request->primerNombre;
                $estudiante->segundoNombre = $request->segundoNombre;
                $estudiante->primerApellido = $request->primerApellido;
                $estudiante->segundoApellido = $request->segundoApellido;
                $estudiante->fechaNacimiento = $request->fechaNacimiento;
                $estudiante->lugarNacimiento = $request->lugarNacimiento;
                $estudiante->nacionalidad = $request->nacionalidad;
                $estudiante->direccion = $request->direccion;
                $estudiante->telefono = $request->telefono;
                $estudiante->genero = $request->genero;
                $estudiante->activo = true;
                $estudiante->codigoMatricula = $request->codigoMatricula;
                $estudiante->fechaMatricula = $request->fechaMatricula;
                $estudiante->idCurso = $request->idCurso;
                $estudiante->idParalelo = $request->idParalelo;
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
                    $estudiante->cedula = ($request->cedula) == null ? $estudiante->cedula : $request->cedula;
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
