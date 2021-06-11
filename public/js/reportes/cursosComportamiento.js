app.component("cursosComponet", {
    template: [
        "<div ng-if='$ctrl.cursos.length > 0'>" +
            "<div class='row'>"+
                "<div ng-repeat='item in $ctrl.cursos'>" +
                    "<div class='col-lg-3 col-xs-3'>" +
                        "<div class='small-box bg-primary'>" +
                            "<div class='inner'>" +
                                "<h3>{{item.cantestudiante}}</h3>" +
                                "<p>Estudiantes</p>" +
                                "<p><strong>{{item.curso}} - {{item.paralelo}}</strong></p>" +
                            "</div>"+
                            "<div class='icon'>" +
                                "<i class='fa fa-user'></i>" +
                            "</div>" +
                                "<a ng-if='item.cantestudiante > 0' href='/informe/comportamiento/{{item.idCurso}}/{{item.idParalelo}}' class='small-box-footer'>Ingresar " +
                                    "<i class='fa fa-arrow-circle-right'></i>" +
                                "</a>" +
                                "<div ng-if='item.cantestudiante == 0' class='small-box-footer'><p>Sin Estudiantes</p></div>"+
                        "</div>"+
                    "</div>"+
                "</div>"+
            "</div>"+
        "</div>"+
        "<div ng-if='$ctrl.cursos.length == 0'>" +
            "<div class='alert alert-warning alert-dismissible'>" +
                "<button class='close' type='button' data-dismiss='alert' aria-hidden='true'>x</button>" +
                "<h4>" +
                    "<i class='fa fa-warning'></i> Alerta!" +
                "</h4>" +
                "No existe curso para el periodo" +
            "</div>" +
        "</div>"
    ].join(""),
    controller: function ($http) {
        var vm = this;
        $http.post('/notas/cursos')
            .then(response => {
                console.log(response.data);
                vm.cursos = response.data;
            })
            .catch(error => {
                console.error(error);
            })
    }
});

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

