<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateParaleloTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('paralelo', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('nombre',10)->nullable($value=false);
            $table->boolean('activo')->nullable($value=false);
            $table->string('created_by',50)->nullable($value=false);
            $table->string('updated_by',50)->nullable($value=false);
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
        Schema::dropIfExists('paralelo');
    }
}
