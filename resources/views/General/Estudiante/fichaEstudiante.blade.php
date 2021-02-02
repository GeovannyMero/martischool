<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>

        .head{
            font-size: 15px;
            text-align: justify;
            left: 50%;

        }
        .contenedor{
            margin-top: 3px;

        }
        .contenedor p{
            font-size: 20px;
            background-color: #3c8dbc;
            display: inline;
            color: white;
            padding: 2px 5px 2px 5px;
            top: 20px;
        }
        .contenedorHijo{
            border: solid #3c8dbc 2px;
        }
        .body tr th{
            text-align: left;
            font-size: 16px;
        }
        .body tr td{
            text-align: left;
        }
    </style>
</head>
<body>
<div>
    <table style="width: 100%" class="head">
        <tr>
            <th>ESCUELA PARTICULAR</th>
        </tr>
        <tr>
            <th>JOSE MARTI</th>
        </tr>
        <tr>
            <th>FICHA ESTUDIANTIL</th>
        </tr>
        <tr>
            <th>AÑO LECTIVO 2021 - 2022</th>
        </tr>

    </table>
    <div class="contenedor">
        <p>Datos del Estudiante:</p>
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
        </div>

    </div>


</div>
</body>
</html>
