@extends('adminlte::page')

@section('title', 'Empresa Anonima')

@section('css')
    <script src="{{ asset('Libs/jquery3.7.1.min.js') }}"></script>
    <!-- <link rel="stylesheet" href="/css/admin_custom.css"> -->
    <!--DATATABLE-->
    <!-- <link rel="stylesheet" href="{{ asset('Libs/Datatable/jquery.dataTables.min.css') }}" />
    <link rel="stylesheet" href="{{ asset('Libs/Datatable/buttons.dataTables.min.css') }}" /> -->
    <link rel="stylesheet" href="{{ asset('Libs/Datatable/1.13.7/css/jquery.dataTables.min.css') }}" />
    <link rel="stylesheet" href="{{ asset('Libs/Datatable/1.13.7/buttons/2.4.2/css/buttons.dataTables.min.css') }}" />
@stop

@section('js')

    <script src="{{ asset('Libs/eModal.min.js') }}"></script>
    
    <!--DATATABLE-->
    <!-- <script src="{{ asset('Libs/Datatable/jquery.dataTables.js') }}"></script> -->
    <script src="{{ asset('Libs/Datatable/1.13.7/jquery-3.7.0.js') }}"></script>
    <script src="{{ asset('Libs/Datatable/1.13.7/js/jquery.dataTables.min.js') }}"></script>
    <script src="{{ asset('Libs/Datatable/1.13.7/buttons/2.4.2/js/dataTables.buttons.min.js') }}"></script>
    <script src="{{ asset('Libs/Datatable/1.13.7/ajax/libs/jszip/3.10.1/jszip.min.js') }}"></script>
    <script src="{{ asset('Libs/Datatable/1.13.7/ajax/libs/pdfmake/0.1.53/pdfmake.min.js') }}"></script>
    <script src="{{ asset('Libs/Datatable/1.13.7/ajax/libs/pdfmake/0.1.53/vfs_fonts.js') }}"></script>
    <script src="{{ asset('Libs/Datatable/1.13.7/buttons/2.4.2/js/buttons.html5.min.js') }}"></script>
    
@stop