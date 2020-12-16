@extends('layouts.app')

@section('content')
<body class="hold-transition login-page">
<div class="login-box">
    @if ( session('error'))
        <div class="callout callout-danger" role="alert">
            <button class="close" type="button" data-dismiss="alert" aria-hidden="true">x</button>
            <h4>
                <i class="fa fa-warning"></i>
                Alerta!
            </h4>
            {{ session('error') }}
        </div>
    @endif
    <div class="login-logo">
        <a href="#">Marti<b>School</b></a>
    </div>
    <div class="login-box-body">
        <div class="login-box-msg">Ingresar al Sistema</div>
        <form method="POST" action="{{ route('login') }}">
            @csrf
            <div class="form-group has-feedback">
                <input id="email" type="email" class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }}" name="email" value="{{ old('email') }}" required autofocus placeholder='Correo Electrónico'>

                @if ($errors->has('email'))
                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $errors->first('email') }}</strong>
                                    </span>
                @endif
                <span class="fa fa-envelope form-control-feedback"></span>
            </div>
            <div class="form-group has-feedback">
                <input id="password" type="password" class="form-control{{ $errors->has('password') ? ' is-invalid' : '' }}" name="password" required placeholder="Contraseña">

                @if ($errors->has('password'))
                    <span class="invalid-feedback" role="alert">
                                        <strong>{{ $errors->first('password') }}</strong>
                                    </span>
                @endif
                <span class="fa fa-lock form-control-feedback"></span>
            </div>
            <div class="row">
                <div class="col-xs-8">
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>

                        <label class="form-check-label" for="remember">
                            {{ __('Recordar Contraseña') }}
                        </label>
                    </div>
                </div>
                <div class="col-xs-4">
                    <button type="submit" class="btn btn-primary">
                        {{ __('Ingresar') }}
                    </button>
                </div>
            </div>
        </form>
    </div>
</div>
</body>

@endsection
<script type="text/javascript">
    window.setTimeout(function() {
        $(".callout").fadeTo(500, 0).slideUp(500, function(){
            $(this).remove();
        });
    }, 3000);
</script>
