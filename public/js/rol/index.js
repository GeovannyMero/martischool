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
                width: 70,
            }
        ],
        onEditingStart: function(e)
        {
            e.component.columnOption("id", "allowEditing", false);
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
        }

    }
});
