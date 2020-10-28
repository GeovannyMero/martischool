<?php

use Illuminate\Database\Seeder;

class PersonalTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('personal')->insert([
            'cedula' => '0931254569',
            'primerNombre' => 'Geovanny',
            'segundoNombre' => 'jeff',
            'primerApellido' => 'Mero',
            'segundoApellido' => 'Bauqe',
            'Genero' => 'M',
            'fechaNacimiento' => '19/11/2019',
            'correo' => 'gmero@gmail.com',
            'direccion' => 'fragata',
            'telefono' => '0967869571',
            'activo' => true,
            'id_rol' => 2,
            'accesoSistema' => true,
            'created_by' => 'admin',
            'update_by' => 'admin'

        ]);
    }
}
