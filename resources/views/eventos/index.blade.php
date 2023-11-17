@extends('layout')

@section('content_header')
    <h1>Listagem de eventos cadastrados</h1>
@stop

@section('content')
<div class="card">
              <div class="card-header">
                <span class="text-muted">Lista de eventos cadastrados</span>
                <div class="card-tools">
                  <a href="#" title="Cadastrar Pessoa" class="btn btn-success" onclick="eModal.ajax('{{ route('evento.criar') }}', 'Cadastro de Evento')"><i class="fas fa-plus"></i> Novo evento</a>
                </div>
              </div>
              <div class="card-body">
                <table id="tabelaDatatable" width="100%">
                    <thead>
                        <tr>
                            <th>Ações</th>
                            <th>Nome</th>
                            <th>Data do evento</th>
                            <th>Empresa</th>
                        </tr>
                    </thead>
                    @foreach($eventos as $evento)
                        <tr>
                            <td><a class="btn btn-info" title="Ações" href="{{ route('evento.mostrar', $evento->id ) }}"><i class="fa fa-cog"></i></a></td>
                            <td>{{ $evento['nome_evento'] }}</td>
                            <td>{{ \Carbon\Carbon::parse($evento['dt_evento'])->format('d/m/Y') }}</td>
                            <td>{{ $evento['nome_empresa'] }}</td>
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
        }
    });
} );
</script>
@stop


