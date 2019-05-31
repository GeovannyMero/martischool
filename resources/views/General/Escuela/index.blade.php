@extends('layouts.layout')
@section('content')

<link rel="stylesheet" type="text/css" href="{{ asset('DevExtreme/css/dx.spa.css')}}" />
<link rel="stylesheet" type="text/css" href="{{ asset('DevExtreme/css/dx.common.css')}}" />
<link rel="stylesheet" type="text/css" href="{{ asset('DevExtreme/css/dx.light.css')}}" />

<!--Angular -->
<script type="text/javascript" src="{{ asset('DevExtreme/js/angular.min.js')}}"></script>
<!--script-->
<script type="text/javascript" src="{{ asset('DevExtreme/js/dx.all.js')}}"></script>

<script type="text/javascript" src="{{ asset('js/escuela/index.js')}}"></script>

<div class="box box-primary">
    <div class="box-header with-border">
        <h3 class="box-title">Empresa</h3>
    </div>
    <div class="box-body">
        <div class="gridEscuela demo-containder" ng-app='EscuelaModule' ng-controller='escuelaController'>
        <div id="gridContainer" dx-data-grid="dataGridOptions"></div>
        </div>
    </div>

</div>
@endsection
