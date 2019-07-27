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
            //Permiso
            //ROL
            $table->integer('id_rol')->nullable($value=false);
            $table->boolean('accesoSistema');
            //Auditoria
            $table->string('created_by')->nullable($value=false);
            $table->string('update_by')->nullable($value=false);
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
        Schema::dropIfExists('personal');
    }
}
