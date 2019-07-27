<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use PHPUnit\Framework\Exception;
use Illuminate\Support\Facades\Auth;
use \App\Modelos\Personal;

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
            if(Auth::check())
            {
                $personal = Personal::all();
            }
        } catch (Exception $e) {
            return response()->json(['mensaje' => $e->getMessage()]);
        }
        return $personal;
    }
}
