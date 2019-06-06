<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
   // return view('welcome');
   return view('/auth/login');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

//Estudiantes
Route::get('/Estudiantes','EstudianteController@index');
Route::post('/estudiante/all', 'EstudianteController@all');
Route::post('/estudiante/saveEstudiante','EstudianteController@saveEstudiante');
Route::post('/estudiante/update/{id}','EstudianteController@update');

//Empresa
Route::get('/empresa', 'EmpresaController@index');
Route::post('/empresa/all', 'EmpresaController@all');
Route::post('/empresa/update/{id}', 'EmpresaController@update');
Route::post('/empresa/insert', 'EmpresaController@insert');
Route::post('/empresa/delete/{id}', 'EmpresaController@delete');

//escuela
Route::get('/escuela', 'EscuelaController@index');
Route::post('/escuela/all', 'EscuelaController@all');
Route::post('/escuela/insertar', 'EscuelaController@insertar');
Route::post('/escuela/update/{id}', 'EscuelaController@update');
Route::post('/escuela/delete/{id}', 'EscuelaController@delete');

//Roles
Route::get('/rol', 'RolController@index');


