var app = angular.module('App', ['dx']);

app.controller('appController', function estudianteController($scope, $http){
    var estudiantes = new DevExpress.data.CustomStore({
        //load
        load: function(){
            return $http.post('/estudiante/all')
            .then(function(response){
                debugger;
                let datos = JSON.stringify(response.data[0].representantes);
                console.log(datos);
                return response.data;
            }, function(response){
                alert(JSON.stringify(response.data));
            });
        },
        //insert
        insert: function(values){
            debugger;
            //console.log(JSON.stringify(values));}
            return $http.post('/estudiante/saveEstudiante', values)
            .then(function(response){
                console.log(response.data.mensaje);
                //return response.data;
                DevExpress.ui.notify(response.data['mensaje'],"success",6000);
            }).catch(function(err){
                console.log(err);
                DevExpress.ui.notify(err.data,"error",6000);
                //return err;
            })

            },
        //Update
        update: function(key, values){
            var id = JSON.stringify(key["id"]);
            //DevExpress.ui.notify(id,"success",6000);
            return $http.post('/estudiante/update/' + id, values)
            .then(function(response){
                console.log(response);
                DevExpress.ui.notify(response.data["mensaje"], "success", 6000);
            }).catch(function(err){
                DevExpress.ui.notify(err.data,"error",6000);
            })
        }
    }

    );

    //lookup curso
    var curso = new DevExpress.data.CustomStore({
        key: 'id',
        loadMode: 'raw',
        load: () => {
            return $http.post('/curso/all')
            .then((response) => {
                //console.log('Curso => ' + JSON.stringify(response.data));
                return response.data;
            })
            .catch((err) => {
                DevExpress.ui.notify(err.data, 'error',5000);
            })
        }
    })

    //planificacion paralelos
    var paralelo = new DevExpress.data.CustomStore({
        key: 'id',
        loadMode: 'raw',
        load: () => {
            return $http.post('/paralelo/paraleloCurso')
            .then((response) => {
               // console.log('Paralelo => ' + JSON.stringify(response.data));
                return response.data;
            })
            .catch((err) => {
                DevExpress.ui.notify(err.data, 'error',5000);
            })
        }
    });

//Opciones del Grid
    $scope.dataGridOptions = {
        dataSource: {
            store: estudiantes
        },
        rowAlternationEnabled: false,
        columnHidingEnabled: true,
        columnAutoWidth: true,
        showColumnLines: true,
        showRowLines: true,
        showBorders: true,
        onEditorPreparing: function(e) {
            if(e.parentType === "dataRow" && e.dataField === "idParalelo") {
                e.editorOptions.disabled = (typeof e.row.data.idCurso !== "number");
            }
        },
        columns:[
            // {
            //     dataField: 'id',
            //     caption: "ID",
            //     editorOptions:{
            //         disabled: true
            //     }

            // },
            {
                dataField: 'codigo',
                caption: 'Código',
                width: 80,
                // editorOptions: {
                //     showClearButton: true
                // }

            },

            {
                dataField: 'cedula',
                caption: "Identificación",
                //dataType: 'number',
                editorOptions: {
                    showClearButton: true
                },
                validationRules: [
                    {
                        type: "required",
                        message: "Identificación es requerida"
                    },
                    {
                        type: 'stringLength',
                        max: 10,
                        min: 10,
                        message: 'La longitud es de 10.'
                    }
                ]

            },
           {
               dataField:   'primerNombre',
               caption: 'Primer Nombre',
               dataType:    'string',
               editorOptions: {
                showClearButton: true
            },
               validationRules: [
                   {
                       type: 'required',
                       message: 'El nombre es requerido'
                   }
               ]
           },
           {
               dataField: 'segundoNombre',
               caption: 'Segundo Nombre',
               dataType: 'string',
               editorOptions: {
                   showClearButton: true
               },
               validationRules: [
                   {
                       type: 'required',
                       message: 'El campo es requerido'
                   }
               ]
           },
           {
               dataField: 'primerApellido',
               caption: 'Apellido Paterno',
               validationRules: [
                   {
                       type: 'required',
                       message: 'El Apellido Paterno es requerido'
                   }
               ]
           },
           {
               dataField: 'segundoApellido',
               caption: 'Apellido Materno',
               visible: false,
               editorOptions: {
                showClearButton: true
            },
               validationRules: [
                   {
                       type: 'required',
                       message: 'El apellido materno es requerido'
                   }
               ]
           },
           {
               dataField: 'genero',
               caption: 'Genero',
               visible: false,
               editorOptions: {
                showClearButton: true
            },
               lookup:{
                dataSource: [
                    {
                        "ID": 'M',
                        "desc": "Masculino",
                    },
                    {
                        'ID': 'F',
                        'desc': 'Femenino'
                    }
                ],
                displayExpr: 'desc',
                valueExpr: 'ID'
            },
               validationRules: [
                   {
                       type: 'required',
                       message: 'El genero es requerido'
                   }
               ]
           },
           {
                dataField: 'telefono',
                caption: 'Teléfono',
                visible: false,
                //dataType: 'number',
                editorOptions: {
                    showClearButton: true,
                     //mask: "0000000000",
                    // maskRules: { "X": /[0-9]/ }
                },
                validationRules: [
                    {
                        type: 'required',
                        message: 'El teléfono es requerido'
                    },

                ]
           },
           {
               dataField: 'activo',
               caption: 'Activo',
               dataType: 'boolean',

           },
           {
               dataField: 'fechaNacimiento',
               caption: 'Fecha de Nacimiento',
               dataType: 'date',
               visible: false,
               format: 'dd/MM/yyyy'
           },
           {
                dataField: 'lugarNacimiento',
                caption: 'Lugar de Nacimiento',
                visible:false
           },
           {
               dataField: 'nacionalidad',
               caption: 'Nacionalidad',
               visible: false
           },
           {
               dataField: 'direccion',
               caption: 'Dirección',
               editorType: "dxTextArea",
               visible: false
                // editorOptions: {
                //     height: 140
                // }
           },
           {
                dataField: 'codigoMatricula',
                caption: 'Código de Matricula',
                visible: false

           },
           {
               dataField: 'fechaMatricula',
               caption: 'Fecha de Matricula',
               dataType: 'date',
               visible: false,
               format: 'dd/MM/yyyy',
               validationRules: [
                   {
                       type: 'required',
                       message: 'La fecha de matricula es requerida'
                   }
               ]

           },
           {
               dataField: 'idCurso',
               caption: 'Curso',
               validationRules: [
                   {
                       type: 'required',
                       message: 'El curso es requerido'
                   }
                ],
               setCellValue: function(rowData, value) {
                rowData.idCurso = value;
                rowData.idParalelo = null;
             },
               lookup:{
                dataSource: curso,
                displayExpr: 'nombre',
                valueExpr: 'id'
            }
           },

           {
               dataField: 'idParalelo',
               caption: 'Paralelo',
               lookup: {
                   dataSource: (options) => {
                      // debugger;
                        return {
                            store: paralelo,
                            filter: options.data ? ["idCurso", "=", options.data.idCurso] : null
                        };
                   },
                //dataSource: paralelo,
                   displayExpr: 'nombre',
                   valueExpr: 'idParalelo'



               },
               validationRules: [
                   {
                       type: 'required',
                       message: 'El paralelo es requerido'
                   }
               ]
           },
        //    {
        //        type: 'buttons',
        //        width: 80,
        //        buttons: [
        //            {
        //                icon: 'exportpdf',
        //                visible: true
        //            }
        //        ]
        //    }
        ],

        // onEditorPrepared: function(e)
        // {
        //     if (e.dataType == 'date' && e.dataField == 'fechaMatricula') {
        //         debugger;
        //         //var dateNow = Date.now();
        //         e.editorElement.dxDateBox("instance").option("value", now);
        //     }
        // },
        // onEditorPreparing: function(e) {
        //     debugger;
        //     if (e.parentType == 'dataRow' && e.dataField == 'idCurso') {
        //         var onValueChanged = e.editorOptions.onValueChanged;
        //         e.editorOptions.onValueChanged = function(args){
        //             console.log(onValueChanged);
        //         }
        //     }
        // },
        summary: {
            totalItems: [{
                column: "codigo",
                summaryType: "count",
                displayFormat: 'Total: {0}'
            }]
        },
        showBorders: true,
        filterRow: {
            visible: true,
            applyFilter: "auto"
        },
        headerFilter: {
            visible: true
        },
        filterPanel: { visible: true },
        scrolling: {
            columnRenderingMode: "virtual"
        },
        export: {
            enabled: true,
            fileName: "Estudiantes",
            texts: {
                exportAll: 'Exportar'
            }
           //allowExportSelectedData: true
        },
        pager: {
            infoText: 'Pagina {0} de {1}',
            showInfo: true,
            showNavegationButtons: true,
            visible: true,
            showPageSizeSelector: true,
            allowedPageSizes: [5,10,15]
        },
        paging: {
            enable: true,
            pageIndex: 0,
            pageSize: 5
        },
        searchPanel: {
            visible: true
        },
        editing:{
            mode: 'form',
            allowAdding: true,
            allowUpdating: true,
            allowDeleting: true,
            useIcons: true,
            texts: {
                saveRowChanges: 'Guardar',
                cancelRowChnages: 'Cancelar',
                addRow: 'Agregar Nuevo'
            },
            form: {
                colCount: 1,
                items: [
                    {
                        itemType: 'group',
                        caption: 'Información del Estudiante',
                        colCount: 2,
                        items: [
                            {
                                dataField: 'codigo',
                                caption: 'Codigo'
                            },
                            {
                                itemType: 'empty'
                            },
                            {
                                dataField: 'cedula',
                                caption: 'Cédula',
                                editorOptions: {
                                    showClearButton: true,
                                    maxLength: 10,
                                    placeholder: 'Cédula',
                                    mask: '0000000000',
                                    maskRules: {'X': /[0-9]/}
                                }
                            },
                            {
                                itemType: 'empty'
                            },
                            {
                                dataField: 'primerNombre',
                                caption: 'Primer Nombre',
                                editorOptions: {
                                    showClearButton: true
                                }
                            },
                            {
                                dataField: 'segundoNombre',
                                caption: 'Segundo Nombre',
                                editorOptions: {
                                    showClearButton: true
                                }
                            },
                            {
                                dataField: 'primerApellido',
                                caption: 'Apellido Paterno',
                                editorOptions: {
                                    showClearButton: true
                                }
                            },
                            {
                                dataField: 'segundoApellido',
                                caption: 'Apellido Materno',
                                editorOptions: {
                                    showClearButton: true
                                }
                            },
                            {
                                dataField: 'genero',
                                caption: 'Genero',
                                editorOptions: {
                                    showClearButton: true,
                                    layout: "horizontal"
                                },
                                editorType: 'dxRadioGroup',
                            },
                            {
                                dataField: 'telefono',
                                caption: 'Teléfono',
                                editorOptions: {
                                    showClearButton: true,
                                    mask: "0000000",
                                    maskRules: {"X": /[0-9]/}
                                }


                            },
                            {
                                dataField:'activo',
                                caption: 'Activo',
                                editorType:  'dxCheckBox',
                                editorOptions: {
                                    value: true
                                }
                            }



                        ]
                    },
                    {
                        itemType: 'group',
                        caption: 'Nacimiento',
                        colCount: 2,
                        items: [

                            {
                                dataField: 'fechaNacimiento',
                                caption: 'Fecha',
                                editorOptions: {
                                    showClearButton: true
                                }
                            },
                            {
                                dataField: 'lugarNacimiento',
                                caption: 'Lugar',
                                editorOptions: {
                                    showClearButton: true
                                }
                            },
                            {
                                dataField: 'nacionalidad',
                                caption: 'Nacionalidad',
                                editorOptions: {
                                    showClearButton: true
                                }
                            }

                        ]
                    },
                    {

                            itemType: "tabbed",
                            tabPanelOptions: {
                                deferRendering: false
                            },
                            tabs: [
                                {
                                title: "Domicilio",
                                icon: 'home',
                                deferRendering: false,
                                items: [
                                    {
                                        dataField: 'direccion',
                                        caption: 'Dirección',
                                        editorOptions: {
                                            showClearButton: true
                                        }
                                    }
                                ]
                            },
                            {
                                title: "Familiares",
                                icon: 'fa fa-users',
                                items: [{
                                    template: '<div class="box-body">'+
                                    '<div class="gridEstudiantes" class="demo-containder" ng-app="App" ng-controller="padresController">'+
                                        '<div id="gridContainer" dx-data-grid="dataGridOptions"></div>'+
                                    '</div>'+
                                '</div>'
                                }]
                            },
                            {
                                title: "Periodo",
                                icon: 'fa fa-calendar',
                                colCount: 2,
                                items: [

                                    {
                                        dataField: 'codigoMatricula',
                                        caption: 'Código de Matricula',
                                        editorOptions: {
                                            showClearButton: true
                                        }
                                    },
                                    {
                                        dataField: 'fechaMatricula',
                                        caption: 'Fecha de Matricula',
                                        editorOptions: {
                                            showClearButton: true,
                                            value:  new Date()
                                        }

                                    },
                                    {
                                        dataField: 'idCurso',
                                        caption: 'Curso',
                                        editorOptions: {
                                            showClearButton: true,
                                            // onValueChanged: () => {
                                            //     console.log('OK');
                                            // }
                                        },
                                        editorType: 'dxSelectBox'
                                    },
                                    {
                                        dataField: 'idParalelo',
                                        caption: 'Paralelo'
                                    }
                                ]
                            },
                            {
                                title: 'Emergencia',
                                icon: 'fa fa-ambulance',
                                items:[]

                            }
                        ]

                    }
                ]
                // items: [
                //     {
                //         itemType: "tabbed",
                //         tabPanelOptions: {
                //         deferRendering: false
                //     },
                //     tabs: [{
                //         title: "Estudiante",
                //         colCount: 2,
                //         items: [

                //             {
                //                 dataField: 'caption',
                //             },
                //             {
                //                 dataField: 'cedula'
                //             }
                //         ]
                //     }, {
                //         title: "Skype",
                //         items: ["Skype"]
                //     }, {
                //         title: "Email",
                //         items: ["Email"]
                //     }]
                //     }
                // ]
            }

        },
        selection:{
            mode: "multiple"
        },
        rowAlternationEnabled: true,

        //toolbar
        onToolbarPreparing: function(e){
            var dataGrid = e.component;

            e.toolbarOptions.items.unshift({
                location: "before"
            },
                {
                    location: "after",
                    widget: "dxButton",
                    options: {
                        icon: "refresh",
                        //type: "success",
                        onClick: function(){
                            dataGrid.refresh();
                        }
                    }

                }
            );
        }
    }
});


app.controller('padresController', function($scope){
    debugger;

   alert($scope.dataGridOptions.dataSource);
var padres = [
    {
        "ID": 1,
        "CompanyName": "Super Mart of the West",
        "City": "Bentonville",
        "State": "Arkansas"
    }
];
$scope.dataGridOptions = {
    dataSource: {
        store: padres
    },
    showColumnLines: true,
        showRowLines: true,
        showBorders: true,
        editing: {
            mode: 'popup',
            allowAdding: true
        }
}
})

