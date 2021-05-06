@extends('layouts.layout')
@section('content')
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/7.4.0/polyfill.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/exceljs/3.3.1/exceljs.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.8/FileSaver.min.js"></script>

    <link rel="stylesheet" type="text/css" href="{{ asset('DevExtreme/css/dx.spa.css')}}"/>
    <link rel="stylesheet" type="text/css" href="{{ asset('DevExtreme/css/dx.common.css')}}"/>
    <link rel="stylesheet" type="text/css" href="{{ asset('DevExtreme/css/dx.light.css')}}"/>

    <!--Angular -->
    <script type="text/javascript" src="{{ asset('DevExtreme/js/angular.min.js')}}"></script>
    <!--script-->
    <script type="text/javascript" src="{{ asset('DevExtreme/js/dx.all.js')}}"></script>

    <script type="text/javascript" src="{{ asset('js/reportes/comportamiento.js')}}"></script>

    <section class="content-header">
        <ol class="breadcrumb">
            <li>
                <a href="#">
                    <i class="fa fa-dashboard"></i>Informe Comportamiento
                </a>
            </li>
        </ol>
    </section>
    <br/>
    <br/>
    <div class="box box-primary" ng-app='comportamientoModule' ng-controller='title'>
        <div class="box-header with-border">
            <h3 class="box-title">@{{modulo}}</h3>
        </div>
        <div class="box-body">
            <div class="gridRol demo-containder" ng-controller='informe_comportamientoController'>
                <div id="pivotGridComportamiento" dx-pivot-grid="pivotGridOptions"></div>
            </div>
        </div>

    </div>
@endsection
