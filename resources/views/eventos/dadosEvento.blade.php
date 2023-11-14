@extends('layout')

@section('content_header')
    <h1>Dados Individuais do Evento</h1>
@stop

@section('content')
<div class="card">
              <div class="card-header">
                <span class="text-muted">Dados individuais de <b>{{ $evento->nome_evento }}</b></span>
                <div class="card-tools">
                  <a href="#" title="Editar Evento" class="btn btn-success"><i class="fas fa-pen"></i> Editar</a>
                </div>
              </div>
              <div class="card-body">
                    <label for="nome_evento">Nome do evento</label>
                    <input class="form-control mb-3" type="text" name="nome_evento" id="nome_evento" placeholder="Nome do Evento" value="{{ $evento->nome_evento ?? old('nome_evento') }}" disabled>
                    
                    <label for="nome_empresa">Nome da empresa</label>
                    <input class="form-control mb-3" type="text" name="nome_empresa"  id="nome_empresa" placeholder="Nome da Empresa" value="{{ $evento->nome_empresa ?? old('nome_empresa') }}" disabled>

                    <label for="dt_evento">Data do evento</label>
                    <input class="form-control mb-3" type="text" name="dt_evento" id="dt_evento" value="{{ \Carbon\Carbon::parse($evento['dt_evento'])->format('d/m/Y') ?? old('dt_evento') }}" disabled>

              </div>
              <!-- /.card-body -->
              <div class="card-footer">
                Criado por Jefferson Lima
              </div>
              <!-- /.card-footer-->
            </div>
  </div>
@stop


