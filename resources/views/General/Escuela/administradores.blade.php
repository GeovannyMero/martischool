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
        <li class=''>Escuela</li>
        <li class='active'>Administradores</li>
    </ol>
</section>
</br>
</br>
<div class="box box-primary">
    <div class="box-header with-border">
        <h3 class="box-title">Administradores</h3>
    </div>
    <div class="box-body">

    </div>
</div>
@endsection
