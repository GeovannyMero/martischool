<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFkRolPermisoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('rol_permiso', function (Blueprint $table) {
            $table->foreign('id_rol')->references('id')->on('rol');
        });

        Schema::table('rol_permiso', function (Blueprint $table) {
            $table->foreign('id_permiso')->references('id')->on('permiso');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('fk_rol_permiso');
    }
}
