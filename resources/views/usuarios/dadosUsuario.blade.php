@extends('layout')

@section('title', 'LAFTECH')

@section('content_header')
    <h1>Dados Individual do Usuário</h1>
@stop

@section('content')
<div class="card">
              <div class="card-header">
                <span class="text-muted">Dados individuais de <b>{{ $usuario->nome }}</b></span>
                <div class="card-tools">
                  <a href="#" title="Imprimir Crachá" class="btn btn-success"><i class="fas fa-plus"></i> Imprimir o Crachá</a>
                </div>
              </div>
              <div class="card-body">
                    <label for="nome">Nome</label>
                    <input class="form-control mb-3" type="text" name="nome" id="nome" placeholder="Nome" value="{{ $usuario->nome ?? old('nome') }}" disabled>
                    
                    <label for="cpf">CPF</label>
                    <input class="form-control mb-3" type="text" name="cpf"  id="cpf" placeholder="CPF" value="{{ $usuario->cpf ?? old('cpf') }}" disabled>

                    <label for="nr_inscricao">N° de Inscrição</label>
                    <input class="form-control mb-3" type="text" name="nr_inscricao" id="nr_inscricao" placeholder="N° de inscrição" value="{{ $usuario->nr_inscricao ?? old('nr_inscricao') }}" disabled>

                    <label for="nome_empresa">Nome da Empresa</label>
                    <input class="form-control mb-3" type="text" name="nome_empresa" id="nome_empresa" placeholder="Nome da Empresa" value="{{ $usuario->nome_empresa ?? old('nome_empresa') }}" disabled>

                    <label for="email">Email</label>
                    <input class="form-control mb-3" type="text" name="email" id="email" placeholder="Email" value="{{ $usuario->email ?? old('email') }}" disabled>

              </div>
              <!-- /.card-body -->
              <div class="card-footer">
                Criado por Jefferson Lima
              </div>
              <!-- /.card-footer-->
            </div>
  </div>
@stop


