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
            $table->string('codigo',10);
            $table->string('cedula', 10);
            $table->string('primerNombre',100)->nullable();
            $table->string('segundoNombre',100)->nullable($value = false);
            $table->string('primerApellido',100)->nullable($value = false);
            $table->string('segundoApellido',100)->nullable($value = false);
            $table->date('fechaNacimiento', 100);
            $table->string('lugarNacimiento',100);
            $table->string('nacionalidad',100);
            $table->string('direccion',200);
            $table->string('telefono');
            $table->string('genero');
            $table->boolean('activo')->nullable($value = false);
            $table->string('codigoMatricula',10);
            $table->date('fechaMatricula')->nullable($value = false);
            //asignacion de curso
            $table->integer('idCurso');
            $table->integer('idParalelo');

            //Foreign Key
            $table->foreign('idCurso')->references('id')->on('curso');
            $table->foreign('idParalelo')->references('id')->on('paralelo');





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
