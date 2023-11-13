<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;

class UsuarioController extends Controller
{
    public function index(Usuario $usuario)
    {
        
        $usuarios = $usuario->all();

        return view('usuarios.principal', compact('usuarios'));
    }

    public function deletar()
    {

    }

    public function atualizar()
    {

    }

    public function editar()
    {

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
        //dd($usuario->nome);
        return view('usuarios/dadosUsuario', compact('usuario'));
    }

    public function registrar(Request $request, Usuario $usuario)
    {
        //dd($request->only(['nome', 'cpf', 'nr_inscricao', 'nome_empresa', 'email', 'senha']));

        $data = $request->all();
        $data['perfil'] = 'Usuario';
        $data['status'] = 'A'; 

        $usuario = $usuario->create($data);
        
        return redirect()->route('usuario.index');
    }
}
