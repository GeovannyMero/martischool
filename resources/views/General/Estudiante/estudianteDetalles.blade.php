@extends('layouts.layout')
@section('content')
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<link rel="stylesheet" type="text/css" href="{{ asset('DevExtreme/css/dx.spa.css')}}" />
<link rel="stylesheet" type="text/css" href="{{ asset('DevExtreme/css/dx.common.css')}}" />
<link rel="stylesheet" type="text/css" href="{{ asset('DevExtreme/css/dx.light.css')}}" />

<!--Angular -->
<script type="text/javascript" src="{{ asset('DevExtreme/js/angular.min.js')}}"></script>
<!--script-->
<script src="https://cdn3.devexpress.com/jslib/19.1.6/js/dx.all.js"></script>

<script type="text/javascript" src="{{ asset('js/estudiante/detallesEstudiante.js')}}"></script>
<link rel="stylesheet" type="text/css" href="{{ asset('css/general.css')}}" />



<div class="box box-primary" ng-app = 'App' ng-controller='appController'>
<input type="hidden" name="idEstudiante" id="idEstudiante" >
<input type="hidden" name="estudiante" id="estudiante" value="{{$estudiante}}">
    <div class="box-header with-border">
        <h3 class="box-title">Estudiante:
                @if(@count($estudiante) > 0)
                <strong>[{{$estudiante[0]['codigo']}}] {{$estudiante[0]['primerApellido']}}, {{$estudiante[0]['primerNombre']}}
                </strong>
                @endif
        </h3>
    </div>
    <div class="box-body" >
        <form action="" id="form-estudiante">
        @csrf
        <div class="nav-tabs-custom">
            <ul class="nav nav-tabs">
                <li class="active">
                    <a href="#tab_1" data-toggle="tab">General</a>
                </li>
                <li>
                    <a href="#tab_2" data-toggle="tab">Representantes</a>
                </li>
                <li>
                    <a href="#tab_3" data-toggle="tab">Periodo</a>
                </li>
            </ul>
            <div class="tab-content">
                <div class="tab-pane active" id="tab_1">
                        {{-- <div class="dx-field">
                                <div class="dx-field-label">Código</div>
                                <div class="dx-field-value">
                                    <div id="codigo"></div>
                                </div>
                        </div>

                        <div class="dx-field">
                                <div class="dx-field-label">Código</div>
                                <div class="dx-field-value">
                                    <div dx-text-box="textBox"></div>
                                <p>@{{textBox}}</p>
                                </div>
                        </div> --}}
                        <div id="form"></div>

                </div>
                <div class="tab-pane " id="tab_2">
                        <div id="gridContainer"></div>
                </div>
                <div class="tab-pane" id="tab_3"></div>
            </div>
        </div>
    </form>
    </div>
    <div class="box-footer">
        {{-- <button type="submit" class="btn btn-primary">Guardar</button> --}}
        <input type="button" value="Guardar" onclick="guardar()" class="btn btn-primary">
    </div>
</div>
@endsection
