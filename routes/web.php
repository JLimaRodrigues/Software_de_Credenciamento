<?php

use App\Http\Controllers\{EventoController, ProfileController, RelatorioController, UsuarioController};
use Illuminate\Support\Facades\Route;

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

// Route::get('/', function () {
//     return view('welcome');
// });

Route::get('/', function () {
    return redirect('usuario');
})->middleware(['auth', 'verified'])->name('index');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
//});

//Rotas de Controle de Eventos
Route::prefix('evento')->group(function () {
    Route::get('/criar', [EventoController::class, 'criar'])->name('evento.criar');
    Route::get('/{id}', [EventoController::class, 'mostrar'])->name('evento.mostrar');
    Route::post('/', [EventoController::class, 'registrar'])->name('evento.registrar');
    Route::get('/', [EventoController::class, 'index'])->name('evento.index');
});

//Rotas de Controle de Usuários
Route::prefix('usuario')->group(function () {
    Route::delete('/{id}', [UsuarioController::class, 'deletar'])->name('usuario.deletar');
    Route::get('/excluir/{id}', [UsuarioController::class, 'excluir'])->name('usuario.excluir');
    Route::put('/{id}', [UsuarioController::class , 'atualizar'])->name('usuario.atualizar');
    Route::get('/{id}/editar', [UsuarioController::class, 'editar'])->name('usuario.editar');
    Route::get('/criar', [UsuarioController::class, 'criar'])->name('usuario.criar');
    Route::get('/{id}', [UsuarioController::class, 'mostrar'])->name('usuario.mostrar');
    Route::post('/', [UsuarioController::class, 'registrar'])->name('usuario.registrar');
    Route::get('/', [UsuarioController::class, 'index'])->name('usuario.index');
});


//Rotas de Controle de Relatórios
Route::prefix('relatorio')->group(function () {
    Route::get('/', [RelatorioController::class, 'index'])->name('relatorio.index');
});

});

require __DIR__.'/auth.php';
