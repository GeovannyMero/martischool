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
        },
        insert: (values) => {
            return $http.post('/planificacion/insert', values)
            .then((response) => {
                DevExpress.ui.notify(response.data['mensaje'], 'success', 5000);
            })
            .catch((err) => {
                DevExpress.ui.notify(err.data, 'error', 5000);
            })

        },
        update: (key, values) => {
            let id =  JSON.stringify(key['id']);
            if(id !== 0)
            {
                return $http.post('/planificacion/update/' + id, values)
                .then((response) => {
                    DevExpress.ui.notify(response.data['mensaje'], 'success', 5000);
                })
                .catch((err) => {
                    DevExpress.ui.notify(err.data, 'error', 5000);
                })
            }
        }
    });//Data Store

    //combos
    //curso
    var datosJson = new DevExpress.data.CustomStore({
        key: 'id',
        loadMode: 'raw',
        load: () => {
            return $http.post('/planificacion/prePlanificacion')
            .then((response) => {
                return response.data;
            }).catch((err) => {
                console.log(err.data);
            })
        }
    });
//Paralelo
var paralelos = new DevExpress.data.CustomStore({
    key: 'id',
    loadMode: 'raw',
    load: () => {
        return $http.post('/planificacion/paralelos')
        .then((response) => {
            return response.data;
        }).catch((err) => {
            console.log(err.data);
        })
    }
});
//Periodos
var periodos = new DevExpress.data.CustomStore({
    key: 'id',
    loadMode: 'raw',
    load: () => {
        return $http.post('/planificacion/periodos')
        .then((response) => {
            return response.data;
        }).catch((err) => {
            console.log(err.data);
        })
    }
});
//opciones
    $scope.dataGridOptions = {
        dataSource: {
            store: planificacion
        },
        rowAlternationEnabled: true,
        columnHidingEnabled: true,
       // columnAutoWidth: true,
       allowColumnResizing: true,
       columnResizingMode: 'widget',
        groupPanel: {
            visible: true
        },
        grouping: {
            autoExpandAll: false,
        },

        columns:
        [
            {
                dataField: 'id',
                caption: 'ID',
                width: 50,
                visible: false
            },
            {
                dataField: 'id_periodo',
                caption: 'Periodo',
                width: 120,
                lookup: {
                    dataSource: periodos,
                    displayExpr: data => data.periodo_inicio + " - " + data.periodo_fin,
                    valueExpr: 'id',

                },
                validationRules: [
                    {
                        type: 'required',
                        message: 'El nombre es requerido'
                    }
                ]

            },
            {
                dataField: 'id_curso',
                caption: 'Curso',
                groupIndex: 0,
                lookup: {
                    dataSource: datosJson,
                    displayExpr: data => data.nombre,
                    valueExpr: 'id'
                },
                validationRules: [
                    {
                        type: 'required',
                        message: 'El nombre es requerido'
                    }
                ]

            },
            {
                dataField: 'id_paralelo',
                caption: 'Paralelo',
                lookup: {
                    dataSource: paralelos,
                    displayExpr: data => data.nombre,
                    valueExpr: 'id'
                },
                width: 70,
                validationRules: [
                    {
                        type: 'required',
                        message: 'El nombre es requerido'
                    }
                ]
            },
            {
                dataField: 'activo',
                caption: 'Activo',
                width: 80
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
