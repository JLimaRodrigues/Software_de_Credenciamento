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
        buttons: [
            'copyHtml5',
            'excelHtml5',
            'csvHtml5',
            'pdfHtml5'
        ]
    });
} );
</script>
@stop


