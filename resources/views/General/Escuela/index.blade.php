@extends('layouts.layout')
@section('content')

<link rel="stylesheet" type="text/css" href="{{ asset('DevExtreme/css/dx.spa.css')}}" />
<link rel="stylesheet" type="text/css" href="{{ asset('DevExtreme/css/dx.common.css')}}" />
<link rel="stylesheet" type="text/css" href="{{ asset('DevExtreme/css/dx.light.compact.css')}}" />

<!--Angular -->
<script type="text/javascript" src="{{ asset('DevExtreme/js/angular.min.js')}}"></script>
<!--script-->
<script type="text/javascript" src="{{ asset('DevExtreme/js/dx.all.js')}}"></script>

<script type="text/javascript" src="{{ asset('js/escuela/index.js')}}"></script>

<link rel="stylesheet" type="text/css" href="{{ asset('css/general.css')}}" />

<section class="content-header">
    <ol class="breadcrumb">
        <li>
            <a href="/home">
                <i class="fa fa-dashboard"></i>Dashboard
            </a>
        </li>
        <li class='active'>
           Escuelas

        </li>
    </ol>
</section>
</br>
</br>
<div class="box box-primary" ng-app='EscuelaModule' ng-controller='title'>
    <div class="box-header with-border">
        <h3 class="box-title">@{{modulo}}</h3>
    </div>
    <div class="box-body">
        <div class="gridEscuela demo-containder"  ng-controller='escuelaController'>
            <div id="gridContainer" dx-data-grid="dataGridOptions"></div>
            <!--POPUP-->
            <div >
                <div dx-popup="popupOptions">
                    <div data-options="dxTemplate: { name:'info' }">
                        <p>
                            {{-- Full Name:
                            <span>{{currentEmployee.id}}</span> --}}

                        </p>

                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="popup">
        <div id="form_admin"></div>
    </div>

</div>
<script id="administrador" type="text/html">
    <div class="popup-property-details">

        <div id="favorites" class="favorites"></div>

    </div>
</script>
@endsection
