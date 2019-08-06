<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEstudianteTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('estudiante', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('cedula');
            $table->string('primerNombre',100)->nullable();
            $table->string('segundoNombre',100)->nullable($value = false);
            $table->string('primerApellido',100)->nullable($value = false);
            $table->string('segundoApellido',100)->nullable($value = false);
            $table->date('fechaNacimiento', 100);
            $table->string('nacionalidad',100);
            $table->string('direccion',200);
            $table->string('telefono');
            $table->string('genero');
            $table->boolean('activo')->nullable($value = false);
            $table->date('fechaMatricula')->nullable($value = false);



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
        Schema::dropIfExists('estudiante');
    }
}
