<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAlumnoRepresentanteTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Schema::create('alumno_representante', function (Blueprint $table) {
        //     $table->bigIncrements('id');
        //     $table->integer('estudiante_id')->nullable($value=false);
        //     $table->integer('representante_id')->nullable($value=false);

        //     $table->foreign('estudiante_id')->references('id')->on('estudiante');
        //     $table->foreign('representante_id')->references('id')->on('representante');
        // });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('alumno_representante');
    }
}
