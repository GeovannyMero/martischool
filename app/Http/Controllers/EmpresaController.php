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
    }