<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');

            //nuevos campos
            $table->boolean('activo')->nullable($values = false);
            // $table->integer('escuela_id')->unsigned();
            $table->integer('rol_id');

            //auditoria
            $table->rememberToken();
            $table->timestamps();
            $table->string('created_by', 50);
            $table->string('update_by', 50);

            //claves foraneas
            // $table->foreign('escuela_id')->references('id')->on('escuela');
            // $table->foreign('rol_id')->references('id')->on('rol');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
