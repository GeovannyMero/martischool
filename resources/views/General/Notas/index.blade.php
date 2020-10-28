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
<script type="text/javascript" src="{{ asset('js/notas/notasCursos.js')}}"></script>

<section class="content-header">
    <ol class="breadcrumb">
        <li>
            <a href="/home">
                <i class="fa fa-dashboard"></i>Dashboard
            </a>
        </li>
        <li class="active">
            Notas
        </li>
        <li class='active'>
           Paralelos
        </li>
    </ol>
</section>
</br>
</br>

<div class="box box-primary">
    <div class="box-header with-border">
        <h3 class="box-title">Cursos</h3>
    </div>
    <div class="box-body" ng-app='notasModule'>
        <curso-Component></curso-Component>
    </div>
</div>
@endsection
