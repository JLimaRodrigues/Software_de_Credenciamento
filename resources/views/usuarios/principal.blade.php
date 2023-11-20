@extends('layout')

@section('content_header')
    <h1>Lista de pessoal cadastrado</h1>
@stop

@section('content')
<div class="card">
              <div class="card-header">
                <span class="text-muted">Lista de pessoal cadastrado para o evento Tal @can('permission'), Olá {{ Auth::user()->name }} @endcan </span>
                <div class="card-tools">
                  <a href="#" title="Cadastrar Pessoa" class="btn btn-success" onclick="eModal.ajax('{{ route('usuario.criar') }}', 'Cadastro de Pessoa')"><i class="fas fa-plus"></i> Nova Pessoa</a>
                </div>
              </div>
              <div class="card-body">
                <table id="tabelaDatatable" width="100%"><thead>
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
                <td>
                  <a class="btn btn-info btn-sm" title="Ver Detalhes" href="{{ route('usuario.mostrar', $usuario->id ) }}"><i class="fa fa-cog"></i></a>
                  <a class="btn btn-danger btn-sm" title="Excluir Usuário" onclick="eModal.ajax('{{ route('usuario.excluir', $usuario->id ) }}', 'Excluir Pessoa')"><i class="fas fa-times"></i></a>
                </td>
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
      responsive: true,
      dom: 'Bfrtip',
      lengthMenu: [
              [10, 25, 50, -1],
              [10, 25, 50, 'All']
      ],
      buttons: [
          'pageLength',
          'copyHtml5',
          'excelHtml5',
          'csvHtml5',
          'pdfHtml5'
      ],
      language: {
                    processing:     "Processando...",
                    search:         "Pesquisar:",
                    lengthMenu:     "Mostrar _MENU_ Registros por página",
                    info:           "Exibição de _START_ a _END_ em _TOTAL_ registros.",
                    infoEmpty:      "Exibição de 0 a 0 de 0 registros.",
                    infoFiltered:   "(Filtrado por _MAX_ itens no total)",
                    infoPostFix:    "",
                    loadingRecords: "Carregando...",
                    zeroRecords:    "Nenhum registro para exibir",
                    emptyTable:     "Não há registros para exibir na tabela.",
                    paginate: {
                        first:      "Primeiro",
                        previous:   "Anterior",
                        next:       "Próximo",
                        last:       "Último"
                    },
                    aria: {
                        sortAscending:  ": habilitar para classificar a coluna em ordem crescente",
                        sortDescending: ": habilitar para classificar a coluna em ordem decrescente"
                    }
                },
    });
} );
</script>
@stop


