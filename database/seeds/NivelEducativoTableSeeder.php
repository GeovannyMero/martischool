<?php

use Illuminate\Database\Seeder;

class NivelEducativoTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('nivel_educativo')->insert([
            'nombre' => 'EDUCACION INICIAL',
            'descripcion' => "EDUCACION INICIAL",
            'activo' => true,
            'created_by' => 'admin',
            'updated_by' => 'admin'
        ]);
    }
}
