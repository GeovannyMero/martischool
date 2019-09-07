<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAsistenciaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('asistencia', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('catalogo_id');
            $table->integer('estudiante_id');

            $table->string('created_by');
            $table->string('updated_by');
            $table->timestamps();

            $table->foreign('catalogo_id')->references('id')->on('catalogo');
            $table->foreign('estudiante_id')->references('id')->on('estudiante');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('asistencia');
    }
}
