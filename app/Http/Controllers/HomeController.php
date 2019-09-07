<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Modelos\Rol;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index(Request $request)
    {
        //$request->user()->authorizeRoles(['user', 'admin']);
        $rol_id = $request->user()->rol_id;
        //dd(Rol::find($id_rol)->nombre);
        $rol = Rol::find($rol_id)->nombre;
        return view('home');
    }
}
