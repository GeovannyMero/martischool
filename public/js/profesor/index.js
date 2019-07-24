var app = angular.module('profesorModule',['dx']);

app.controller('title', function title($scope){
    $scope.modulo = 'Profesor';
});

app.controller('profesorController', function profesorController($http, $scope){
var rol  = new DevExpress.data.CustomStore({
    load: () => {
        return $http.post('/profesor/rol')
        .then((response) => {
            return response.data;
        })
        .catch((err) => {
            DevExpress.ui.notify(err.data, 'error',5000);
        })
    }
});

    var profesores = new DevExpress.data.CustomStore({
        load: () => {
            return $http.post('/profesor/all')
            .then((response) => {
                return response.data;
            })
            .catch((err) => {
                DevExpress.ui.notify(err.data, 'error',5000);
            })
        }
    });

    $scope.dataGridOptions = {
        dataSource: {
            store: profesores
        },
        rowAlternationEnabled: true,
        columnHidingEnabled: true,
        columnAutoWidth: true,
        columns: [
            {
                dataField: 'id',
                caption: 'ID',
                width: 50
            },
            {
                dataField: 'cedula',
                caption : 'Cédula',
                validationsRules: {
                    type: 'required',
                    message: 'El campo es requerido'
                }
            },
            {
                dataField: 'nombre',
                caption: 'Nombre'
            },
            {
                dataField: 'apellidos',
                caption: 'Apellidos'
            },
            {
                dataField: 'id_rol',
                caption: 'Rol',
                lookup: {
                    dataSource: rol,
                    displayExpr: data => data.nombre,
                    valueExpr: 'id'
                }
            },
            {
                dataField: 'correo',
                caption: 'Correo'
            },
            {
                dataField: 'activo',
                caption: 'Activo',

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
        editing : {
            mode: 'form',
            allowAdding: true,
            allowUpdating: true,
            useIcons: true,
            texts: {
                saveRowChanges: 'Guardar',
                cancelRowChanges: 'Cancelar'
            },
            form: {
                colCount: 2,
                items:
                [
                    {
                        dataField: 'id',
                        visible: false
                    },
                    {
                        dataField: 'cedula',
                        caption: 'Cédula',
                        editorOptions: {
                            showClearButton: true
                        }
                    },
                    {
                       dataField: 'id_rol',
                       caption: 'Rol',
                       editorType: 'dxTagBox'

                    },
                    {
                        dataField: 'nombre',
                        caption: 'Nombre',
                        editorOptions: {
                            showClearButton: true
                        }
                    },
                    {
                        dataField: 'apellidos',
                        caption: 'Apellidos',
                        editorOptions: {
                            showClearButton: true
                        }
                    },
                    {
                        dataField: 'correo',
                        caption: 'Correo',
                        colSpan: 2,
                        editorOptions: {
                            showClearButton: true
                        }
                    },
                    {
                        dataField: 'activo',
                        caption: 'Activo',
                        dataType: 'boolean'
                    }
                ]
            }
        }
    }

});

