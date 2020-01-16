// angular.element(document).ready(function () {
//     //debugger;
//     document.getElementById('ob').innerHTML = 'Hello';
// });
// var DemoApp = angular.module('detalles', ['dx']);

// DemoApp.controller('detallesController', function detallesController($scope){

//     var informacionEstudiante = new DevExpress.data.CustomeStore({
//         load: () => {
//             return $http.post('/estudiante/getInformation/3')
//             .then(response => {
//                 debugger;
//                 return response.data;
//             })
//             .catch(error => {
//                 DevExpress.ui.notify(error.data, 'error', 5000);
//             })
//         }
//     });
// })
var  guardar = () => {
    debugger;
    var formInstance = $("#form-estudiante");

    //let datosEstudiante = JSON.parse($('#estudiante').val());
    let formEstudiante= $('#form-estudiante').serializeArray();
    //console.log(datosEst);
    let estudiante =    {
        id: datosEstudiante[0].id,
        codigo: datosEstudiante[0].codigo,
        cedula: formEstudiante[1].value,
        primerNombre: formEstudiante[2].value,
        segundoNombre: formEstudiante[3].value,
        primerApellido: formEstudiante[4].value
    }
    var dataToSend = {

            estudiante: estudiante,
            "_token": "{{ csrf_token() }}"

    }
    alert(JSON.stringify(estudiante));
    debugger;
    $.post('/estudiante/update/' + datosEstudiante[0].id, dataToSend)
    .done(result => {
        alert(result);
    })
    .fail(error => {
        alert(error);
    })
}

var cancelar = () => {
    window.location = '/estudiante';
}

