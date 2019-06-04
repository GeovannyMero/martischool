var app = angular.module('EscuelaModule', ['dx']);

app.controller('escuelaController', function escuelaController($scope, $http){
    var escuela = new DevExpress.data.CustomStore({
        load: ()=>{
            return $http.post('/escuela/all')
            .then((response)=>{
                return response.data;
            }).catch((err)=>{
                console.log(err);
            })
        },
        //Actualizar
        update: (key, values)=>{
            let id = JSON.stringify(key['id']);
            if(id !== 0){
                return $http.post('/escuela/update/'+ id, values)
                .then((response) => {
                    DevExpress.ui.notify({
                        message: response.data['mensaje'],
                        position: {
                            my: 'center top',
                            at: 'center top'
                        }
                    }, 'success', 5000);
                })
                .catch((err)=>{
                    console.log(err);
                })
            }

        },
        remove: (key)=>{
            let id = JSON.stringify(key['id']);
            return $http.post('/escuela/delete/'+id)
            .then((response)=>{
                DevExpress.ui.notify(response.data['mensaje', 'success', 5000]);
            }).catch((err)=>{
                DevExpress.ui.notify(err.data, 'error', 5000);
            });
        }
    });

    ///Option
    $scope.dataGridOptions = {
        dataSource: {
            store: escuela,
        },
    columnHidingEnabled: true,
    columnAutoWidth: true,
    columns: [
        {
            dataField: 'id',
            caption: 'Id',
            width: 50

        },
        {
            dataField: 'nombre',
            caption: 'Nombre',
            validationRules: [
                {
                    type: 'required',
                    message: 'Nombre es requerido'
                }
            ]

        },
        {
            dataField: 'descripcion',
            caption: 'Descripción',
            width: 150
        },
        {
            dataField: 'activo',
            caption: 'Estado',
            width: 70
        },
        {
            dataField: 'created_by',
            visible: false
        },
        {
            dataField: 'updated_by',
            visible: false,
        },
        {
            dataField: 'created_at',
            visible:false,
        },
        {
            dataField: 'updated_at',
            visible: false,
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
            ShowPageSizeSelector: true,
            allowedPageSizes: [5,10,15]
        },
        paging: {
            enable: true,
            pageIndex: 0,
            pageSize: 5
        },
        searchPanel: {
            visible: true,
        },
        editing: {
            mode: 'form',
            allowAdding: true,
            allowUpdating: true,
            allowDeleting: true,
            useIcons: true,
            texts: {
                saveRowChanges: 'Guardar'
            },
            form: {
                colCount: 2,
                items: [
                    {
                        dataField: 'id',
                        disabled: true
                    },
                    {
                        itemType: 'empty'
                    },
                    {
                        dataField: 'nombre',
                        editorOptions: {
                            showClearButton: true
                        }
                    },
                    {
                        dataField: 'descripcion',
                        editorOptions: {
                            showClearButton: true
                        }
                    },
                    {
                        dataField: 'activo',
                        caption: 'Estado',
                        dataType: 'boolean',

                    }
                ]
            }
        }
    }
})
