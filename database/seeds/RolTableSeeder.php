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
            'nombre' => 'Master',
            'descripcion' => 'Master',
            'activo' => true,
            'created_by' => 'default',
            'updated_by' => 'default'
        ]);
    }
}
