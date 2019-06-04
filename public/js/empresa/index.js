var app = angular.module('EmpresaModule',['dx']);

app.controller('empresaController',function empresaController($scope, $http){
    var empresas = new DevExpress.data.CustomStore({
        load: function(){
            return $http.post('/empresa/all')
            .then(function(response){
                console.log(response.data);
                return response.data;

            },(response)=>{
                alert(JSON.stringify(response.data));
            });
        },
        //Actualizar
        update: function(key, values){
            debugger;
            var id = JSON.stringify(key["id"]);
            return $http.post('/empresa/update/' + id, values)
            .then((response)=>{
                DevExpress.ui.notify({
                    message: response.data["mensaje"],
                    position: {
                        my: 'center top',
                        at: 'center top'
                    }
                },
                     "success", 6000
                    );
            }).catch((err)=>{
                console.log(err.data);
                DevExpress.ui.notify(err.data, 'error', 6000);
            })
        },
        //insert
        insert: (values)=>{
            return $http.post('/empresa/insert', values)
            .then((response)=>{
                console.log(JSON.stringify(response));
                DevExpress.ui.notify(response.data['mensaje'], 'success', 6000);
            }).catch((err)=>{
                DevExpress.ui.notify(err.data,'error',6000);
            })
        },
        //Delete
        remove: (key)=>{
            var id = JSON.stringify(key["id"]);
            debugger;
            return $http.post('/empresa/delete', id)
            .then((response)=>{
                DevExpress.ui.notify(response.data['mensaje'], 'success', 6000);
            }).catch((err)=>{
                DevExpress.ui.notify(err.data, 'error', 6000);
            })
        }

    });

    //opciones del grid
    $scope.dataGridOptions = {
        dataSource: {
            store: empresas,

        },
        columnHidingEnabled: true,
        columnAutoWidth: true,
        columns: [
            {
                dataField: 'id',
                caption: 'ID',
                width: 50,
                visible:false,
                editorOptions:{
                    disabled: true,

                }
            },
            {
                dataField: 'nombre',
                caption: 'Nombre',
                dataType: 'string',
                validationRules: [
                    {
                        type: 'required',
                        max: 13,
                        min: 10
                    }
                ]
            },
            {
                dataField: 'ruc',
                caption: 'RUC',
                validationRules: [
                    {
                        type: 'required'
                    }
                ]
            },
            {
                dataField: 'telefono',
                caption: 'Teléfono',
                dataType: 'number',
                validationRules: [
                    {
                        type: 'required',
                        message: 'Teléfono es requerido'
                    }
                ]

            },
            {
                dataField: 'direccion',
                caption: 'Dirección',
                visible: false
            },
            {
                dataField: 'correo',
                caption: 'Correo'
            },
            {
                dataField: 'estado',
                caption: 'Estado',
                dataType: 'boolean'

            }
        ],
        showBorders: true,
        filterRow: {
            visible: true
        },
        pager:{
            infoText: 'Página {0} de {1}',
            showInfo: true,
            showNavegationButtons: true,
            visible: true,
            showPageSizeSelector: true,
            allowedPageSizes: [5,10,15]
        },
        paging:{
            enable: true,
            pageIndex: 0,
            pageSize: 5
        },
        searchPanel: {
            visible: true
        },
        editing:{
            mode:'form',
            allowAdding: true,
            allowUpdating: true,
            allowDeleting: true,
            texts: {
                saveRowChanges: 'Guardar',
            },
            useIcons: true,
            form: {

               /* items: [
                    {
                        colCount: 2,
                        itemType: 'group',
                        //caption: 'Empresa',

                        items:[
                            {
                                dataField: 'id'
                            },
                            {
                                dataField: 'ruc',
                                editorOptions: {
                                    showClearButton: true,
                                    mask: '000000000000',
                                    maskRules: {
                                        'X': /[0-9]/
                                    }

                                }
                            }

                        ]
                    }
                ]*/
                colCount: 2,
                items: [
                /*{
                    dataField: 'id',
                    visible: false,
                    editorOptions: {
                        disabled: true
                    }
                },
                {
                    itemType: "empty"
                },*/
            {
                dataField: 'ruc',
                editorOptions: {
                    showClearButton: true,
                    mask: '0000000000000',
                        maskRules: {
                            'X': /[0-9]/
                        }

                },


            },
            {
                itemType: "empty"
            },
            {
                dataField: 'nombre',
                editorOptions: {
                    showClearButton: true
                }
            },
            {
                dataField: 'telefono',
                editorOptions: {
                    showClearButton: true
                },

            },
            {
                colSpan: 2,
                dataField: 'direccion',
                editorType: 'dxTextArea',
                editorOptions: {
                    //height: 30
                }
            },
            {
                dataField: 'estado',
                caption: 'Estado',
                dataType: 'boolean'
            }
                ]
            }
        },
        selection: {
            mode: 'multiple'
        },
        rowAlternationEnabled: true,

    }

});
