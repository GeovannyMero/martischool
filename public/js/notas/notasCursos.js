appNotas.component('cursoComponent', {//TODO:Se tiene que agregar un loop para recorrer todos los cursos
    template: [
    // "<div class='row'><div class='col-lg-3 col-xs-3'>"+
    //     "<div class='small-box bg-red'>"+
    //         "<div class='class='inner'>"+
    //             "<h3>{{$ctrl.cursos.cantestudiante}}</h3>"+
    //             "<p>Estudiantes</p>"+
    //             "<p><strong>{{$ctrl.cursos.curso}} - {{$ctrl.cursos.paralelo}}</strong></p>"+
    //         "</div>"+
    //         "<div class='icon'>"+
    //             "<i class='fa fa-user'></i>"+
    //         "</div>"+
    //         "<a href='/notas/comportamiento/{{$ctrl.cursos.idCurso}}/{{$ctrl.cursos.idParalelo}}' class='small-box-footer'>Más información"+
    //             "<i class='fa fa-arrow-circle-right'></i>"+
    //         "</a>"+
    //     "</div>"+
    // "</div></div>"
    "<div ng-repeat='item in $ctrl.cursos'>"+
    "<div class='row'><div class='col-lg-3 col-xs-3'>"+
        "<div class='small-box bg-red'>"+
            "<div class='class='inner'>"+
                "<h3>{{item.cantestudiante}}</h3>"+
                "<p>Estudiantes</p>"+
                "<p><strong>{{item.curso}} - {{item.paralelo}}</strong></p>"+
            "</div>"+
            "<div class='icon'>"+
                "<i class='fa fa-user'></i>"+
            "</div>"+
            "<a href='/notas/comportamiento/{{item.idCurso}}/{{item.idParalelo}}' class='small-box-footer'>Más información"+
                "<i class='fa fa-arrow-circle-right'></i>"+
            "</a>"+
        "</div>"+
    "</div></div>"+
    "</div>"
    ].join(''),
    controller: function($http){
        var vm = this;
        $http.post('/notas/cursos')
        .then(response => {
            vm.cursos = response.data;
            console.log(response.data);
        })
        .catch(error => {
            alert(error);
        })
    }
})
