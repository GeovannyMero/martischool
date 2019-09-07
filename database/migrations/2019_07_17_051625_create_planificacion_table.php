<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePlanificacionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('planificacion', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('id_periodo')->nullable($value = false);
            $table->integer('curso_id')->nullable($value = false);
            $table->integer('paralelo_id')->nullable($value = false);
            $table->boolean('activo')->nullable($value = false);
            $table->string('created_by')->nullable($value = false);
            $table->string('updated_by')->nullable($value = false);
            $table->timestamps();

            //relaciones
            $table->foreign('id_periodo')->references('id')->on('periodo');
            $table->foreign('curso_id')->references('id')->on('curso');
            $table->foreign('paralelo_id')->references('id')->on('paralelo');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('planificacion');
    }
}
