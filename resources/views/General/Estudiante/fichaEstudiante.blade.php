<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>

        .head {
            font-size: 15px;
            text-align: justify;
            left: 50%;

        }

        .contenedor {
            margin-top: 3px;

        }

        .contenedor p {
            font-size: 20px;
            background-color: #3c8dbc;
            display: inline;
            color: white;
            padding: 2px 5px 2px 5px;
            top: 20px;
        }

        .contenedorHijo {
            border: solid #3c8dbc 2px;
        }

        .body tr th {
            text-align: left;
            font-size: 16px;
        }

        .body tr td {
            text-align: left;
        }
    </style>
</head>
<body>
<div>
    <!--CABECERA-->
    <div>
        <table style="width: 100%;" class="head">
            <tr style="text-align: center">
                <th style="color:black; font-size: 22px;">ESCUELA PARTICULAR "JOSÉ MARTI"</th>
            </tr>
            <tr style="">
                <td style="text-align: center;">Dirección:</td>
            </tr>
            <tr style="padding: 0">
                <td style="text-align: center;">Teléfono:</td>
            </tr>
            <tr>
                <td style="text-align: center;">Email: <a href="#">josemarti@gmail.com</a></td>
            </tr>
            <tr style="text-align: center;">
                <th style="font-size: 18px">FICHA ESTUDIANTIL</th>
            </tr>
            <tr style="text-align: center;">
                <th style="font-size: 14px">AÑO LECTIVO 2021 - 2022</th>
            </tr>
        </table>
    </div>
    <!--CUERPO-->
    <div class="contenedor">
        <table style="width: 100%;">
            <tr>
                <th colspan="4" style="font-size: 16px">DATOS DEL ESTUDIANTE:</th>
            </tr>
            <tr>
                <th style="width: 25px">Identificación:</th>
                <td>{{ $data[0]["cedula"] }}</td>
            </tr>
            <tr>
                <th colspan="2" style="width: 25%">Apellido paterno:</th>
                <td style="width: 25%">{{ $data[0]["primerApellido"] }}</td>
                <th colspan="2" style="width: 25%">Apellido materno:</th>
                <td style="width: 25%">{{ $data[0]["segundoApellido"] }}</td>
            </tr>
            <tr>
                <th>Nombres:</th>
                <td colspan="2">{{ $data[0]["primerNombre"] . " " . $data[0]["segundoNombre"] }}</td>
                <th>Nacionalidad:</th>
                <td>{{ $data[0]["nacionalidad"] }}</td>
            </tr>
            <tr>
                <th colspan="2">Lugar de nacimiento:</th>
                <td>{{ $data[0]["lugarNacimiento"] }}</td>
                <th colspan="2">Fecha de nacimiento:</th>
                <td colspan="2">{{ $data[0]["fechaNacimiento"] }}</td>
            </tr>
        </table>
        <!-- <p>Datos del Estudiante:</p>
         <div class="contenedorHijo">
             <table style="width: 100%" class="body">
                 <tr style="border: 1px solid red">
                     <th style="width: 155px">Apellidos y Nombres:</th>
                     <td colspan="4">Mero Baque Geovanny Jefferson</td>
                 </tr>
                 <tr>
                     <th>Cédula:</th>
                     <td>0931254569</td>
                     <th colspan="2">Grado Básico o Bachillerato:</th>
                     <td colspan="3"> 1er año de eduación básica</td>
                 </tr>
                 <tr>
                     <th>Fecha de Nacimiento: </th>
                     <td>19/11/1993</td>
                     <th>Nacionalidad: </th>
                     <td>Ecuatoriano</td>
                 </tr>
                 <tr>
                     <th colspan="2">Dirección del Domicilio: </th>
                     <td colspan="2">Fragata Mz 40 V7</td>
                 </tr>
                 <tr>
                     <th colspan="3">A quién llamar en caso de emergencia: </th>
                     <td colspan="3">Gissell Johanna Robles Balaz</td>
                 </tr>
                 <tr>
                     <th>Teléfono: </th>
                     <td>09677869571</td>
                     <th>Parentesco: </th>
                     <td>Madre</td>
                     <th colspan="3">Dirección de Domicilio: </th>
                     <td>Fragata</td>
                 </tr>

             </table>
         </div>-->

    </div>
    <!--FAMILIARES-->
    <br>
    <div id="familiares">
        <table style="width: 100%;">
            <tr>
                <th colspan="4">DATOS DE FAMILIARES:</th>
            </tr>
            @if(count($data[0]["representantes"]) > 0)
                @foreach($data[0]["representantes"] as $item)
                    <tr>
                        <th style="width: 10%;">Identificación:</th>
                        <td colspan="2" style="width: 25%">{{ $item["identificacion"] }}</td>
                        <th colspan="2" style="width: 10%">Parentesco:</th>
                        <td>Madre</td>
                    </tr>
                    <tr>
                        <th>Apellidos:</th>
                        <td colspan="2">{{ $item["apellidos"] }}</td>
                        <th>Nombre:</th>
                        <td colspan="2">{{ $item["nombre"] }}</td>
                    </tr>
                    <tr>
                        <th>Celular:</th>
                        <td colspan="2">{{ $item["telefonoMovil"] }}</td>
                        <th>Fijo:</th>
                        <td>{{ $item["telefonoFijo"] }}</td>
                    </tr>
                    <tr>
                        <th>Correo:</th>
                        <td><a href="#">{{ $item["correo"] }}</a></td>
                    </tr>
                @endforeach
            @endif
        </table>
    </div>
</div>
</body>
</html>
