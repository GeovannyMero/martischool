var app = angular.module('PermisoModule', ['dx']);

app.controller('title', function($scope, $http){
    $scope.modulo = 'Menús'
})

app.controller('permisoController', function($scope, $http){
    var permisos = new DevExpress.data.CustomStore({
        load: () => {
            return $http.post('/permiso/all')
            .then((response) => {
                console.log(response.data);
            })
            .catch((err) => {
                console.log(err);
            })
        }
    });

    //opciones
    $scope.treeListOptions = {
        dataSource: permisos,
       // keyExpr: "id",
        parentIdExpr: 'id_padre',
        columns: [
            {
                dataField: "id",
                caption: "ID"
            },
        "nombre", "link", "activo",
    ],

    }


});
