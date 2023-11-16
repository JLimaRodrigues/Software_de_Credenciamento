<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;

class UsuarioController extends Controller
{
    public function index(Usuario $usuario)
    {
        
        $usuarios = $usuario->all()->sortBy([
            ['nome', 'asc'], //nome em ordem alfabética
            ['created_at', 'desc'] //data de criação
        ]);

        return view('usuarios.principal', compact('usuarios'));
    }

    public function deletar()
    {

    }

    public function editar(Usuario $usuario, string|int $id)
    {
        if(!$usuario = Usuario::find($id)){
            return back();
        }

        return view('usuarios.editar', compact('usuario'));
    }

    public function atualizar(Request $request, Usuario $usuario, string|int $id)
    {
        if(!$usuario = Usuario::find($id)){
            return back();
        }

        $usuario->update($request->all());

        return redirect()->route('usuario.mostrar', $id);
    }

    public function criar()
    {
        return view('usuarios.criar');
    }

    public function mostrar(string|int $id)
    {
        if(!$usuario = Usuario::find($id)){
            return back();
        }
        
        return view('usuarios.dadosUsuario', compact('usuario'));
    }

    public function registrar(Request $request, Usuario $usuario)
    {
        
        $data = $request->all();
        $data['perfil'] = 'Usuario';
        $data['status'] = 'A'; 

        $usuario = $usuario->create($data);
        
        return redirect()->route('usuario.index');
    }
}
