<?php

use Illuminate\Database\Seeder;

class PlanificacionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('planificacion')->insert([
            'id_periodo' => 1,
            'id_curso' => 1,
            'id_paralelo' => 1,
            'activo' => true,
            'created_by' => 'admin',
            'updated_by' => 'admin'

        ]);
    }
}
