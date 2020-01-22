<?php

namespace App\Http\Controllers;

use \App\Modelos\Estudiantes;
use Illuminate\Http\Request;
use  \App\Http\Controllers\Controller;
use App\Modelos\Representante;
use Illuminate\Support\Facades\DB;
use Response;
use View;
use Exception;
use Barryvdh\DomPDF\Facade as PDF;
use App;
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

    //GUARDAR
    public function saveEstudiante(Request $request)
    {
        dd($request);
        try {

            if ($request->id == "") {
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
                if ($estudiante->save()) {
                    return response()->json(["mensaje" => "Se guardo correctamente"]);
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

    public function detail(int $idEstudiante)
    {
        //dd($request);
        //$datos = $request;
        //dd($datos['id']);
        if($idEstudiante > 0)
        {
            $estudiante = Estudiantes::find($idEstudiante)->with(['representantes'])->get();
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

        // $pdf = App::make('dompdf.wrapper');
        // $pdf->loadHTML('<h1>Styde.net</h1>');

        // return $pdf->download('mi-archivo.pdf');
        // return PDF::loadView('General.Estudiante.estudianteDetalles')
        //     ->download('archivo.pdf');

        $pdf = App::make('dompdf.wrapper');
        $pdf->loadHTML('<h1>Test</h1>');
        return $pdf->download('Despacho.pdf');
    }
}
