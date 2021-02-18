<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class Notas
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if(Auth::check())
        {
            if (Auth::user()->hasRol("Profesor"))
            {
                return $next($request);
            }else{
                abort(401, 'Esta acción no está autorizada.');
            }

        }
        else{
            return redirect('/');
        }


    }
}
