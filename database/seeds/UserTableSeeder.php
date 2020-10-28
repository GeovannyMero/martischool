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
            'email' => 'geovannym65@gmail.com',
            'email_verified_at' => now(),
            //'password' => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'password' => bcrypt('admin123') , // password
            'remember_token' => Str::random(10),
            //add new thing
            'activo' => true,
            'escuela_id' => 1,
            'rol_id' => 1,
            'created_by' => 'default',
            'update_by' => 'default',

        ]);
    }
}
