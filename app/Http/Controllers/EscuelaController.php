<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Modelos\Escuela;
use  \App\Http\Controllers\Controller;

class EscuelaController extends Controller
{
    public function index(){
        try{

                return view('General.Escuela.index');

        }catch(Exception $e){
            return response()->json(['mensaje' => $e->getMessage()]);
        }
    }

    public function all(){


            $escuela = Escuela::all();


        return $escuela;
    }
}
