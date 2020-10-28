<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCursoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('curso', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('nombre',100)->nullable($value=false);
            $table->string('curso_letra',100);
            $table->string('curso_numero',10)->nullable($value=false);
            $table->string('curso_siguiente',100)->nullable($value=false);
            $table->integer('id_nivel')->nullable($value=false);
            $table->boolean('activo')->nullable($value = false);
            $table->string('created_by',50);
            $table->string('updated_by',50);
            $table->timestamps();

            //relaciones
            $table->foreign('id_nivel')->references('id')->on('nivel_educativo');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('curso');
    }
}
