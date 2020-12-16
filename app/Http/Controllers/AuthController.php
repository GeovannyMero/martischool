<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use \App\User;
use Hash;

class AuthController extends Controller
{
    /* @POST
    */
    public  function Login(Request $request)
    {
        $this->validate($request, [
           'email' => 'required|email',
           'password' => 'required'
        ]);
       // dd(\Auth::user());
//dd(Hash::check($request->password, Auth::user()->password, []));
        $esUsuarioActivo = User::where('email', $request->email)->first();
        //dd(Hash::check($request->password, $esUsuarioActivo->password));
        //dd($esUsuarioActivo);
        if($esUsuarioActivo != null)
        {
            if (Hash::check($request->password, $esUsuarioActivo->password))
            {
                if($esUsuarioActivo->activo)
                {
                    if(\Auth::attempt([
                        'email' => $request->email,
                        'password' => $request->password
                    ])){
                        return redirect("/home");
                    }
                }
                else{
                    return redirect('/login')->with('error', 'Su usuario esta inactivo o bloqueado');
                }
            }else{
                return redirect('/login')->with('error', 'Su contraseña es incorrecta');
            }

        }

        return redirect('/login')->with('error', 'Su credenciales son incorrectas');
    }
}
