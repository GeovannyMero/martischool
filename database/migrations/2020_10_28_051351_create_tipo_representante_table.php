<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTipoRepresentanteTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tipo_familiar', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('codigo', 10);
            $table->string('descripcion', 100);
            $table->boolean('activo');
            $table->string('created_by',50);
            $table->string('updated_by',50);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tipo_representante');
    }
}
