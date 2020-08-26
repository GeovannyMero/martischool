var app = angular.module('NivelModule', ['dx']);

app.controller('title', ($scope)=>
    $scope.modulo = 'Niveles Educativo'
    );

    //CRUD
app.controller('nivel_educativoController', function nivel_educativoController($scope, $http)
{
    var nivelesEducativos = new DevExpress.data.CustomStore(
        {
            load: () => {
                return $http.post('/niveleducativo/all')
                .then((response)=>
                {
                   return response.data;
                })
                .catch((err) => {
                    DevExpress.ui.notify(err.data, 'error', 5000);
                }
                )
            },
            update: (key, values) => {
                let id = JSON.stringify(key['id']);
                if(id !== 0)
                {
                    return $http.post('/niveleseducativo/update/' + id, values)
                    .then((response) => {
                        //DevExpress.ui.notify(response.data['mensaje'], 'success', 5000);
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
                        //DevExpress.ui.notify(err.data, 'error', 5000);
                        DevExpress.ui.notify({
                            message: err.data,
                            position: {
                                my: 'center top',
                                at: 'center top',
                                offset: '50 60'
                            },
                            width: 400

                        }, 'error', 3000)
                    });
                }
            },
            insert: (values) => {
                return $http.post('/niveleducativo/insert', values)
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
            remove: (key) => {
                debugger;
                let id = key.id;
                if(id !== 0)
                {
                    //result = DevExpress.ui.dialog.confirm(`<i>Está ud. seguro de eliminar el registro:</i></br><strong> [${id}] ${key.nombre}</strong>`, "Eliminar Nivel Academico");
                    return $http.post('/niveleducativo/remove/' + id)
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


                    // result.done(function(dialogResult){
                    //     //alert(dialogResult ? "Confirmed" : "Canceled");
                    //     if(dialogResult){
                    //         return $http.post('/niveleducativo/remove/' + id)
                    //             .then((response) => {
                    //                 DevExpress.ui.notify(response.data['mensaje'], "success", 5000);

                    //             })
                    //             .catch((err) => {
                    //                  DevExpress.ui.notify(err.data, 'error',5000);
                    //              })
                    //     }
                    // })

                }
            }

        }
    )

    //Opciones Grid
    $scope.dataGridOptions = {
        dataSource: {
            store: nivelesEducativos
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
                visible:false

            },
            {
                dataField: 'nombre',
                caption: 'Nombre',
                width: 250,
                validationRules: [
                    {
                        type: 'required',
                        message: 'El Nombre es requerido'
                    }
                ]
            },
            {
                dataField: 'descripcion',
                caption: 'Descripción',
                //width: 200
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
        // headerFilter: {
        //     visible: true
        // },
        //filterPanel: { visible: true },
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
                confirmDeleteMessage: '¿Desea eliminar el registro?',
                addRow: 'Nuevo',
                editRow: 'Editar',
                deleteRow: 'Eliminar'

            },
            form: {
                colCount: 2,
                items: [
                    {
                        dataField: 'id',
                        caption: 'Id',
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
                        dataField: 'descripcion',
                        caption: 'Descripción',
                        editorOptions: {
                            showClearButton: true
                        }
                    },
                    {
                        dataField: 'activo',
                        caption: 'Estado',
                        dataType: 'boolean',
                        editorType:  'dxCheckBox',
                                editorOptions: {
                                    //value: true
                                }

                    }

                ]
            },


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
                //         onClick: () => {
                //             let selectedData = dataGrid.getSelectedRowsData();
                //             if(selectedData.length > 0){
                //                 let idData = selectedData[0];
                //                 var ds = $("#gridContainer").dxDataGrid("getDataSource");
                //                 ds.store().remove(idData);
                //                 //debugger;
                //                 //ds.reload();
                //                 dataGrid.refresh();
                //             }

                //         }

                //     }
                // }
            );
        }
    }
});

