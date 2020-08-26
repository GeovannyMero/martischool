var app = angular.module('cursoModule', ['dx']);

app.controller('title', ($scope) => {
    $scope.modulo = 'Cursos';
});
 var niveles = {
     store: new DevExpress.data.CustomStore({
         key: 'id',
         loadMode: "raw",
         load: () => {
            return $.getJSON('/cursoNiveleducativo/niveles');

         }

     })
 }


app.controller('cursoController', function cursoController($scope, $http){
    var cursos = new DevExpress.data.CustomStore(
        {
            load: () => {
                return $http.post('/curso/all')
                .then((response) => {
                    return response.data;
                })
                .catch((err) => {
                    DevExpress.ui.notify(err.data, 'error', 5000);
                });
            },
            update: (key, values) => {
                let id = JSON.stringify(key['id']);
                if(id !== 0)
                {
                    return $http.post('/curso/update/' + id, values)
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
                        DevExpress.ui.notify({
                            message: err.data,
                            position: {
                                my: 'center top',
                                at: 'center top',
                                offset: '50 60'

                            },
                            width: 400,

                        }, 'success', 3000)
                    })
                }
            },
            insert: (values) => {
                return $http.post('/curso/insert', values)
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
                });

            },
            remove: (key) => {
                let id = key.id;
                if(id > 0){
                    return $http.post('/curso/remove/' + id)
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
                    }).catch((err) => {
                        DevExpress.ui.notify(err.data, 'error',5000);
                    })
                }

            }

        }
    );

    //opciones
    $scope.dataGridOptions = {
        dataSource: {
            store: cursos
        },
        rowAlternationEnabled: true,
        columnHidingEnabled: true,
        columnAutoWidth: true,
        columns:
        [
            {
                dataField: 'id',
                caption: 'ID',
                width: 50,
                visible: false

            },
            {
                dataField: 'nombre',
                caption: 'Nombre',
                width: 150,
                validationRules: [
                    {
                        type: 'required',
                        message: 'El nombre es requerido'
                    },
                    {
                        type: 'stringLength',
                        max: 10,
                        message: 'Debe tener al menos 10 caracteres'
                    }
                ]

            },
            {
                dataField:  'curso_letra',
                caption:    'Curso en Letras',
                visible:    false
            },
            {
                dataField: 'curso_numero',
                caption: 'Curso en Numero',
                editorType: 'dxNumberBox',
                width: 130,
                validationRules: [
                    {
                        type: 'required',
                        message: 'El campo es requerido'
                    }
                ]
            },
            {
                dataField: 'curso_siguiente',
                caption: 'Curso a promover',
                validationRules: [
                {
                    type: 'required',
                    message: 'El campo es requerido'
                }

                ]
            },
            {
                dataField: 'id_nivel',
                caption: 'Nivel',
                width: 150,
                lookup: {
                    dataSource: niveles,
                    displayExpr: 'nombre',
                    valueExpr: 'id'
                },
                validationRules: [
                    {
                        type: 'required',
                        message: 'El campo es requerido'
                    }
                ]


            },
            {
                dataField: 'activo',
                caption: 'Activo',
                dataType: 'boolean',
                width: 80
            }
        ],
        summary: {
            totalItems: [{
                column: "nombre",
                summaryType: "count",
                displayFormat: 'Total: {0}'
            }]
        },
        onCellPrepared: function(e){
            if(e.rowType === 'data'){
                var $links = e.cellElement.find(".dx-link");
                if(e.row.data.activo === false) {
                    $links.filter(".dx-link-delete").remove();
                }
            }
        },
        onEditingStart: e => e.component.columnOption('id','allowEditing', false),

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
            mode: "form",
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
                        dataField: 'nombre',
                        caption: 'Nombre',
                        editorOptions: {
                            showClearButton: true
                        }
                    },
                    {
                        dataField: 'curso_letra',
                        caption: 'Curso en Letras',
                        editorOptions: {
                            showClearButton: true
                        }
                    },
                    {
                        dataField: 'curso_numero',
                        caption: 'Curso en numero',
                        editorOptions: {
                            showClearButton: true
                        }
                    },
                    {
                        dataField: 'curso_siguiente',
                        caption: 'Curso a promover',
                        editorOptions: {
                            showClearButton: true,

                        }
                    },
                    {
                        dataField: 'id_nivel',
                        caption: 'Nivel',
                        editorOptions: {
                            showClearButton: true
                        }
                    },
                    {
                        itemType: 'empty'
                    },
                    {
                        dataField: 'activo',
                        caption: 'Activo',
                        dataType: 'boolean'
                    }

                ]
            }

        },
        onToolbarPreparing: e => {
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
                        //type: 'success',
                        onClick: function() {
                            dataGrid.refresh();
                        }
                    }
                },
                // {
                //     location: 'after',
                //     widget: 'dxButton',
                //     options: {
                //         icon:'trash',
                //         //type: 'danger',
                //         onClick: function() {
                //             if(cursos.update());
                //             {
                //                 console.log('OK');
                //             }
                //         }

                //     }
                // }
            );
        }

    }
})

