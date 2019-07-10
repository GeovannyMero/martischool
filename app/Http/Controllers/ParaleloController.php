<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use \App\Modelos\Paralelos;

class ParaleloController extends Controller
{
    public function index()
    {
        return view ('General.Paralelo.Index');
    }
    public function all()
    {
        $paralelos;
        try
        {
            if(Auth::check())
            {
                $paralelos = Paralelos::all();

            }
        }
        catch(Exception $e)
        {
            return response()->json(['mensaje' => $e->getMessage()]);
        }
        return $paralelos;
    }
}
