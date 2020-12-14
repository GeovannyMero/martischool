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
use Illuminate\Support\Facades\Route;


Route::get('/', function () {
   // return view('welcome');
   return view('/auth/login');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

//Estudiantes
Route::get('/estudiante','EstudianteController@index');
Route::post('/estudiante/all', 'EstudianteController@all');
Route::post('/estudiante/saveEstudiante','EstudianteController@saveEstudiante');
Route::post('/estudiante/update/{id}','EstudianteController@update');
Route::get('/estudiante/detail/{id?}', 'EstudianteController@detail');
Route::post('/estudiante/getInformation/{id}', 'EstudianteController@getInformation' );
Route::post('/estudiante/representantes/{id}', 'EstudianteController@representantes');
Route::get('/estudiante/fichaEstudiante', 'EstudianteController@fichaEstudiante');
Route::post('/estudiante/delete/{id}', 'EstudianteController@delete');
// Route::get('/estudiante/fichaEstudiante', function(){
//     $pdf = \PDF::loadHTML('<h1>Test</h1>');
//     return $pdf->download();
// });
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
Route::get('/escuela/administrador/{id}', 'EscuelaController@administrador');
Route::post('/escuela/administradores/{id}', 'EscuelaController@administradores');
Route::post('/escuela/administrador/insertar/{idEscuela}', 'EscuelaController@guardarAdministradores');
Route::post('/escuela/administrador/actualizar/{id}', 'EscuelaController@actualizar');
Route::post('/escuela/administrador/eliminar/{id}', 'EscuelaController@eliminar');

//Roles
Route::get('/rol', 'RolController@index')->middleware('auth');;
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
Route::post('/niveleducativo/remove/{id}', 'NivelEducativoController@remove');


//Cursos
Route::get('/curso','CursoController@index');
Route::post('/curso/all','CursoController@all');
Route::get('/cursoNiveleducativo/niveles', 'CursoController@niveles');
Route::post('/curso/update/{id}', 'CursoController@update');
Route::post('/curso/insert','CursoController@insert');
Route::post('/curso/remove/{id}', 'CursoController@remove');
Route::post('/curso/Total', 'CursoController@TotalCurso');

//Paralelos
Route::get('/paralelo', 'ParaleloController@Index');
Route::post('/paralelo/all', 'ParaleloController@all');
Route::post('/paralelo/update/{id}', 'ParaleloController@update');
Route::post('/paralelo/insert', 'ParaleloController@insert');
Route::post('/paralelo/paraleloCurso', 'ParaleloController@paraleloCurso');
Route::post('/paralelo/delete/{id}', 'ParaleloController@delete');

Route::get('/periodos', 'PeriodoController@index');
Route::post('/periodos/all', 'PeriodoController@all');
Route::post('/periodos/insert', 'PeriodoController@insert');
Route::post('/periodos/update/{id}', 'PeriodoController@update');
Route::post('/periodos/remove/{id}', 'PeriodoController@remove');

//Planificaciones de cursos
Route::get('/planificacion', 'PlanificacionController@index');
Route::post('/planificacion/all', 'PlanificacionController@all');
Route::post('/planificacion/insert', 'PlanificacionController@insert');
Route::post('/planificacion/update/{id}', 'PlanificacionController@update');
Route::post('/planificacion/remove/{id}', 'PlanificacionController@remove');
Route::post('/planificacion/findByCourse/{id}', 'PlanificacionController@findByCourse');
Route::get('/planificacion/findParalelo/{id}', 'PlanificacionController@findParalelo');
Route::post('/planificacion/periodoActual/{perido}', 'PlanificacionController@planificacionPorPeriodo');

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
Route::post('/personal/update/{id}/{planificacion}', 'PersonalController@update');
Route::post('/personal/insert', 'PersonalController@insert');
Route::post('/personal/remove/{id}', 'PersonalController@remove');


//Notas
Route::get('/notas', 'NotasController@index');
Route::post('/notas/cursos', 'NotasController@cursos');
Route::get('/notas/comportamiento/{idCurso}/{idParalelo}', 'NotasController@comportamiento');
Route::post('/notas/comportamientoPorCurso/{idCurso}', 'NotasController@comportamientoPorCurso');
Route::post('/notas/guardarNota', 'NotasController@guardarNota');

//detalles de comportamiento
Route::post('/detallesComportamiento/guardarDetalles', 'DetallesComportamientoController@guardarDetalles');
Route::post('/detallesComportamiento/detalles/{comportamientoId}', 'DetallesComportamientoController@detalles');

//Parametros
Route::get('/parametros', 'ParametrosController@index');
Route::post('/parametros/all', 'ParametrosController@all');
Route::post('/parametros/insert', 'ParametrosController@insert');
Route::post('/parametros/update/{id}', 'ParametrosController@update');
Route::post('/parametros/remove/{id}', 'ParametrosController@remove');
Route::get('/parametros/quintiles', 'ParametrosController@quintiles');

//Parciales
Route::get('/parciales', 'ParcialController@index');
Route::post('/parciales/all', 'ParcialController@all');
Route::post('/parciales/insert', 'ParcialController@insert');
Route::post('/parciales/update/{id}', 'ParcialController@update');
Route::get('/parciales/parciales', 'ParcialController@parciales');
Route::post('parciales/remove/{id}', 'ParcialController@remove');

//Tipo Familiares
Route::post('/tipofamiliar/all', 'TipoFamiliarController@ObtenerTipoFamiliar');

//tipo Identificacion
Route::post('/tipoIdentificacion/all', 'TipoIdentificacionController@ObtenerTipoIdentificacion');




