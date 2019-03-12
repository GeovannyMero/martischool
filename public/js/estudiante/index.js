var app = angular.module('App', ['dx']);

app.controller('appController', function estudianteController($scope, $http){
    var estudiantes = new DevExpress.data.CustomStore({
        load: function(){
            return $http.get('/estudiante/all')
            .then(function(response){
                return response.data;
            }, function(response){
                alert(response.data);
            });
        }

    });

    $scope.dataGridOptions = {
        dataSource: {
            store: estudiantes
        },
        columns:[
            {
                dataField: 'id'
            }
        ], 
        showBorders: true,
        filterRow: {
            visible: false,
        },
        pager: {
            infoText: 'Pagina {0} de {1}',
            showInfo: true,
            showNavegationButtons: true,
            visible: true,
            showPageSizeSelector: true,
            allowedPageSizes: [5,10,15]
        },
        paging: {
            enable: true,
            pageIndex: 0,
            pageSize: 10
        }, 
        searchPanel: {
            visible: true
        }, 
        editing:{
            mode: 'form',
            allowAdding: true,
            useIcons: true,
            texts: {
                saveRowChanges: 'Guardar',
                cancelRowChnages: 'Cancelar'
            }
        }
    }
});