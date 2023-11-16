<form action="{{ route('usuario.deletar', $usuario->id) }}" method="POST">
    @csrf()
    @method('DELETE')
    Deseja excluir o usuário: <b>{{ $usuario->nome }}</b>?
    <br>
    <button class="btn btn-danger my-2" type="submit">Sim</button>
</form>