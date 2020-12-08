<?php

namespace App\Http\Controllers;

use \App\Modelos\Estudiantes;
use Illuminate\Http\Request;
use  \App\Http\Controllers\Controller;
use App\Modelos\Representante;
use App\Modelos\AlumnoRepresentante;
use Illuminate\Support\Facades\DB;
use Response;
use View;
use Exception;
use Barryvdh\DomPDF\Facade as PDF;
use App;
use Illuminate\Support\Facades\Auth;
use App\Modelos\EstudiantesRepresentante;
use \App\Modelos\Personal;
class EstudianteController extends Controller
{
    public function index()
    {
        return view('General.Estudiante.estudiante');
    }

    public function all()
    {
        try {
            $estudiantes = Estudiantes::with(['representantes'])->get();
            //$estudiantes = Estudiantes::find(3)->representantes()->get();

            //$estudiantes->with(['representante'])->get();
            // $estudiantes = DB::table('estudiante')
            // ->join('estudiantes_representante', 'estudiante.id', '=', 'estudiantes_representante.estudiantes_id')
            // ->join('representante', 'representante.id', '=', 'estudiantes_representante.representante_id')
            // //->select('estudiante.*')
            // ->get();
            //echo($estudiantes);
        } catch (Exception $e) {
            return response()->json(["mensaje" => $e->getMessage()]);
        }
        return $estudiantes->toArray();
    }

    public function secuencialCodigoEstudiante(){
        $secuencial = "";
        try
        {
            $secuencial = DB::table('estudiante')->count('id');
        }
        catch(Exception $e)
        {
            return response()->json(["mensaje" => $e->getMessage()]);
        }
        return $secuencial + 1;
    }
    //GUARDAR
    public function saveEstudiante(Request $request)
    {
       //dd($request->id);
        try {
            $personalUsuario = Personal::where("id_user", Auth::user()->id)->first();
            if ($request->id == null || $request->id == 0)
            {
                $estudiante = new Estudiantes;
                $estudiante->codigo = str_pad(self::secuencialCodigoEstudiante(), 4, "0", STR_PAD_LEFT);
                $estudiante->cedula = $request->cedula;
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
                $estudiante->id_escuela = $personalUsuario->id_escuela;
                if ($estudiante->save())
                {
                    //return response()->json(["mensaje" => "Se guardo correctamente"]);
                     if(count($request->representantes) > 0)
                     {
                         //guarda en la tabla de representantes
                         foreach($request->representantes as $item)
                         {
                             //dd($this->$request->representantes[$i]['cedula']);
                             //dd($item[0]['nombre']);
                             $representante = new Representante;
                             $representante->id_tipo_familiar = $item[0]['id_tipo_familiar'];
                             $representante->id_tipo_identificacion = $item[0]['id_tipo_identificacion'];
                             $representante->identificacion = $item[0]['identificacion'];
                             $representante->nombre = $item[0]['nombre'];
                             $representante->apellidos = $item[0]['apellidos'];
                             $representante->parentesco = $item[0]['parentesco'];
                             $representante->telefonoMovil = $item[0]['telefonoMovil'];
                             $representante->telefonoFijo = $item[0]['telefonoFijo'];
                             $representante->correo = $item[0]['correo'];
                             $representante->activo = true;
                             $representante->created_by = Auth::user()->name;
                             $representante->updated_by = Auth::user()->name;
                             if($representante->save()){
                                 $alumnoRepresentante = new EstudiantesRepresentante;
                                 $alumnoRepresentante->estudiantes_id = $estudiante->id;
                                 $alumnoRepresentante->representante_id = $representante->id;
                                 $alumnoRepresentante->timestamps = false;
                                 if($alumnoRepresentante->save())
                                 {
                                     return response()->json(["mensaje" => "Se guardo correctamente"]);
                                 }

                             }
                         }
                    }

                }
            }else
            {
                //actualizar
                if($request->id > 0){
                    $estudiante = Estudiantes::where('id', '=', $request->id)
                                    ->with(['representantes'])
                                    ->first();
                    $estudiante->cedula = $request->cedula;
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
                    $estudiante->activo = $request->activo;
                    $estudiante->codigoMatricula = $request->codigoMatricula;
                    $estudiante->fechaMatricula = $request->fechaMatricula;
                    $estudiante->idCurso = $request->idCurso;
                    $estudiante->idParalelo = $request->idParalelo;
                    if($estudiante->save()){
                        return response()->json(["mensaje" => "Se guardo correctamente"]);
                    }
                }
            }
        } catch (Exception $e) {
            return response()->json(["mensaje" => $e->getMessage()]);
        }
    }
    ///estudiante/update/
    public function update(Request $request, $id)
    {
        dd($request);
        try {
            if ($id != 0) {
                dd($id);
                $estudiante = Estudiantes::find($id);
                if ($estudiante != null) {
                    $estudiante->cedula = ($request->cedula) == null ? $estudiante->cedula : $request->cedula;
                    if ($estudiante->save()) {
                        return response()->json(["mensaje" => "Se actualizó correctamente."]);
                    }
                }
            }
        } catch (Exception $e) {
            return response()->json(["mensaje" => $e->getMessage()]);
        }
    }

    public function delete(int $id)
    {
        try {
            if($id > 0)
            {
                $estudiante = Estudiantes::find($id);
                if($estudiante != null)
                {
                    $estudiante->activo = false;
                    if($estudiante->save())
                    {
                        return response()->json(["mensaje" => "Se actualizo correctamente"]);
                    }
                }
            }
        } catch (Exception $e) {
            return response()->json(["mensaje" => $e->getMessage()]);
        }

    }

    public function detail(int $idEstudiante)
    {
        if($idEstudiante > 0)
        {
            //$estudiante = Estudiantes::find($idEstudiante)->get();
            $estudiante = Estudiantes::where('id', '=', $idEstudiante)
                            ->with(['representantes'])
                            ->get();
            //dd($estudiante);
        }
        else
        {
            $estudiante = null;
        }

        //dd($idEstudiante);
        return view('General.Estudiante.estudianteDetalles')->with(['estudiante' => $estudiante])->renderSections()['content'];
        //return $estudiante;
    }

    public function representantes(int $id)
    {
        $estudi = Estudiantes::find($id)->representantes()->get();
        //dd($estudi);
        return $estudi;
    }

    public function fichaEstudiante()
    {

         $pdf = App::make('dompdf.wrapper');
        // $pdf->loadHTML('<h1>Styde.net</h1>');

        // return $pdf->download('mi-archivo.pdf');
        return PDF::loadView('General.Estudiante.fichaEstudiante')
            ->download('fichaEstudiantil.pdf');

        // $pdf = App::make('dompdf.wrapper');
        // $pdf->loadHTML('<h1>Test</h1>');
        // return $pdf->download('Despacho.pdf');
    }
}
