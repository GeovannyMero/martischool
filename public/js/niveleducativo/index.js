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
                    console.log(response.data);
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
                        DevExpress.ui.notify(response.data['mensaje'], 'success', 5000);
                    })
                    .catch((err) => {
                        DevExpress.ui.notify(err.data, 'error', 5000);
                    })
                }
            },
            insert: (values) => {
                return $http.post('/niveleducativo/insert', values)
                .then((response) => {
                    DevExpress.ui.notify(response.data['mensaje'], 'success', 5000)
                })
                .catch((err) => {
                    DevExpress.ui.notify(err.data, 'error', 5000);
                })
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
                width: 50
            },
            {
                dataField: 'nombre',
                caption: 'Nombre',
                validationRules: [
                    {
                        type: 'required',
                        message: 'El Nombre es requerido'
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
                width: '70'
            }
        ],
        onEditingStart: e => e.component.columnOption('id','allowEditing', false),
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
            //allowDeleting: true,
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
                        dataField: 'id',
                        caption: 'Id',

                    },
                    {
                        itemType: 'empty'
                    },
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
                        dataType: 'boolean'

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
                        type: 'success',
                        onclick: function() {
                            dataGrid.refresh();
                        }
                    }
                },
                {
                    location: 'after',
                    widget: 'dxButton',
                    options: {
                        icon:'trash',
                        type: 'danger',
                        onclick: () => {
                            console.log('REmove');
                        }

                    }
                }
            );
        }
    }
});

