<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRepresentanteTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('representante', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('cedula')->nullable($value=false);
            $table->string('nombre', 100)->nullable($value=false);
            $table->string('apellidos', 200)->nullable($value=false);
            $table->string('parentesco')->nullable($value=false);
            $table->string('telefonoMovil');
            $table->string('telefonoFijo');
            $table->string('correo');
            $table->boolean('activo')->nullable($value=false);

            $table->string('created_by')->nullable($value=false);
            $table->string('updated_by')->nullable($value=false);
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
        Schema::dropIfExists('representante');
    }
}
