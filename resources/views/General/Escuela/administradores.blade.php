{{-- @extends('layouts.layout')
@section('content')
--}}
{{-- <link rel="stylesheet" type="text/css" href="{{ asset('DevExtreme/css/dx.spa.css')}}" />
<link rel="stylesheet" type="text/css" href="{{ asset('DevExtreme/css/dx.common.css')}}" />
<link rel="stylesheet" type="text/css" href="{{ asset('DevExtreme/css/dx.light.compact.css')}}" />

<!--Angular -->
<script type="text/javascript" src="{{ asset('DevExtreme/js/angular.min.js')}}"></script>
<!--script-->
<script type="text/javascript" src="{{ asset('DevExtreme/js/dx.all.js')}}"></script> --}}

<script type="text/javascript" src="{{ asset('js/escuela/indexAdministrador.js')}}"></script>

<link rel="stylesheet" type="text/css" href="{{ asset('css/general.css')}}" />


<section class="content-header">
    <ol class="breadcrumb">
        <li>
            <a href="/home">
                <i class="fa fa-dashboard"></i>Dashboard
            </a>
        </li>
        <li class=''>Escuela</li>
        <li class='active'>Administradores</li>
    </ol>
</section>
</br>
</br>
<div class="box box-primary" ng-app="EscuelaAdministradorModule">
    @csrf
    <div class="box-header with-border">
        <h3 class="box-title">Administradores {{ $id }}</h3>
    <input type="hidden" id="idEscuela" value="{{ $id }}"/>
    </div>
    <div class="box-body">
        <div id="gridEscuelaAdministradores demo-containder" ng-controller="administradoresController">
            <div id="gridContainer" dx-data-grid="dataGridOptions"></div>@{{pb}}
        </div>
    </div>
</div>

{{-- @endsection --}}
