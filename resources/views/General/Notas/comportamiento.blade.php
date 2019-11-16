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
<script type="text/javascript" src="{{ asset('js/notas/detalles.js')}}"></script>
<link rel="stylesheet" type="text/css" href="{{ asset('css/general.css')}}" />
<style>
.column {
  float: left;
  width: 50%;
  padding: 10px;
  height: 300px; /* Should be removed. Only for demonstration */
}
.row:after {
  content: "";
  display: table;
  clear: both;
}
/* .dx-texteditor-input {
    text-align: center;

    font-weight: bold;
    /*font-size: 20px;*/
} */

</style>
<div class="box box-primary" ng-app='notasModule'>
    <div class="box-header with-border">
        <h3 class="box-title">Comportamiento</h3>
    </div>
    <div class="box-body" ng-controller='comportamientoController'>
    <input type="hidden" name="idCurso" id="idCurso" value="{{$idCurso}}">
    <div>@{{cantidadEstudiantes}}</div>
    <div dx-toolbar="toolbarOptions"></div>
    <div class="row">
    <div id="gridContainer" dx-data-grid="dataGridOptions"  class="column"></div>
    <div id="employeeInfo" ng-init="selectedEmployee"  class="column">
            {{-- <img class="employeePhoto" ng-src="{{selectedEmployee.Picture}}" /> --}}

            {{-- <p style='width: 50%'class="column">@{{selectedEmployee.primerNombre}}</p> --}}
            {{-- <div class="dx-field"> --}}
                {{-- <div class="dx-field-label">Default mode</div> --}}
                {{-- <div class="dx-field-value"> --}}
                    {{-- <div dx-text-box="@{{selectedEmployee.primerNombre}}"></div> --}}
                    <label for="calificacion" id="calificacion"></label>
                    <div id="nota"></div>
                    <div class="col-lg-7" style="padding-top: 20px">
                    {{-- <div>
                        <div class="box box-success">
                            <div class="box-header with-border">
                                <h3>detalles</h3>
                                <div class="box-tools pull-right">
                                    <button type="button" class="btn btn-box-tool" >
                                        <i class="fa fa-times"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="box-body">
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, ratione! Saepe cum facilis eaque rem dolores officia quibusdam quos illum aut, necessitatibus suscipit itaque reprehenderit eum veritatis corporis, quae eligendi.</p>
                            </div>
                        </div>
                    </div> --}}
                    <!--2 opcion-->
                    {{-- <div class="info-box bg-green">
                        <span class="info-box-icon">
                            <i class="fa fa-thumbs-up"></i>
                        </span>
                        <div class="info-box-content">
                            <span class="info-box-text">2019/10/01</span>
                            <span class="info-box-number">Respondio bien</span>
                        </div>
                    </div>

                    <div class="info-box bg-red">
                            <span class="info-box-icon">
                                <i class="fa fa-thumbs-down"></i>
                            </span>
                            <div class="info-box-content">
                                <span class="info-box-text">2019/11/14</span>
                                <span class="info-box-number">Golpeo a un compañero</span>
                            </div>
                        </div>
                </div> --}}
                <detalles-component param='Hello'></detalles-component>
                {{-- </div> --}}
            {{-- </div> --}}
            {{-- <div dx-text-box='selectedEmployee.primerNombre'></div> --}}
        </div>
    </div>
        <div id="detallesPopup"></div>
        <div id="notaPopup" >
            <div id="btnSave" dx-button="saveButtonConfig"></div>
        </div>

    </div>
</div>
@endsection
