<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDetalleAsistenciaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('detalle_asistencia', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('asistencia_id');
            $table->integer('parcial_id');
            $table->date('fecha');
            $table->string('descripcion',200);

            $table->string('created_by');
            $table->string('updated_by');
            $table->timestamps();

            $table->foreign('asistencia_id')->references('id')->on('asistencia');
            $table->foreign('parcial_id')->references('id')->on('parcial');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('detalle_asistencia');
    }
}
