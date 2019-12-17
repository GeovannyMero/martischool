var app = angular.module('periodoModule', ['dx']);

app.controller('title', function title($scope){
    $scope.modulo = 'Administración de Periodos';
});

app.controller('periodoController', function($scope, $http){
    var periodos = new DevExpress.data.CustomStore(
    {
        load:() => {
            return $http.post('/periodos/all')
            .then((response) => {
               return response.data;
            })
            .catch((err) => {
                DevExpress.ui.notify(err.data, 'error', 5000);
            })
        },
        insert: (values) => {
            return $http.post('/periodos/insert', values)
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
        },
        update: (key, values) => {
            let id = JSON.stringify(key['id']);
                if(id !== 0)
                {
                    return $http.post('/periodos/update/'+ id, values)
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
            let id =  key.id;
            if(id > 0)
            {
                return $http.post('/periodos/remove/' + id)
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
                    DevExpress.ui.notify(err.data, 'error',5000);
                })
            }
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
                width: 50,
                visible: false
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
                format: 'dd/MM/yyyy',
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
                format: 'dd/MM/yyyy',
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
        summary: {
            totalItems: [{
                column: "periodo_inicio",
                summaryType: "count",
                displayFormat: 'Total: {0}'
            }]
        },
        onCellPrepared: function(e)
        {
            if(e.rowType === 'data'){
                var $links = e.cellElement.find(".dx-link");
                if(e.row.data.activo === false) {
                    $links.filter(".dx-link-delete").remove();
                }
            }
        },
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
        // selection: {
        //     mode: "multiple"
        // },
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
                items:
                [
                    {
                        dataField: 'id',
                        caption: 'ID',
                        visible: false
                    },
                    // {
                    //     itemType: 'empty'
                    // },
                    {
                        dataField: 'periodo_inicio',
                        caption: 'Año Incio',
                        editorOptions: {
                            showClearButton: true
                        }
                    },
                    {
                        dataField: 'fecha_inicio',
                        caption: 'Fecha Incio',
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
                        caption: 'Año Fin',
                        editorOptions: {
                            showClearButton: true
                        }
                    },
                    {
                        dataField: 'activo',
                        caption: 'Activo'
                    }
                ]
            }
           /* form: {
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
            }*/
        },
        //toolbar
        onToolbarPreparing: e =>
        {
            var dataGrid = e.component;

            e.toolbarOptions.items.unshift(
                {
                    location: 'before',
                },
                {
                    location: 'after',
                    widget: 'dxButton',
                    options: {
                        icon: 'refresh',
                        onClick: () => {
                            dataGrid.refresh();
                        }
                    }
                }
            )
        }
    }

})
