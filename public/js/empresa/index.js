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

    });

    //opciones del grid
    $scope.dataGridOptions = {
        dataSource: {
            store: empresas
        },
        columns: [
            {
                dataField: 'id',
                caption: 'ID',
                editorOptions:{
                    disabled: true
                }
            },
            {
                dataField: 'nombre',
                caption: 'Nombre', 
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
                validationRules: [
                    {
                        type: 'required',
                        message: 'Teléfono es requerido'
                    }
                ]

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
            alloedPageSizes: [5,10,15]
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
                {
                    dataField: 'id',
                    editorOptions: {
                        disabled: true
                    }
                },
            {
                dataField: 'ruc',
                editorOptions: {
                    showClearButton: true,
                    mask: '0000000000000',
                        maskRules: {
                            'X': /[0-9]/
                        }

                }
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
                }
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