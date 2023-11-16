<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{UsuarioController, EventoController, RelatorioController};

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
    return redirect('usuario');
});

//Rotas de Controle de Eventos
Route::get('/evento/criar', [EventoController::class, 'criar'])->name('evento.criar');
Route::get('/evento/{id}', [EventoController::class, 'mostrar'])->name('evento.mostrar');
Route::post('/evento', [EventoController::class, 'registrar'])->name('evento.registrar');
Route::get('/evento', [EventoController::class, 'index'])->name('evento.index');

//Rotas de Controle de Usuários
Route::delete('/usuario/{id}', [UsuarioController::class, 'deletar'])->name('usuario.deletar');
Route::get('/usuario/excluir/{id}', [UsuarioController::class, 'excluir'])->name('usuario.excluir');
Route::put('/usuario/{id}', [UsuarioController::class , 'atualizar'])->name('usuario.atualizar');
Route::get('/usuario/{id}/editar', [UsuarioController::class, 'editar'])->name('usuario.editar');
Route::get('/usuario/criar', [UsuarioController::class, 'criar'])->name('usuario.criar');
Route::get('/usuario/{id}', [UsuarioController::class, 'mostrar'])->name('usuario.mostrar');
Route::post('/usuario', [UsuarioController::class, 'registrar'])->name('usuario.registrar');
Route::get('/usuario', [UsuarioController::class, 'index'])->name('usuario.index');

//Rotas de Controle de Eventos
Route::get('/relatorio', [RelatorioController::class, 'index'])->name('relatorio.index');