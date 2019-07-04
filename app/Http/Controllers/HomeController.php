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
        $id_rol = $request->user()->id_rol;
        //dd(Rol::find($id_rol)->nombre);
        $rol = Rol::find($id_rol)->nombre;
        return view('home');
    }
}
