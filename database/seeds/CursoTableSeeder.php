<?php

use Illuminate\Database\Seeder;

class CursoTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('curso')->insert([
            'nombre' => 'Primer Año de Básica',
            'curso_letra' => 'Primer Año de básica',
            'curso_numero' => '1',
            'curso_siguiente' => '1',
            'id_nivel' => 1,
            'activo' => true,
            'created_by' => 'admin',
            'updated_by' => 'admin'



        ]);
    }
}
