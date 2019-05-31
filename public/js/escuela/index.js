var app = angular.module('EscuelaModule', ['dx']);

app.controller('escuelaController', function escuelaController($scope, $http){
    var escuela = new DevExpress.data.CustomStore({
        load: ()=>{
            return $http.post('/escuela/all')
            .then((response)=>{
                return response.data;
            }).catch((err)=>{
                console.log(err);
            })
        }
    });

    ///Option
    $scope.dataGridOptions = {
        dataSource: {
            store: escuela,
        },
    columnHidingEnabled: true,
    columnAutoWidth: true,
    column: [
        {
            dataField: 'id',

        },
        {
            dataField: 'name'
        }
    ],
        showBorders: true,
        filterRow: {
            visible: false
        },
        pager: {
            infoText: 'Página {0} de {1}',
            showInfo: true,
            showNavegationButtons: true,
            visible: true,
            ShowPageSizeSelector: true,
            allowedPageSize: [5,10,1]
        },
        paging: {
            enable: true,
            pageIndex: 0,
            pageSize: 5
        },
        searchPanel: {
            visible: true,
        },
        editing: {
            mode: 'form',
            allowAdding: true,
            allowUpdating: true,
        }
    }
})
