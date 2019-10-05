<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEstudiantesRepresentanteTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('estudiantes_representante', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('estudiantes_id')->nullable($value=false);
            $table->integer('representante_id')->nullable($value=false);

            $table->foreign('estudiantes_id')->references('id')->on('estudiante');
            $table->foreign('representante_id')->references('id')->on('representante');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('estudiantes_representante');
    }
}
