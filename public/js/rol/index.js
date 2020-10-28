var app = angular.module('RolModule', ['dx']);

app.controller('title', function($scope){
    $scope.modulo = 'Roles';
});

app.controller('rolController', function rolController($scope, $http){
    var roles = new DevExpress.data.CustomStore({
        load: () => {
            return $http.post('/rol/all')
            .then((response)=>{
                console.log(response.data);
                return response.data;
            })
            .catch((err)=>{
                console.log(err);
                DevExpress.ui.notify(err.data,'error',5000);
            })
        },
        //Actualizar
        update: (key, values) => {
            let id = JSON.stringify(key['id']);
            if(id !== 0)
            {
                return $http.post('/rol/update/'+id, values)
                .then((response) => {
                    DevExpress.ui.notify(response.data['mensaje'], 'success',5000);
                })
                .catch((err) => {
                    DevExpress.ui.notify(err.data, 'error', 5000);
                })
            }
        },
        //Eliminar
        remove: (key) => {
            let id = JSON.stringify(key['id']);
            if(id !== 0)
            {
                return $http.post('/rol/delete/' + id)
                .then((response) => {
                    DevExpress.ui.notify(response.data['mensaje'], 'success', 5000);
                })
                .catch((err) => {
                    DevExpress.ui.notify(err.data, 'error', 5000);
                })
            }
        },
        //Insertar
        insert: (values) => {
            return $http.post('/rol/insert', values)
            .then((response) => {
                DevExpress.ui.notify(response.data['mensaje'], 'success', 5000)
            })
            .catch((err) => {
                DevExpress.ui.notify(err.data, 'error', 5000);
            })
        }
    });

    //Opciones Grid
    $scope.dataGridOptions = {
        dataSource: {
            store: roles
        },
        rowAlternationEnabled: false,
        columnHidingEnabled: true,
        columnAutoWidth: true,
        showColumnLines: true,
        showRowLines: true,
        showBorders: true,
        columns: [
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
                        message: 'El nombre es requerido'
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
                width: 100,
                dataType: 'boolean'
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
        onCellPrepared: e => {
            if(e.rowType === 'data'){
                var $links = e.cellElement.find(".dx-link");
                if(e.row.data.activo === false) {
                    $links.filter(".dx-link-delete").remove();
                }
            }
        },
        onEditingStart: function(e)
        {
            e.component.columnOption("id", "allowEditing", false);
        },

        filterRow: {
            visible: true,
            applyFilter: 'auto'
        },
        headerFilter: {
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
        editing: {
            mode: 'form',
            allowAdding: true,
            allowUpdating: true,
            allowDeleting: true,
            useIcons: true,
            texts : {
                saveRowChanges: 'Guardar',
                cancelRowChanges: 'Cancelar',
                confirmDeleteTitle: 'Eliminar Registro',
                confirmDeleteMessage: "¿Está ud. seguro que desea eliminar este registro?"
            },
            form: {
                colCount: 2,
                items: [
                    {
                        dataField: 'id',
                        caption: 'Id',
                        //disabled: false,
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
            }
        },

        onToolbarPreparing: e => {
            var dataGrid = e.component;

            e.toolbarOptions.items.unshift(
                {
                    location: 'after'
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
            );
        }

    }
});
