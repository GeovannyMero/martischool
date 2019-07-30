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
Route::post('/rol/all', 'RolController@all');
Route::post('/rol/insert', 'RolController@insert');
Route::post('/rol/update/{id}', 'RolController@update');
Route::post('/rol/delete/{id}', 'RolController@delete');

//Permiso
Route::get('/permiso', 'PermisoController@index');
Route::post('permiso/all', 'PermisoController@all');

//Niveles Educativos
Route::get('/niveleducativo', 'NivelEducativoController@index');
Route::post('/niveleducativo/all', 'NivelEducativoController@all');
Route::post('/niveleseducativo/update/{id}','NivelEducativoController@update');
Route::post('/niveleducativo/insert', 'NivelEducativoController@insert');

//Cursos
Route::get('/curso','CursoController@index');
Route::post('/curso/all','CursoController@all');
Route::get('/cursoNiveleducativo/niveles', 'CursoController@niveles');
Route::post('/curso/update/{id}', 'CursoController@update');
Route::post('/curso/insert','CursoController@insert');

//Paralelos
Route::get('/paralelo', 'ParaleloController@Index');
Route::post('/paralelo/all', 'ParaleloController@all');
Route::post('/paralelo/update/{id}', 'ParaleloController@update');
Route::post('/paralelo/insert', 'ParaleloController@insert');

Route::get('/periodos', 'PeriodoController@index');
Route::post('/periodos/all', 'PeriodoController@all');
Route::post('/periodos/insert', 'PeriodoController@insert');
Route::post('/periodos/update/{id}', 'PeriodoController@update');

//Planificaciones de cursos
Route::get('/planificacion', 'PlanificacionController@index');
Route::post('/planificacion/all', 'PlanificacionController@all');
Route::post('/planificacion/insert', 'PlanificacionController@insert');
Route::post('/planificacion/update/{id}', 'PlanificacionController@update');

Route::post('/planificacion/prePlanificacion', 'PlanificacionController@prePlanificacion');
Route::post('/planificacion/paralelos', 'PlanificacionController@paralelos');
Route::post('/planificacion/periodos', 'PlanificacionController@periodos');


Route::get('/profesor', 'ProfesorController@index');
Route::post('/profesor/all', 'ProfesorController@all');
Route::post('/profesor/rol', 'ProfesorController@getRolProfesor');
Route::post('/profesor/update/{id}', 'ProfesorController@update');
Route::post('/profesor/insert', 'ProfesorController@insert');

//Personal Educativo
Route::get('/personal', 'PersonalController@index');
Route::post('/personal/all', 'PersonalController@all');
Route::post('/personal/update/{id}', 'PersonalController@update');
Route::post('/personal/insert', 'PersonalController@insert');
Route::post('/personal/remove/{id}', 'PersonalController@remove');



