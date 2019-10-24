@extends('layouts.layout')
@section('content')

<link rel="stylesheet" type="text/css" href="{{ asset('DevExtreme/css/dx.spa.css')}}" />
<link rel="stylesheet" type="text/css" href="{{ asset('DevExtreme/css/dx.common.css')}}" />
<link rel="stylesheet" type="text/css" href="{{ asset('DevExtreme/css/dx.light.css')}}" />

<!--Angular -->
<script type="text/javascript" src="{{ asset('DevExtreme/js/angular.min.js')}}"></script>
<script type="text/javascript" src="{{ asset('DevExtreme/js/angular-route.min.js')}}"></script>
<!--script-->
<script type="text/javascript" src="{{ asset('DevExtreme/js/dx.all.js')}}"></script>

<script type="text/javascript" src="{{ asset('js/estudiante/index.js')}}"></script>
<script type="text/javascript" src="{{ asset('js/estudiante/detallesEstudiante.js')}}"></script>

<link rel="stylesheet" type="text/css" href="{{ asset('css/general.css')}}" />

<div class="box box-primary" ng-app="App" ng-controller="appController"><ng-view></ng-view>
   <div class="box-header with-border">
        <h3 class="box-title">Estudiantes</h3>
    </div>
    <div class="box-body" id='box-body-estudiantes'>
        <div class="gridEstudiantes" class="demo-containder" >
            <div id="gridContainer" dx-data-grid="dataGridOptions">

            </div>
        </div>
    </div>

</div>
@endsection
