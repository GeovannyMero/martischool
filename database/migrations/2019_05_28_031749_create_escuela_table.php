<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEscuelaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('escuela', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('nombre', 100)->unique()->nullable($value = false);
            $table->string('descripcion',100);
            $table->boolean('activo')->nullable($values=false);
            //auditoria
            $table->string('created_by',50);
            $table->string('update_by', 50);
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
        Schema::dropIfExists('escuela');
    }
}
