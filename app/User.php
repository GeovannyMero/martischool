<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Modelos\Rol;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];


    public function rol()
    {
        return $this->belongsTo('App\Modelos\Rol');
    }

    //personal
   /* public function personal()
    {
        return $this->belongsTo('App\Modelos\Personal');
    }*/
    public  function personal()
    {
        return $this->hasOne("App\Modelos\Personal", "id_user");
    }

    public function authorizeRoles($roles)
    {
        if ($this->hasAnyRole($roles)) {
            return true;
        }
        abort(401, 'Esta acción no está autorizada.');
    }

    public function getRolUser($rol_id){

         $rolUser = $this->rol()->find($rol_id);
         return $rolUser->nombre;

    }

    public function hasRol($rol){
        if ($this->rol()->where('nombre', $rol)->first()) {
            return true;
        }
        return false;
    }


}
