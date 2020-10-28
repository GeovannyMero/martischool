var appAdmin = angular.module("EscuelaAdministradorModule", ['dx']);

appAdmin.controller('administradoresController', function administradoresController($scope, $http){
    var idEscuela = $('#idEscuela').val();
    console.log(idEscuela);
    $scope.pb = 'dd';
    var administradores = new DevExpress.data.CustomStore({
        load: () => {
            return $http.post('/escuela/administradores/'+ idEscuela)
            .then(response => console.log(response))
            .catch(error => console.error(error));
        }
    })
});
$(function(){
    var IdEscuela = $('#idEscuela').val();
    debugger;
    $.ajax({
        type:'POST',
        url:'/escuela/administradores/' + IdEscuela,
        headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
        success:function(data){
           console.log(data);
        }
     });
    var administradores = new DevExpress.data.CustomStore({
        load: () => {
            return $.post('/escuela/administradores/' + IdEscuela)
            .done(response => console.log(response))
            .fail(error => console.error(error));
        }
    })

})
