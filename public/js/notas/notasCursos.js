appNotas.component('cursoComponent', {
    template: [
    "<div class='row'><div class='col-lg-3 col-xs-3'>"+
        "<div class='small-box bg-red'>"+
            "<div class='class='inner'>"+
                "<h3>{{$ctrl.cursos[0].cantestudiante}}</h3>"+
                "<p>Estudiantes</p>"+
                "<p><strong>{{$ctrl.cursos[0].curso}} - {{$ctrl.cursos[0].paralelo}}</strong></p>"+
            "</div>"+
            "<div class='icon'>"+
                "<i class='fa fa-user'></i>"+
            "</div>"+
            "<a href='/notas/comportamiento/{{$ctrl.cursos[0].idCurso}}/{{$ctrl.cursos[0].idParalelo}}' class='small-box-footer'>Más información"+
                "<i class='fa fa-arrow-circle-right'></i>"+
            "</a>"+
        "</div>"+
    "</div></div>"
    ].join(''),
    controller: function($http){
        var vm = this;
        $http.post('/notas/cursos')
        .then(response => {
            vm.cursos = response.data;
        })
        .catch(error => {
            alert(error);
        })
    }
})
