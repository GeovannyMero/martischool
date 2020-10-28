<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateParcialTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('parcial', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('catalogo_id');
            $table->string('nombre')->nullable($value=false);
            $table->string('descripcion');
            $table->boolean('activo');

            $table->string('created_by');
            $table->string('update_by');
            $table->timestamps();

            $table->foreign('catalogo_id')->references('id')->on('catalogo');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('parcial');
    }
}
