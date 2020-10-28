@extends('layouts.layout')
@section('content')

<link rel="stylesheet" type="text/css" href="{{ asset('DevExtreme/css/dx.spa.css')}}" />
<link rel="stylesheet" type="text/css" href="{{ asset('DevExtreme/css/dx.common.css')}}" />
<link rel="stylesheet" type="text/css" href="{{ asset('DevExtreme/css/dx.light.compact.css')}}" />

<!--Angular -->
<script type="text/javascript" src="{{ asset('DevExtreme/js/angular.min.js')}}"></script>
<!--script-->
<script type="text/javascript" src="{{ asset('DevExtreme/js/dx.all.js')}}"></script>

<script type="text/javascript" src="{{ asset('js/parciales/index.js')}}"></script>
<script type="text/javascript" src="{{ asset('js/parciales/parcial.js')}}"></script>

<link rel="stylesheet" type="text/css" href="{{ asset('css/general.css')}}" />

<section class="content-header">
    <ol class="breadcrumb">
        <li>
            <a href="/home">
                <i class="fa fa-dashboard"></i>Dashboard
            </a>
        </li>
        <li class='active'>
           Parciales
        </li>
    </ol>
</section>
</br>
</br>

<div class="box box-primary" ng-app='parcialModule' ng-controller='title'>
    <div class="box-header with-border">
        <h3 class="box-title">@{{modulo}}</h3>
    </div>
    <div class="box-body">
        <div class="gridRol demo-containder"  ng-controller='parcialController'>
        <div id="gridContainer" dx-data-grid="dataGridOptions"></div>
        </div>
    </div>

</div>

@endsection
