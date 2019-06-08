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
            'nombre' => 'rol',
            'link' => '/rol',
            'id_padre' => 2,
            'activo' => true,
            'created_by' => 'admin',
            'updated_by' => 'admin'

        ]);
    }
}
