
var  guardar = () => {
    debugger;
    var formInstance = $("#form-estudiante");
    //let datosEstudiante = JSON.parse($('#estudiante').val());
    let formEstudiante= $('#form-estudiante').serializeArray();
    let formRepresentantes = $("#gridContainer").dxDataGrid("getDataSource")._items;
    console.log(formEstudiante);
    let estudiante =    {
        _token: formEstudiante[0].value,
        //id: formEstudiante[1].value,
        cedula: formEstudiante[1].value,
        primerNombre: formEstudiante[2].value,
        segundoNombre: formEstudiante[3].value,
        primerApellido: formEstudiante[4].value,
        segundoApellido: formEstudiante[5].value,
        fechaNacimiento: formEstudiante[6].value,
        genero: formEstudiante[7].value,
        telefono: formEstudiante[8].value,
        direccion: formEstudiante[9].value,
        activo: formEstudiante[10].value,
        nacionalidad: formEstudiante[11].value,
        lugarNacimiento: formEstudiante[12].value,
        codigoMatricula: formEstudiante[13].value,
        fechaMatricula: formEstudiante[14].value,
        idCurso: formEstudiante[15].value,
        idParalelo: formEstudiante[16].value,
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
            DevExpress.ui.notify(
            result.mensaje,
            "success",
            6000
        );
        window.location = '/estudiante';
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
