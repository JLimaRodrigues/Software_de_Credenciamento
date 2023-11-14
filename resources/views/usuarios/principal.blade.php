@extends('layout')

@section('content_header')
    <h1>Lista de pessoal cadastrado</h1>
@stop

@section('content')
<div class="card">
              <div class="card-header">
                <span class="text-muted">Lista de pessoal cadastrado para o evento Tal</span>
                <div class="card-tools">
                  <a href="#" title="Cadastrar Pessoa" class="btn btn-success" onclick="eModal.ajax('{{ route('usuario.criar') }}', 'Cadastro de Pessoa')"><i class="fas fa-plus"></i> Nova Pessoa</a>
                </div>
              </div>
              <div class="card-body">
                <table id="tabelaDatatable"><thead>
            <tr>
                <th>Ações</th>
                <th>Nome</th>
                <th>CPF</th>
                <th>N° de inscrição</th>
                <th>Empresa</th>
            </tr>
        </thead>
        @foreach($usuarios as $usuario)
            <tr>
                <td><a class="btn btn-info" title="Ações" href="{{ route('usuario.mostrar', $usuario->id ) }}"><i class="fa fa-cog"></i></a></td>
                <td>{{ $usuario['nome'] }}</td>
                <td>{{ $usuario['cpf'] }}</td>
                <td>{{ $usuario['nr_inscricao'] }}</td>
                <td>{{ $usuario['nome_empresa'] }}</td>
            </tr>
        @endforeach
        </table>
              </div>
              <!-- /.card-body -->
              <div class="card-footer">
                Criado por Jefferson Lima
              </div>
              <!-- /.card-footer-->
            </div>
  </div>
  <script>
    $(document).ready( function () {
    $('#tabelaDatatable').DataTable({
        processing: true,
        serverSide: false
    });
} );
</script>
@stop


