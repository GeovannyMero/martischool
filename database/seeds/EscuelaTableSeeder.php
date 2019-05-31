<?php

use Illuminate\Database\Seeder;

class EscuelaTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('escuela')->insert([
            'nombre' => 'Escuela José Marti',
            'descripcion' => 'Escuela',
            'activo' => true,
            'created_by' => 'default',
            'update_by' => 'default'

        ]);
    }
}
