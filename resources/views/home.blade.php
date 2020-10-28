@extends('layouts.layout')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Dashboard</div>

                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif

                    You are logged in!
                    <div class="row">
                    <div col-md-3 col-sm-6 col-xs-12>
                        <div class="info-box">
                            <span class="info-box-icon bg-aqua">
                                <i class="fa fa-envelope-o"></i>
                            </span>
                            <div class="info-box-content">
                                <span class="info-box-text">Cursos</span>
                                <span class="info-box-number">10</span>
                            </div>

                        </div>
                    </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>
@endsection
