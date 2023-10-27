@extends('adminlte::page')

@section('title', 'LAFTECH')

@section('content_header')
    <h1>Lista de pessoal cadastrado</h1>
@stop

@section('content')
<a href="{{ route('usuario.criar') }}">Criar Usuário</a>

<table>
    <thead>
        <th>Nome</th>
        <th>CPF</th>
        <th>N° Inscrição</th>
        <th>Empresa</th>
    </thead>
    <tbody>
       
    </tbody>
</table>
@stop

@section('css')
    <link rel="stylesheet" href="/css/admin_custom.css">
@stop

@section('js')
    <script> console.log('Hi!'); </script>
@stop