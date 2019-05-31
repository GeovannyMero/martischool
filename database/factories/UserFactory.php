<?php

use App\User;
use APP\Escuela;
use Illuminate\Support\Str;
use Faker\Generator as Faker;


/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(User::class, function (Faker $faker) {
    static $password;
    return [
        'name' => $faker->name,
        'email' => $faker->unique()->safeEmail,
        'email_verified_at' => now(),
        //'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
        'password' => $password ?: $password = bcrypt('admin123') , // password
        'remember_token' => Str::random(10),
        //add new thing
        'activo' => true,
        'id_escuela' => function() use($faker){
            if(Escuela::count()){
                return $faker->randomElement(Escuela::pluck('id')->toArray());
            }else{
                return factory(Escuela::class)->create();
            }
        },
        'id_rol' => 1,
        'created_by' => '',
        'update_by' => '',


    ];
});
