<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProfesorTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('profesor', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('cedula',10);
            $table->string('nombre',100)->nullable($value=false);
            $table->string('apellidos', 200)->nullable($value=false);
            $table->integer('id_rol')->nullable($value=false);
            $table->integer('id_user')->nullable($value=false)->unique();
            $table->string('correo')->nullable($value=false)->unique();
            $table->boolean('activo')->nullable($value=false);
            $table->string('created_by');
            $table->string('updated_by');

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
        Schema::dropIfExists('profesor');
    }
}
