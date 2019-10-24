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

<script type="text/javascript" src="{{ asset('js/notas/index.js')}}"></script>
<script type="text/javascript" src="{{ asset('js/notas/comportamiento.js')}}"></script>

<div class="box box-primary" ng-app='notasModule'>
    <div class="box-header with-border">
        <h3 class="box-title">Comportamiento</h3>
    </div>
    <div class="box-body" ng-controller='comportamientoController'>
    <input type="hidden" name="idCurso" id="idCurso" value="{{$idCurso}}">

    </div>
</div>
@endsection
