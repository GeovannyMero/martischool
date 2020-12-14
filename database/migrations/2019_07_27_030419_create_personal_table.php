<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePersonalTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('personal', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('cedula',10)->nullable($value=false)->unique();
            $table->string('primerNombre', 100)->nullable($value=false);
            $table->string('segundoNombre', 100);
            $table->string('primerApellido', 100)->nullable($value=false);
            $table->string('segundoApellido', 100)->nullable($value=false);
            $table->string('Genero',1)->nullable($value=false);
            $table->date('fechaNacimiento')->nullable($value=false);
            $table->string('correo')->nullable($value=false);
            $table->string('direccion')->nullable($value=false);
            $table->string('telefono')->nullable($value=false);
            $table->boolean('activo')->nullable($value=false);
            $table->integer('id_escuela')->nullable($value=false);
            //USUARIO
            $table->integer('id_user')->unsigned();
            //Permiso
            //ROL
            $table->integer('id_rol')->nullable($value=false);
            $table->boolean('accesoSistema');
            //Auditoria
            $table->string('created_by')->nullable($value=false);
            $table->string('update_by')->nullable($value=false);
            $table->timestamps();

            //foreign key
            $table->foreign('id_rol')->references('id')->on('rol');
            $table->foreign('id_user')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('id_escuela')->references('id')->on('escuela');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('personal');
    }
}
