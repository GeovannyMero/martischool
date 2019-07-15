<?php

use Illuminate\Database\Seeder;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'admin',
            'email' => 'geovannym64@gmail.com',
            'email_verified_at' => now(),
            //'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'password' => bcrypt('admin123') , // password
            'remember_token' => Str::random(10),
            //add new thing
            'activo' => true,
            'id_escuela' => 1,
            'id_rol' => 1,
            'created_by' => '',
            'update_by' => '',

        ]);
    }
}
