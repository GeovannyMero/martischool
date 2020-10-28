<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDatalleComportamientoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('datalle_comportamiento', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->date('fecha')->nullable($value=false);
            $table->string('tipo',1)->nullable($value=false);
            $table->string('comentario', 200);
            $table->integer('comportamiento_id');
            //auditoria
            $table->string('created_by');
            $table->string('updated_by');
            $table->timestamps();

            $table->foreign('comportamiento_id')->references('id')->on('comportamiento');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('datalle_comportamiento');
    }
}
