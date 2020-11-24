<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; chartset=utf-8" />
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Escuela Jose Marti</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <!-- <link rel="stylesheet" type="text/css" media="screen" href="main.css" />
    <script src="main.js"></script> -->

    <script src="{{ asset('js/jquery-3.3.1.min.js')}}"></script>
    <!--Referencia AdminLTE -->
    <link rel="stylesheet" href="{{ asset('Bootstrap/bootstrap.min.css')}}" />
    <link rel="stylesheet" href="{{ asset('font-awesome-4.7.0/css/font-awesome.min.css')}}" />
    {{-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css"> --}}
    <link rel="stylesheet" href="{{ asset('AdminLTE/dist/css/AdminLTE.min.css') }}" />
    <!-- <link rel="stylesheet" href="{{ asset('AdminLTE/dist/css/skins/_all-skins.min.css')}}" /> -->
    <link rel="stylesheet" href="{{ asset('AdminLTE/dist/css/skins/skin-blue.css')}}" />
    <link rel="stylesheet" href="{{ asset('plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css')}}"/>

    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic" />

</head>

<body class="hold-transition skin-blue sidebar-mini">
    <div class="wrapper">
        <header class="main-header">
            <a class="logo">
                <span class="logo-mini">SGA</span>
                <span class="logo-lg">SGA</span>
            </a>

            <nav class="navbar navbar-static-top">
                <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
                    <span class="sr-only">Toggle Navegation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </a>
                <div class="navbar-custom-menu">
                    <ul class="nav navbar-nav">
                        <li class="dropdown user user-menu">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                <img src="{{ asset('AdminLTE/dist/img/avatar5.png')}}" class="user-image" alt="User Image" />
                                <span class="hidden-xs">{{ Auth::user()->name }}</span>
                            </a>
                            <ul class="dropdown-menu">
                                <!--user image-->
                                <li class="user-header">
                                    <img src="{{ asset('AdminLTE/dist/img/avatar5.png')}}" class="user-image" alt="User Image" />
                                    <p>
                                    ROL
                                    <small>{{Auth::user()->getRolUser(Auth::user()->rol_id)}}</small>
                                    <small>Escuela{{Auth::user()->escuela_id}}</small>
                                    </p>
                                </li>
                                <li class="user-footer">
                                    <div class="pull-right">
                                        <a href="{{ route('logout') }}" class="btn btn-default btn-flat" onclick="event.preventDefault();
                                    document.getElementById('logout-form').submit();">{{ __('Logout') }}</a>
                                    <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                        @csrf
                                    </form>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>

        <aside class="main-sidebar">
            <section class="sidebar">
                <ul class="sidebar-menu" data-widget="tree">
                    <li class="header">Main Navegation</li>
                    <li class="treeview">
                        <a href="/home">
                            <i class="fa fa-dashboard"></i>
                            <span>Dashboard</span>
                            <span class="pull-right-container"></span>
                        </a>
                    </li>
                    <li>
                        <a href="/escuela">
                            <i class="fa fa-institution"></i>
                            <span>Escuela</span>

                        </a>
                    </li>
                    <!-- Seguridad -->
                    @if(Auth::user()->hasRol("Administrador"))
                    <li class="treeview">
                        <a href="#">
                            <i class="fa fa-cog"></i>
                            <span>Seguridad</span>
                            <span class="pull-right-container">
                                <i class="fa fa-angle-left pull right"></i>
                            </span>
                        </a>
                            <ul class="treeview-menu">

                                <li class="">
                                    <a href="{{ url('/rol')}}">
                                        <i class="fa fa-circle-o"></i>Rol
                                        <span class="pull-right-container"></span>
                                    </a>
                                </li>

                                <!--<li class="">
                                    <a href="{{ url('/estudiante')}}">
                                        <i class="fa fa-circle-o"></i>Estudiante
                                        <span class="pull-right-container"></span>
                                    </a>
                                </li>-->
                            </ul>
                    </li>
                    @endif
                    <!--Estudiante-->
                    @if(Auth::user()->hasRol("Profesor") || Auth::user()->hasRol("Administrador"))
                    <li>
                        <a href="/estudiante">
                            <i class="fa fa-users"></i>
                            <span>Estudiantes</span>

                        </a>
                    </li>
                    @endif
                    <!--Personal-->
                    @if(Auth::user()->hasRol("Administrador"))
                    <li>
                        <a href="{{ url('/personal')}}">
                            <i class="fa fa-users"></i>
                            <span>Personal</span>
                            <span class="pull-right-container"></span>
                        </a>
                    </li>
                    @endif
                    <!--Academico-->
                    @if(Auth::user()->hasRol("Administrador"))
                    <li class="treeview">
                        <a href="#">
                            <i class="fa fa-book"></i>
                            <span>Academico</span>
                            <span class="pull-right-container">
                                <i class="fa fa-angle-left pull right"></i>
                            </span>
                        </a>
                        <ul class="treeview-menu">
                            <li class="treeview menu-open">
                                <a href="#">
                                    <i class="fa fa-circle-o"></i>Administración Básica
                                    <span class="pull-right-container">
                                        <i class="fa fa-angle-left pull right"></i>
                                    </span>
                                </a>
                                <ul class="treeview-menu">
                                    <li class="">
                                    <a href="{{ url('/niveleducativo')}}">
                                            <i class="fa fa-circle-o"></i>Nivel Educativo

                                        </a>
                                    </li>
                                    <li class="">
                                        <a href="{{ url('/curso')}}">
                                            <i class="fa fa-circle-o"></i>Cursos

                                        </a>
                                    </li>
                                    <li class="">
                                        <a href="{{ url('/paralelo')}}">
                                            <i class="fa fa-circle-o"></i>Paralelos
                                        </a>
                                    </li>
                                    {{-- <li>
                                    <a href="{{ url('/personal')}}">
                                        <i class="fa fa-circle-o"></i>Profesor
                                    </a>
                                    </li> --}}
                                </ul>
                            </li><!--Fin Administracion basica-->
                            <li class="treeview menu-open">
                                <a href="#">
                                    <i class="fa fa-circle-o"></i>Administración Periodos
                                    <span class="pull-right-container">
                                        <i class="fa fa-angle-left pull right"></i>
                                    </span>
                                </a>
                                <ul class="treeview-menu">
                                    <li>
                                        <a href="{{ url('/periodos')}}">
                                            <i class="fa fa-circle-o"></i>Periodos Lectivos
                                        </a>
                                    </li>
                                    <li>
                                    <a href="{{url('/parciales')}}">
                                        <i class="fa fa-circle-o"></i>Parciales
                                    </a>
                                    </li>
                                    <li>
                                        <a href="{{ url('/planificacion')}}">
                                            <i class="fa fa-circle-o"></i>Planificación/Cursos
                                        </a>
                                    </li>
                                </ul>
                            </li><!--fin Administracion Periodo-->
                        </ul>
                    </li>
                    @endif
                    <!--Calificaciones-->
                    @if(Auth::user()->hasRol("Administrador"))
                    <li>
                        <a href="{{ url('/notas')}}">
                            <i class="fa fa-pencil"></i>
                            <span>Notas</span>
                            <span class="pull-right-container"></span>
                        </a>
                    </li>
                    @endif
                    <!--Reportes-->
                    @if(Auth::user()->hasRol("Profesor") || Auth::user()->hasRol("Administrador"))
                    <li class="treeview">
                        <a href="{{ url('/notas')}}">
                            <i class="fa fa-file-text-o"></i>
                            <span>Reportes</span>
                            <span class="pull-right-container"></span>
                        </a>
                    </li>
                    @endif
                    <!-- Parametros -->
                    @if(Auth::user()->hasRol("Administrador"))
                    <li>
                    <a href="{{url('/parametros')}}">
                            <i class="fa fa-pencil"></i>
                            <span>Parametros</span>
                            <span class="pull-right-container"></span>
                        </a>
                    </li>
                    @endif
                </ul>

            </section>
        </aside>
        <div class="content-wrapper">
            <div class="content" id="pages">
            @yield('content')<!--contenido-->
            </div>
        </div>

        <footer class="main-footer">
            <div class="pull-right hidden-xs">
            </div>
            <strong>Copyright</strong>
        </footer>
    </div>
    <script src="{{ asset('Bootstrap/js/bootstrap.min.js')}}"></script>
    <script src="{{ asset('plugins/slimScroll/jquery.slimscroll.min.js')}}"></script>
    <script src="{{ asset('plugins/fastclick/fastclick.min.js')}}"></script>
    <script src="{{ asset('AdminLTE/dist/js/adminlte.min.js')}}"></script>
    <script src="{{ asset('AdminLTE/dist/js/demo.js')}}"></script>
    <script src="{{ asset('plugins/pace/pace.min.js')}}"></script>

</body>
</html>
