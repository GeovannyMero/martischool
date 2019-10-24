appNotas.controller('comportamientoController', function comportamientoController($http){
    debugger;
    let idCurso = document.getElementById('idCurso').value;
    var vm = this;
    vm.estudiantesPorCurso = $http.post('/notas/comportamientoPorCurso/'+idCurso)
    .then(response => {
        console.log(response.data);
        return response.data;
    })
    .catch(error => {
        alert(error);
    })

})
