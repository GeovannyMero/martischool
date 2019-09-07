<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRolPermisoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('rol_permiso', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->Integer('rol_id')->nullable($value = false);
            $table->Integer('permiso_id')->nullable($value = false);


            $table->foreign('rol_id')->references('id')->on('rol');


            $table->foreign('permiso_id')->references('id')->on('permiso');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('rol_permiso');
    }
}
