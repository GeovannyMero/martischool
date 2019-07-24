<?php

use Illuminate\Database\Seeder;

class ProfesorTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('profesor')->insert([
            'cedula' => '0931254569',
            'nombre' => 'geovanny',
            'apellidos' => 'Mero Baque',
            'correo' => 'gmero@gmail.com',
            'id_rol' => 3,
            'activo' => true,
            'created_by' => 'admin',
            'updated_by' => 'admin',
            'id_user' => 2
        ]);
    }
}
