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
        },
        update: (key, values) => {
            let id = JSON.stringify(key['id']);
            if(id > 0){
                return $http.post('/parametros/update/' + id, values)
                .then(response => {
                    DevExpress.ui.notify(response.data['mensaje'], 'success', 5000);
                })
                .catch(error => {
                    DevExpress.ui.notify(error.data, 'error', 5000);
                })
            }
        },
        remove: (key) => {
            let id = key.id;
            if(id > 0)
            {
                return $http.post('/parametros/remove/' + id)
                .then(response => {
                    DevExpress.ui.notify(response.data['mensaje'], 'success', 5000);
                })
                .catch(error => {
                    DevExpress.ui.notify(error.data, 'error', 5000);
                })
            }
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
                width: 80
            }
        ],
        summary: {
            totalItems: [
                {
                    column: 'nombre',
                    summaryType: 'count',
                    displayFormat: 'Total: {0}'
                }
            ]
        },
        onCellPrepared: function(e){
            if(e.rowType === 'data'){
                var $links = e.cellElement.find(".dx-link");
                if(e.row.data.activo === false) {
                    $links.filter(".dx-link-delete").remove();
                }
            }
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
