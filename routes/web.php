<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsuarioController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

//Rotas de Controle de Usuários
Route::delete('/usuario/{id}', [UsuarioController::class, 'deletar'])->name('usuario.deletar');
Route::put('/usuario/{id}', [UsuarioController::class , 'atualizar'])->name('usuario.atualizar');
Route::get('/usuario/{id}/editar', [UsuarioController::class, 'editar'])->name('usuario.editar');
Route::get('/usuario/criar', [UsuarioController::class, 'criar'])->name('usuario.criar');
Route::get('/usuario/{id}', [UsuarioController::class, 'mostrar'])->name('usuario.mostrar');
Route::post('/usuario', [UsuarioController::class, 'registrar'])->name('usuario.registrar');
Route::get('/usuario', [UsuarioController::class, 'index'])->name('usuario.index');
