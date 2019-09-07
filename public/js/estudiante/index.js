var app = angular.module('App', ['dx']);

app.controller('appController', function estudianteController($scope, $http){
    var estudiantes = new DevExpress.data.CustomStore({
        //load
        load: function(){
            return $http.post('/estudiante/all')
            .then(function(response){
                return response.data;
            }, function(response){
                alert(response.data);
            });
        },
        //insert
        insert: function(values){
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
            return $http.post('/planificacion/all')
            .then((response) => {
                console.log(response.data);
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
        columnHidingEnabled: true,
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
                editorOptions: {
                    showClearButton: true
                }

            },

            {
                dataField: 'cedula',
                caption: "Identificación",
                dataType: 'number',
                editorOptions: {
                    showClearButton: true
                },
                validationRules: [
                    {
                        type: "required",
                        message: "Identificación es requerida"
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
                dataType: 'number',
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
            //    setCellValue: function(rowData, value) {
            //        debugger;
            //     rowData.idCurso = value;
            //     //rowData.CityID = null;
            //  },
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
                        return {
                            store: paralelo,
                            filter: options.data ? ["idCurso", "=", options.data.idCurso] : null
                        }
                   },
                   displayExpr: 'idCurso',
                   valueExpr: 'id'



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

        onEditorPrepared: function(e)
        {
            if (e.dataType == 'date' && e.dataField == 'fechaMatricula') {
                var dateNow = Date.now();
                e.editorElement.dxDateBox("instance").option("value", dateNow);
            }
        },
        // onEditorPreparing: function(e) {
        //     debugger;
        //     if (e.parentType == 'dataRow' && e.dataField == 'idCurso') {
        //         var onValueChanged = e.editorOptions.onValueChanged;
        //         e.editorOptions.onValueChanged = () => console.log('value changed')
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
            allowExportSelectedData: true
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
                                caption: 'Cédula'
                            },
                            {
                                itemType: 'empty'
                            },
                            {
                                dataField: 'primerNombre',
                                caption: 'Primer Nombre'
                            },
                            {
                                dataField: 'segundoNombre',
                                caption: 'Segundo Nombre'
                            },
                            {
                                dataField: 'primerApellido',
                                caption: 'Apellido Paterno'
                            },
                            {
                                dataField: 'segundoApellido',
                                caption: 'Apellido Materno'
                            },
                            {
                                dataField: 'genero',
                                caption: 'Genero'
                            },
                            {
                                dataField: 'telefono',
                                caption: 'Teléfono',


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
                                caption: 'Fecha'
                            },
                            {
                                dataField: 'lugarNacimiento',
                                caption: 'Lugar'
                            },
                            {
                                dataField: 'nacionalidad',
                                caption: 'Nacionalidad'
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
                                items: [
                                    {
                                        dataField: 'direccion',
                                        caption: 'Dirección'
                                    }
                                ]
                            },
                            {
                                title: "Familiares",
                                items: ["Skype"]
                            },
                            {
                                title: "Periodo",
                                colCount: 2,
                                items: [

                                    {
                                        dataField: 'codigoMatricula',
                                        caption: 'Código de Matricula'
                                    },
                                    {
                                        dataField: 'fechaMatricula',
                                        caption: 'Fecha de Matricula',

                                    },
                                    {
                                        dataField: 'idCurso',
                                        caption: 'Curso'
                                    },
                                    {
                                        dataField: 'idParalelo',
                                        caption: 'Paralelo'
                                    }
                                ]
                            },
                            {
                                title: 'Emergencia',
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
                        type: "success",
                        onClick: function(){
                            dataGrid.refresh();
                        }
                    }

                }
            );
        }
    }
});
