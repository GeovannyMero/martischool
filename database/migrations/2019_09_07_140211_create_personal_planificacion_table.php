<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePersonalPlanificacionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('personal_planificacion', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('personal_id');
            $table->integer('planificacion_id');
            //$table->timestamps();

            $table->foreign('personal_id')->references('id')->on('personal');
            $table->foreign('planificacion_id')->references('id')->on('planificacion');


        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('personal_planificacion');
    }
}
