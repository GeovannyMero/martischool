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
            'nombre' => '',
            'descripcion' => ''
        ]);
    }
}
