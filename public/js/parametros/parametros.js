appParametros.controller('title', function($scope){
$scope.modulo = 'Parametros Generales'
})

appParametros.controller('parametrosController', function($scope, $http){
    var parametros = new DevExpress.data.CustomStore({
        load: () => {
            return $http.post('/parametros/all')
            .then(response => {
                return response.data;
            })
            .catch(error => {
                DevExpress.ui.notify(error.data['mensaje'], 'error', 5000);
            })
        },
        insert: values => {
            return $http.post('/parametros/insert', values)
            .then(response => {
                DevExpress.ui.notify(response.data['mensaje'], 'success', 5000);
            })
            .catch(error => {
                DevExpress.ui.notify(error.data, 'error', 5000);
            })
        }
    });

    //opciones grid
    $scope.dataGridOptions = {
        dataSource: {
            store: parametros
        },
        columns: [
            {
                dataField: 'id',
                visible: false
            },
            {
                dataField: 'nombre',
                caption: 'Nombre',
                validationRules: [
                    {
                        type: 'required',
                        message: 'El campo es requerido'
                    }
                ]
            },
            {
                dataField: 'codigo',
                caption: 'Código',
                validationRules: [
                    {
                        type: 'required',
                        message: 'El campo es requerido'
                    }
                ]
            },
            {
                dataField: 'descripcion',
                caption: 'Descripción'
            },
            {
                dataField: 'activo',
                caption: 'Activo',
                dataType: 'boolean',
                validationRules: [
                    {
                        type: 'required',
                        message: 'El campo es requerido'
                    }
                ]
            }
        ],
        summary: {
            totalItems: [
                {
                    column: 'id',
                    summaryType: 'count',
                    displayFormat: 'Total: {0}'
                }
            ]
        },
        showBorders: true,
        pager: {
            infoText: 'Página {0} de {1}',
            showInfo: true,
            showNavegationButtons: true,
            visible: true,
            showPageSizeSelector: true,
            allowedPagesSizes: [5,10,15]
        },
        editing: {
            mode: 'form',
            allowAdding: true,
            allowUpdating: true,
            allowDeleting: true,
            useIcons: true,
            texts: {
                saveRowChanges: 'Guardar',
                cancelRowChanges: 'Cancelar',
                confirmDeleteTitle: 'Eliminar Registro',
                confirmDeleteMessage: '¿Desea eliminar el registro?'
            },
            form: {
                colCount: 2,
                items: [
                    {
                        dataField: 'nombre',
                        caption: 'Nombre'
                    },
                    {
                        dataField: 'codigo',
                        caption: 'Código'
                    },
                    {
                        dataField: 'descripcion',
                        caption: 'Descripción',
                        colSpan: 2,
                        editorType: 'dxTextArea'
                    },
                    {
                        dataField: 'activo'
                    }
                ]
            }
        }

    }
})
