<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateNiveleducativoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('nivel_educativo', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('nombre',100)->nullable($value=false);
            $table->string('descripcion',100);
            $table->boolean('activo')->nullable($value = false);
            $table->string('created_by',50);
            $table->string('updated_by',50);
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
        Schema::dropIfExists('nivel_educativo');
    }
}
