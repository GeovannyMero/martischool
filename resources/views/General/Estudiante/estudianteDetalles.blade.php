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
<script type="text/javascript" src="{{ asset('js/localization/dx.messages.es.js')}}"></script>

<script type="text/javascript" src="{{ asset('js/estudiante/detallesEstudiante.js')}}"></script>
<link rel="stylesheet" type="text/css" href="{{ asset('css/general.css')}}" />
<script>
//  $(function(){
//     var locale = getLocale();
//     Globalize.locale(locale);
//     console.log(locale);
//     sessionStorage.setItem("locale", es);
//     document.location.reload();
 //})
</script>
<div class="box box-primary" ng-app = 'App' ng-controller='appController'>
    <input type="hidden" name="idEstudiante" id="idEstudiante" >
    <input type="hidden" name="estudiante" id="estudiante" value="{{$estudiante}}">
        <div class="box-header with-border">
            <h3 class="box-title"><span><i class="fas fa-user-graduate"></i></span> Estudiante:
                    @if(@count($estudiante) > 0)
                    <strong>[{{$estudiante[0]['codigo']}}] {{$estudiante[0]['primerApellido']}}, {{$estudiante[0]['primerNombre']}}
                    </strong>
                    @endif
            </h3>
        </div>
        <div class="box-body" >
            <form action="/estudiante/saveEstudiante" id="form-estudiante" method="post">
            @csrf
            <div class="nav-tabs-custom">
                <ul class="nav nav-tabs">
                    <li class="active">
                        <a href="#tab_1" data-toggle="tab"><i class="fa fa-user"></i> General</a>
                    </li>
                    <li>
                        <a href="#tab_2" data-toggle="tab"><i class="fa fa-info-circle"></i> Información Adicional</a>
                    </li>
                    <li>
                        <a href="#tab_3" data-toggle="tab"><i class="fa fa-users"></i> Representantes</a>
                    </li>
                    <li>
                        <a href="#tab_4" data-toggle="tab"><i class="fa fa-calendar"></i> Periodo</a>
                    </li>
                </ul>
                <div class="tab-content">
                    <div class="tab-pane active" id="tab_1">
                            <div id="form"></div>
                    </div>
                    <div class="tab-pane " id="tab_2">
                        <div id="form_info_adicional"></div>
                </div>
                    <div class="tab-pane " id="tab_3">
                            <div id="gridContainer"></div>
                    </div>
                    <div class="tab-pane" id="tab_4">
                        <div id="periodos"></div>
                    </div>
                </div>
            </div>
        </form>
        </div>
        <div class="box-footer">
            {{-- <button type="submit" class="btn btn-primary">Guardar</button> --}}
            {{-- <input type="button" value="Guardar" onclick="guardar()" class="btn btn-primary"> --}}
            <div id="guardar"></div>
            <input type="button" value="Cancelar" onclick="cancelar();" class="btn btn-danger">
        </div>
    </div>

<script>

</script>

@endsection
