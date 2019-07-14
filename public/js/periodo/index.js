var app = angular.module('periodoModule', ['dx']);

app.controller('title', function title($scope){
    $scope.modulo = 'Administración de Periodos';
});

app.controller('periodoController', function($scope, $http){
    var periodos = new DevExpress.data.CustomStore({
        load:() => {
            return $http.post('/periodos/all')
            .then((response) => {
                console.log("H");
                return response.data;
            })
            .catch((err) => {
                DevExpress.ui.notify(err.data, 'error', 5000);
            })
        },
        insert: (values) => {
            return $http.post('/periodos/insert', values)
            .then((response) => {
                DevExpress.ui.notify(response.data['mensaje'], 'success', 5000)
            })
            .catch((err) => {
                DevExpress.ui.notify(err.data, 'error', 5000);
            })
        }
    });//Fin de Store

    //opciones de grid
    $scope.dataGridOptions = {
        dataSource: {
            store: periodos
        },
        rowAlternationEnabled: true,
        columnHidingEnabled: true,
        columnAutoWidth: true,
        columns:
        [
            {
                dataField: 'id',
                caption: 'Id',
                width: 50
            },
            {
                dataField: 'periodo_inicio',
                caption: 'Año de inicio',
                validationRules: [
                    {
                        type: 'required',
                        message: 'Este campo es requerido'
                    },
                    {
                        type: 'stringLength',
                        max: 4,
                        min: 4,
                        message: 'Debe ser igual a 4 caracteres'

                    }
                ]
            },
            {
                dataField: 'periodo_fin',
                caption: 'Año de Fin',
                validationRules: [
                    {
                        type: 'required',
                        message: 'Este campo es requerido'
                    },
                    {
                        type: 'stringLength',
                        max: 4,
                        min: 4,
                        message: 'Debe ser igual a 4 caracteres'

                    }
                ]
            },
            {
                dataField: 'fecha_inicio',
                caption: 'Fecha Inicio',
                dataType: 'date',
                validationRules: [
                    {
                        type: 'required',
                        message: 'Este campo es requerido'
                    }
                ]
            },
            {
                dataField: 'fecha_fin',
                caption: 'Fecha Fin',
                dataType: 'date',
                validationRules: [
                    {
                        type: 'required',
                        message: 'Este campo es requerido'
                    }
                ]
            },
            {
                dataField: 'activo',
                caption: 'Activo',
                dataType: 'boolean'
            }
        ],//fincolumnas
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
                        caption: 'ID'
                    },
                    {
                        itemType: 'empty'
                    },
                    {
                        dataField: 'periodo_inicio',
                        caption: 'Año Inicio',
                        editorOptions: {
                            showClearButton: true
                        }
                    },
                    {
                        dataField: 'fecha_inicio',
                        caption: 'Fecha de Incio',
                        editorOptions: {
                            showClearButton: true
                        }
                    },
                    {
                        dataField: 'periodo_fin',
                        caption: 'Año Fin',
                        editorOptions: {
                            showClearButton: true
                        }
                    },
                    {
                        dataField: 'fecha_fin',
                        caption: 'Fecha Fin',
                        editorOptions: {
                            showClearButton: true
                        }
                    },
                    {
                        itemType: 'Empty'
                    },
                    {
                        dataField: 'activo',
                        caption: 'Activo'
                    }
                ]
            }
        }
    }

})
