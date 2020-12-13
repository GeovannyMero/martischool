<?php

namespace App\Http\Controllers;

use App\Modelos\Planificacion;
use Illuminate\Http\Request;
use PHPUnit\Framework\Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use \App\Modelos\Personal;
use \App\Modelos\Escuela;
use \App\User;
use \App\Modelos\PersonalPlanificacion;

class PersonalController extends Controller
{
    public function index()
    {
        try {
            if (Auth::check()) {
                return view('General.Personal.index');
            }
        } catch (Exception $e) {
            return response()->json(['mensaje' => $e->getMessage()]);
        }
    }

    public function all()
    {
        try {
            if (Auth::check()) {
                //$personal = Personal::all();
                $personal = DB::table('personal')
                    ->leftJoin('personal_planificacion', 'personal.id', '=', 'personal_planificacion.personal_id')
                    ->leftJoin('planificacion', 'personal_planificacion.planificacion_id', '=', 'planificacion.id')
                    ->select('personal.*', 'planificacion.id as planificacion_id')
                    ->get();
            }
        } catch (Exception $e) {
            return response()->json(['mensaje' => $e->getMessage()]);
        }
        return $personal;
    }

    public function update(int $id, int $planificacion_id, Request $request)
    {
        //dd($request);
        try {
            if (Auth::check()) {
                if ($id != 0) {
                    DB::beginTransaction();
                    $personal = Personal::find($id);

                    if ($personal != null) {
                        $personal->cedula = $request->cedula != null ? $request->cedula : $personal->cedula;
                        $personal->primerNombre = $request->primerNombre != null ? $request->primerNombre : $personal->primerNombre;
                        $personal->segundoNombre = $request->segundoNombre != null ? $request->segundoNombre : $personal->segundoNombre;
                        $personal->primerApellido = $request->primerApellido != null ? $request->primerApellido : $personal->primerApellido;
                        $personal->segundoApellido = $request->segundoApellido != null ? $request->segundoApellido : $personal->segundoApellido;
                        $personal->fechaNacimiento = $request->fechaNacimiento != null ? $request->fechaNacimiento : $personal->fechaNacimiento;
                        $personal->Genero = $request->Genero != null ? $request->Genero : $personal->Genero;
                        $personal->activo = $request->activo != null ? $request->activo : $personal->activo;
                        $personal->direccion = $request->direccion != null ? $request->direccion : $personal->direccion;
                        $personal->correo = $request->correo != null ? $request->correo : $personal->correo;
                        $personal->telefono = $request->telefono != null ? $request->telefono : $personal->telefono;
                        $personal->accesoSistema = $request->accesoSistema ? $request->accesoSistema : $personal->accesoSistema;
                        $personal->id_rol = $request->id_rol != null ? $request->id_rol : $personal->id_rol;
                        $personal->update_by = Auth::user()->name;
                        if ($personal->save())
                        {

                            if ($planificacion_id > 0)
                            {
                                //dd($planificacion_id);
                                //buscar planificacion
                                $planificacion = PersonalPlanificacion::where('personal_id', $personal->id)
                                    ->where('planificacion_id', $planificacion_id)
                                    ->first();
                                //dd($planificacion);
                                if ($planificacion != null) {
                                    //TODO::validar que tenga un cambio para ctualizar
                                    $planificacion->planificacion_id = $request->planificacion_id != null ? $request->planificacion_id : $planificacion_id;
                                    $planificacion->timestamps = false;
                                    if ($planificacion->save()) {
                                        DB::commit();
                                        return response()->json(["mensaje" => "Se actualizó correctamente."]);
                                    }
                                }
                                else{
                                    $personalPlanificacion = new PersonalPlanificacion();
                                    $personalPlanificacion->planificacion_id = $planificacion_id;
                                    $personalPlanificacion->personal_id = $personal->id;
                                    $personalPlanificacion->timestamps = false;
                                    if($personalPlanificacion->save())
                                    {
                                        DB::commit();
                                        return response()->json(["mensaje" => "Se actualizó correctamente."]);
                                    }

                                }
                            }
                            else
                            {
                                DB::commit();
                                return response()->json(["mensaje" => "Se actualizó correctamente."]);
                            }

                        }
                    }
                }
            }
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json(['mensaje' => $e->getMessage()]);
        }
    }

    public function insert(Request $request)
    {
        try {
            //dd($request->id_rol);
            //dd(Auth::user()->id);
            //dd(Personal::where("id_user", Auth::user()->id)->get());
            if (Auth::check())
            {
                //Obtiene datos del personal mediante el usuario
                $personalUsuario = Personal::where("id_user", Auth::user()->id)->first();
                //dd($personalUsuario->id_escuela);
                if ($request != null)
                {
                    DB::beginTransaction();
                    $personal = new Personal;
                    $usuario = new User;
                    //Se crea el usuario
                    $usuario->name = substr($request->primerNombre, 0, 1) . $request->primerApellido;
                    $usuario->email = $request->correo;
                    $usuario->password = bcrypt($request->cedula);
                    $usuario->activo = "true";
                    $usuario->rol_id = $request->id_rol;
                    $usuario->created_by = Auth::user()->name;
                    $usuario->update_by = Auth::user()->name;
                    if ($usuario->save())
                    {
                        $personal->cedula = $request->cedula;
                        $personal->primerNombre = $request->primerNombre;
                        $personal->segundoNombre = $request->segundoNombre;
                        $personal->primerApellido = $request->primerApellido;
                        $personal->segundoApellido = $request->segundoApellido;
                        $personal->fechaNacimiento = $request->fechaNacimiento;
                        $personal->Genero = $request->Genero;
                        $personal->activo = true;
                        $personal->id_escuela = $personalUsuario->id_escuela;
                        $personal->id_user = $usuario->id;
                        $personal->direccion = $request->direccion;
                        $personal->correo = $request->correo;
                        $personal->telefono = $request->telefono;
                        $personal->accesoSistema = $request->accesoSistema;
                        $personal->id_rol = $request->id_rol;
                        $personal->created_by = Auth::user()->name;
                        $personal->update_by = Auth::user()->name;
                        if ($personal->save())
                        {
                            if ($request->planificiacion_id > 0)
                            {
                                $planificacionPersonal = new PersonalPlanificacion;
                                $planificacionPersonal->personal_id = $personal->id;
                                $planificacionPersonal->planificacion_id = $request->planificacion_id;
                                $planificacionPersonal->timestamps = false;
                                if ($planificacionPersonal->save())
                                {
                                    DB::commit();
                                    return response()->json(["mensaje" => "Se guardó correctamente."]);
                                }
                            } else
                            {
                                DB::commit();
                                return response()->json(["mensaje" => "Se guardó correctamente."]);
                            }
                        }
                    }
                }
            }
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json(['mensaje' => $e->getMessage()]);
        }
    }

    public function remove(int $id)
    {
        try {
            if (Auth::check()) {
                if ($id != 0) {
                    $personal = Personal::find($id);
                    if ($personal != null) {
                        $personal->activo = false;
                        if ($personal->save()) {
                            return response()->json(["mensaje" => "Se eliminó correctamente."]);
                        }
                    }
                }
            }
        } catch (Exception $e) {
            return response()->json(['mensaje' => $e->getMessage()]);
        }
    }
}
