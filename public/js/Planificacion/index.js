var app = angular.module('planificacionModule', ['dx']);

app.controller('title', function title($scope){
    $scope.modulo = 'Planificación de Cursos';
});


app.controller('planificacionController', function planificacionController($scope, $http){
    var planificacion = new DevExpress.data.CustomStore({
        load: () => {
            return $http.post('/planificacion/all')
            .then((response) => {
                console.log(response.data);
                return response.data;
            })
            .catch((err) => {
                DevExpress.ui.notify(err.data, 'error', 5000);
            })
        }
    });//Data Store

    //combos
    var datosJson = new DevExpress.data.CustomStore({
        key: 'id',
        loadMode: 'raw',
        load: () => {
            return $http.post('/planificacion/prePlanificacion')
            .then((response) => {
                var datos = response.data;
                return datos;
            }).catch((err) => {
                console.log(err.data);
            })
        }
    });

    $scope.dataGridOptions = {
        dataSource: {
            store: planificacion
        },
        rowAlternationEnabled: true,
        columnHidingEnabled: true,
        columnAutoWidth: true,
        columns:
        [
            {
                dataField: 'id',
                caption: 'ID',
                width: 50
            },
            {
                dataField: 'id_periodo',
                caption: 'Periodo',
                lookup: {
                    dataSource: datosJson,
                    displayExpr: data => data.periodo_inicio + " - " + data.periodo_fin,
                    valueExpr: 'id'
                }
            },
            {
                dataField: 'id_curso',
                caption: 'Curso'
            },
            {
                dataField: 'id_paralelo',
                caption: 'Paralelo'
            },
            {
                dataField: 'activo',
                caption: 'Activo'
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
            showPageSizeSelector: true,
            allowedPagesSizes: [5,10,15]

        },
        paging: {
            enable: true,
            pageIndex: 0,
            pageSize: 5
        },
        searchPanel: {
            visible: true,
            placeholder: 'Buscar'
        },
        selection: {
            mode: "multiple"
        },
        editing: {
            mode: 'batch',
            allowAdding: true,
            allowUpdating: true,
            useIcons: true
        }
    }
});
