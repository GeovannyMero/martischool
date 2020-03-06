
var  guardar = () => {
    debugger;
    var formInstance = $("#form-estudiante");
    //let datosEstudiante = JSON.parse($('#estudiante').val());
    let formEstudiante= $('#form-estudiante').serializeArray();
    let formRepresentantes = $("#gridContainer").dxDataGrid("getDataSource")._items;
    //console.log(datosEst);
    let estudiante =    {
        _token: formEstudiante[0].value,
        id: formEstudiante[1].value,
        cedula: formEstudiante[2].value,
        primerNombre: formEstudiante[3].value,
        segundoNombre: formEstudiante[4].value,
        primerApellido: formEstudiante[5].value,
        segundoApellido: formEstudiante[6].value,
        fechaNacimiento: formEstudiante[7].value,
        genero: formEstudiante[8].value,
        telefono: formEstudiante[9].value,
        direccion: formEstudiante[10].value,
        activo: formEstudiante[11].value,
        nacionalidad: formEstudiante[12].value,
        lugarNacimiento: formEstudiante[13].value,
        codigoMatricula: formEstudiante[14].value,
        fechaMatricula: formEstudiante[15].value,
        idCurso: formEstudiante[16].value,
        idParalelo: formEstudiante[17].value,
        representantes: [
            formRepresentantes
        ]
    }
    var dataToSend = {

            "_token": "{{ csrf_token() }}",
            estudiante: estudiante,


    }
    //alert(JSON.stringify(estudiante));
    //debugger;
    $.post('/estudiante/saveEstudiante', estudiante)
    .done(result => {
        console.log(result.mensaje);
        DevExpress.ui.notify(
            result.mensaje,
            "success",
            6000
        );
    })
    .fail(error => {
        console.log(error);
        DevExpress.ui.notify(err.data, "error", 6000);
    })
}

var cancelar = () => {
    window.location = '/estudiante';
}

//  $(function(){
//     var locale = getLocale();
//     Globalize.locale(locale);
//     console.log(locale);
//     sessionStorage.setItem("locale", es);
//     document.location.reload();
//  })
