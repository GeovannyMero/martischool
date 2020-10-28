<?php

use Illuminate\Database\Seeder;

class ParaleloTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('paralelo')->insert([
            'nombre' => 'A',
            'activo' => true,
            'created_by' => 'admin',
            'updated_by' => 'admin',
        ]);
    }
}
