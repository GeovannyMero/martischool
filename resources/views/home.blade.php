@extends('layouts.layout')

@section('content')

{{--<script type="text/javascript" src="{{ asset('js/Home/Index.js')}}"></script>--}}
<section class="content-header">
    <h1>Dashboard</h1>
    <ol class="breadcrumb">
        <li>
            <a href="/home">
                <i class="fa fa-dashboard"></i>Home
            </a>
        </li>
        <li class='active'>
            Dashboard
        </li>
    </ol>
</section>
</br>
<div class="container">
    <div class="row">
        <div class="col-md-3 col-sm-6 col-xs-12">
            <div class="info-box">
                <span class="info-box-icon bg-aqua">
                    <i class="fa fa-graduation-cap"></i>
                </span>
                <div class="info-box-content">
                    <span class="info-box-text">Total de Cursos</span>
                    {{--<span class="info-box-number">{{ $totalCursos }}</span>--}}
                </div>
            </div>
        </div>
        <div class="col-md-3 col-sm-6 col-xs-12">
            <div class="info-box">
                <span class="info-box-icon bg-green-active">
                    <i class="fa fa-users"></i>
                </span>
                <div class="info-box-content">
                    <span class="info-box-text">Personal Educativo</span>
                    {{--<span class="info-box-number">{{ $personal }}</span>--}}
                </div>
            </div>
        </div>
        <div class="col-md-3 col-sm-6 col-xs-12">
            <div class="info-box">
                <span class="info-box-icon bg-yellow-active">
                    <i class="fa fa-clock-o"></i>
                </span>
                <div class="info-box-content">
                    <span class="info-box-text">Periodo Lectivo</span>
                    {{--<span class="info-box-number">{{ $periodoActual->periodo_inicio }}</span>--}}
                </div>
            </div>
        </div>
        <div class="col-md-3 col-sm-6 col-xs-12">
            <div class="info-box">
                <span class="info-box-icon bg-red-active">
                    <i class="fa fa-calendar-check-o"></i>
                </span>
                <div class="info-box-content">
                    <span class="info-box-text">Fecha</span>
                    <span class="info-box-number">{{ date('d-M-Y') }}</span>
                </div>
            </div>
        </div>
    </div>
{{--    <div class="row justify-content-center">--}}
{{--        <div class="col-md-8">--}}
{{--            <div class="card">--}}
{{--                <div class="card-header">Dashboard</div>--}}

{{--                <div class="card-body">--}}
{{--                    @if (session('status'))--}}
{{--                        <div class="alert alert-success" role="alert">--}}
{{--                            {{ session('status') }}--}}
{{--                        </div>--}}
{{--                    @endif--}}

{{--                    You are logged in!--}}
{{--                    <div class="row">--}}
{{--                        <div class="col-md-3 col-sm-6 col-xs-12">--}}
{{--                            <div class="info-box">--}}
{{--                                <span class="info-box-icon bg-aqua">--}}
{{--                                    <i class="fa fa-envelope-o"></i>--}}
{{--                                </span>--}}
{{--                                <div class="info-box-content">--}}
{{--                                    <span class="info-box-text">Cursos</span>--}}
{{--                                    <span class="info-box-number">{{ $totalCursos }}</span>--}}
{{--                                </div>--}}
{{--                            </div>--}}
{{--                        </div>--}}
{{--                        <div class="col-md-3 col-sm-6 col-xs-12">--}}
{{--                            <div class="info-box">--}}
{{--                                <span class="info-box-icon bg-green-active">--}}
{{--                                    <i class="fa fa-user"></i>--}}
{{--                                </span>--}}
{{--                                <div class="info-box-content">--}}
{{--                                    <span class="info-box-text">Personal</span>--}}
{{--                                    <span class="info-box-number">{{ $personal }}</span>--}}
{{--                                </div>--}}
{{--                            </div>--}}
{{--                        </div>--}}
{{--                    </div>--}}

{{--                </div>--}}
{{--            </div>--}}
{{--        </div>--}}
{{--    </div>--}}
</div>
@endsection
