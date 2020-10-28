<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateComportamientoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('comportamiento', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('parcial_id');
            $table->integer('estudiante_id');
            $table->decimal('nota')->nullable($value=false);
            $table->boolean('activo')->nullable($value=false);

            $table->string('created_by');
            $table->string('updated_by');
            $table->timestamps();

            //claves foraneas
            $table->foreign('estudiante_id')->references('id')->on('estudiante');
            $table->foreign('parcial_id')->references('id')->on('parcial');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('comportamiento');
    }
}
