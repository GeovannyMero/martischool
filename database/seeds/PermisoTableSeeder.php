<?php

use Illuminate\Database\Seeder;

class PermisoTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('permiso')->insert([
            'nombre' => 'seguridad',
            'link' => '/seguridad',
            'id_padre' => null,
            'activo' => true,
            'created_by' => 'admin',
            'updated_by' => 'admin'

        ]);
    }
}
