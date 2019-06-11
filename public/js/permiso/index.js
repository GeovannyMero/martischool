var app = angular.module('PermisoModule', ['dx']);

app.controller('title', function($scope, $http){
    $scope.modulo = 'Menús'
})

app.controller('permisoController', function($scope, $http){
    $scope.treeListOptions = {
        dataSource: {
            load: function(){
                return $http.post('/permiso/all')
                .then((response) => {
                    return response.data;
                }).catch((err) => {
                    console.log(err);
                })

            }
        },
        //remoteOperations: {
        //    filtering: true
       // },
        keyExpr: 'id',
        parentIdExpr: 'id_padre',
        //rootValue: '',
        showBorders: true,
        columns: [
            {
                dataField: 'id',
                caption: 'Id',
                width: 50
            },
            {
                dataField: 'nombre',
                caption: 'Nombre',

            },
            {
                dataField: 'link',
                caption: 'Link',
                width: 150
            },
            {
                dataField: 'activo',
                caption: 'Estado',
                width: 70
            }
        ],
        editing: {
            mode: 'row',
            allowUpdating: true,
            allowDeleting: true,
            allowAdding: true,
            useIcons: true
        }
    }

});
