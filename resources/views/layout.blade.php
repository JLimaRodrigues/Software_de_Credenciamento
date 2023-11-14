@extends('adminlte::page')

@section('title', 'Empresa Anonima')

@section('css')
    <!--DATATABLE-->
    <link rel="stylesheet" href="{{ asset('Libs/Datatable/jquery.dataTables.min.css') }}" />
    <script src="{{ asset('Libs/jquery3.7.1.min.js') }}"></script>
    <link rel="stylesheet" href="/css/admin_custom.css">
@stop

@section('js')
    <!--DATATABLE-->
    <script src="{{ asset('Libs/Datatable/jquery.dataTables.js') }}"></script>
    <script src="{{ asset('Libs/eModal.min.js') }}"></script>
@stop