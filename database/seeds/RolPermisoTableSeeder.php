<?php

use Illuminate\Database\Seeder;

class RolPermisoTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('rol_permiso')->insert([
            'id_rol' => 1,
            'id_permiso' => 3

        ]);
    }
}
