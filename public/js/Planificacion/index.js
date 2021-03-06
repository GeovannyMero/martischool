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
           // debugger;
            return $http.post('/planificacion/insert', values)
            .then((response) => {
                DevExpress.ui.notify({
                    message: response.data['mensaje'],
                    position: {
                        my: 'center top',
                        at: 'center top',
                        offset: '50 60'

                    },
                    width: 400,

                }, 'success', 3000)
            })
            .catch((err) => {
                console.log(err);
                DevExpress.ui.notify(err.data, 'error', 5000);
            })

        },
        update: (key, values) => {
            let id =  JSON.stringify(key['id']);
            if(id !== 0)
            {
                return $http.post('/planificacion/update/' + id, values)
                .then((response) => {
                    DevExpress.ui.notify({
                        message: response.data['mensaje'],
                        position: {
                            my: 'center top',
                            at: 'center top',
                            offset: '50 60'

                        },
                        width: 400,

                    }, 'success', 3000)
                })
                .catch((err) => {
                    DevExpress.ui.notify(err.data, 'error', 5000);
                })
            }
        },
        remove: (key) => {

            let id = key.id;
            if(id > 0)
            {
                return $http.post('/planificacion/remove/' + id)
                .then((response) => {
                    DevExpress.ui.notify({
                        message: response.data['mensaje'],
                        position: {
                            my: 'center top',
                            at: 'center top',
                            offset: '50 60'

                        },
                        width: 400,

                    }, 'success', 3000)
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
                dataField: 'curso_id',
                caption: 'Curso',
                //groupIndex: 0,
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
                dataField: 'paralelo_id',
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
                width: 80,
                dataType: 'boolean'
            }

        ],
        summary: {
            totalItems: [{
                column: "id_periodo",
                summaryType: "count",
                displayFormat: 'Total: {0}'
            }]
        },
        showBorders: true,
        filterRow: {
            visible: true
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
        // selection: {
        //     mode: "multiple"
        // },
        editing: {
            mode: 'batch',
            allowAdding: true,
            allowUpdating: true,
            allowDeleting: true,
            useIcons: true,
            texts: {
                saveRowChanges: 'Guardar',
                cancelRowChanges: 'Cancelar',
                confirmDeleteTitle: 'Eliminar Registro',
                confirmDeleteMessage: '¿Desea eliminar el registro?',
                addRow: 'Nuevo',
                editRow: 'Editar',
                deleteRow: 'Eliminar'
            },
        }
    }
});
