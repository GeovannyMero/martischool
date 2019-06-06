<?php

use Illuminate\Database\Seeder;

class RolTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('rol')->insert([
            'nombre' => 'Administrador',
            'descripcion' => 'Admin',
            'activo' => true,
            'created_by' => 'admin',
            'updated_by' => 'admin'
        ]);
    }
}
