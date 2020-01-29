var app = angular.module("App", ["dx", "ngRoute"]);

app.config(function($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix("");
    $routeProvider
        .when("/estudiante/detail/:id", {
            //controller: 'appController',
            //template: '<div><strong>GEo</strong></div>'
            templateUrl: "/js/estudiante/template/detalles.html"
        })
        .otherwise({ redirectTo: "/" });
});

app.controller("appController", function estudianteController($scope, $http, $location) {
    var representantes = [];
    var estudiantes = new DevExpress.data.CustomStore({
        //load
        load: function() {
            return $http.post("/estudiante/all").then(
                function(response) {
                    //debugger;
                    //console.log(JSON.stringify(response.data));
                    return response.data;
                },
                function(response) {
                    alert(JSON.stringify(response.data));
                }
            );
        },
        //insert
        insert: function(values) {
            debugger;
            //console.log(JSON.stringify(values));}
            return $http
                .post("/estudiante/saveEstudiante", values)
                .then(function(response) {
                    console.log(response.data.mensaje);
                    //return response.data;
                    DevExpress.ui.notify(
                        response.data["mensaje"],
                        "success",
                        6000
                    );
                })
                .catch(function(err) {
                    console.log(err);
                    DevExpress.ui.notify(err.data, "error", 6000);
                    //return err;
                });
        },
        //Update
        update: function(key, values) {
            debugger;
            var id = JSON.stringify(key["id"]);
            //DevExpress.ui.notify(id,"success",6000);
            return $http
                .post("/estudiante/update/" + id, values)
                .then(function(response) {
                    console.log(response);
                    DevExpress.ui.notify(
                        response.data["mensaje"],
                        "success",
                        6000
                    );
                })
                .catch(function(err) {
                    DevExpress.ui.notify(err.data, "error", 6000);
                });
        }
    });

    //lookup curso
    var curso = new DevExpress.data.CustomStore({
        key: "id",
        loadMode: "raw",
        load: () => {
            return $http
                .post("/curso/all")
                .then(response => {
                    //console.log('Curso => ' + JSON.stringify(response.data));
                    return response.data;
                })
                .catch(err => {
                    DevExpress.ui.notify(err.data, "error", 5000);
                });
        }
    });

    //planificacion paralelos
    var paralelo = new DevExpress.data.CustomStore({
        key: "id",
        loadMode: "raw",
        load: () => {
            return $http
                .post("/paralelo/paraleloCurso")
                .then(response => {
                    // console.log('Paralelo => ' + JSON.stringify(response.data));
                    return response.data;
                })
                .catch(err => {
                    DevExpress.ui.notify(err.data, "error", 5000);
                });
        }
    });

    var representantes = new DevExpress.data.CustomStore({
        load: () => {
            return $http
                .post("/estudiante/representantes/3")
                .then(response => {
                    console.log(JSON.stringify(response.data));
                    return response.data;
                })
                .catch(error => {
                    DevExpress.ui.notify(error.data, "error", 5000);
                });
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
            if (e.parentType === "dataRow" && e.dataField === "idParalelo") {
                e.editorOptions.disabled =
                    typeof e.row.data.idCurso !== "number";
            }
        },
        columns: [
            // {
            //     dataField: 'id',
            //     caption: "ID",
            //     editorOptions:{
            //         disabled: true
            //     }

            // },
            {
                dataField: "codigo",
                caption: "Código",
                width: 80
                // editorOptions: {
                //     showClearButton: true
                // }
            },

            {
                dataField: "cedula",
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
                        type: "stringLength",
                        max: 10,
                        min: 10,
                        message: "La longitud es de 10."
                    }
                ]
            },
            {
                dataField: "primerNombre",
                caption: "Primer Nombre",
                dataType: "string",
                editorOptions: {
                    showClearButton: true
                },
                validationRules: [
                    {
                        type: "required",
                        message: "El nombre es requerido"
                    }
                ]
            },
            {
                dataField: "segundoNombre",
                caption: "Segundo Nombre",
                dataType: "string",
                editorOptions: {
                    showClearButton: true
                },
                validationRules: [
                    {
                        type: "required",
                        message: "El campo es requerido"
                    }
                ]
            },
            {
                dataField: "primerApellido",
                caption: "Apellido Paterno",
                validationRules: [
                    {
                        type: "required",
                        message: "El Apellido Paterno es requerido"
                    }
                ]
            },
            {
                dataField: "segundoApellido",
                caption: "Apellido Materno",
                visible: false,
                editorOptions: {
                    showClearButton: true
                },
                validationRules: [
                    {
                        type: "required",
                        message: "El apellido materno es requerido"
                    }
                ]
            },
            {
                dataField: "genero",
                caption: "Genero",
                visible: false,
                editorOptions: {
                    showClearButton: true
                },
                lookup: {
                    dataSource: [
                        {
                            ID: "M",
                            desc: "Masculino"
                        },
                        {
                            ID: "F",
                            desc: "Femenino"
                        }
                    ],
                    displayExpr: "desc",
                    valueExpr: "ID"
                },
                validationRules: [
                    {
                        type: "required",
                        message: "El genero es requerido"
                    }
                ]
            },
            {
                dataField: "telefono",
                caption: "Teléfono",
                visible: false,
                //dataType: 'number',
                editorOptions: {
                    showClearButton: true
                    //mask: "0000000000",
                    // maskRules: { "X": /[0-9]/ }
                },
                validationRules: [
                    {
                        type: "required",
                        message: "El teléfono es requerido"
                    }
                ]
            },
            {
                dataField: "activo",
                caption: "Activo",
                dataType: "boolean"
            },
            {
                dataField: "fechaNacimiento",
                caption: "Fecha de Nacimiento",
                dataType: "date",
                visible: false,
                format: "dd/MM/yyyy"
            },
            {
                dataField: "lugarNacimiento",
                caption: "Lugar de Nacimiento",
                visible: false
            },
            {
                dataField: "nacionalidad",
                caption: "Nacionalidad",
                visible: false
            },
            {
                dataField: "direccion",
                caption: "Dirección",
                editorType: "dxTextArea",
                visible: false
                // editorOptions: {
                //     height: 140
                // }
            },
            {
                dataField: "codigoMatricula",
                caption: "Código de Matricula",
                visible: false
            },
            {
                dataField: "fechaMatricula",
                caption: "Fecha de Matricula",
                dataType: "date",
                visible: false,
                format: "dd/MM/yyyy",
                validationRules: [
                    {
                        type: "required",
                        message: "La fecha de matricula es requerida"
                    }
                ]
            },
            {
                dataField: "idCurso",
                caption: "Curso",
                validationRules: [
                    {
                        type: "required",
                        message: "El curso es requerido"
                    }
                ],

                setCellValue: function(rowData, value) {
                    rowData.idCurso = value;
                    rowData.idParalelo = null;
                },
                lookup: {
                    dataSource: curso,
                    displayExpr: "nombre",
                    valueExpr: "id"
                }
            },

            {
                dataField: "idParalelo",
                caption: "Paralelo",
                lookup: {
                    dataSource: options => {
                        // debugger;
                        return {
                            store: paralelo,
                            filter: options.data
                                ? ["idCurso", "=", options.data.idCurso]
                                : null
                        };
                    },
                    //dataSource: paralelo,
                    displayExpr: "nombre",
                    valueExpr: "idParalelo"
                },
                validationRules: [
                    {
                        type: "required",
                        message: "El paralelo es requerido"
                    }
                ]
            },
            {
                dataField: "representantes",
                caption: "Representantes",
                visible: true,
                calculateDisplayValue: function(rowData) {
                    return JSON.stringify(rowData.representantes);
                }

            },
             {
                 //TODO: DETALLES
                type: "buttons",
                width: 80,
                buttons: [
                       {
                           icon: 'trash',
                           visible: true
                       },
                       {
                        icon: 'exportpdf',
                        visible: true,
                        hint: 'Descargar ficha estudiante',
                        onClick: () =>
                        {
                            //TODO:PDF
                            $http.get('/estudiante/fichaEstudiante')
                            .then(result => {
                                //console.log(JSON.stringify(result));
                               // window.open(result, '_blank');
                               var res = result;
                                console.log(res.config.url);
                                location.assign(res.config.url);
                              // result;
                            })
                            .catch(error => { alert(error)})

                        }
                    },
                    {
                        icon: "edit",
                        visible: true,
                        onClick: e => {
                            debugger;
                            var datos = e.row.data;
                            console.log(datos['id']);
                            $http.get("/estudiante/detail/" + datos['id'])
                                .then(function(result) {
                                    //TODO: DETALLES  DE ESTUDIANTES.
                                   //debugger;
                                    document.getElementById("pages").innerHTML = "";
                                    document.getElementById('pages').innerHTML = result.data;
                                    let datosEstudiante = JSON.parse($('#estudiante').val());
                                    var est = $("#form").dxForm({
                                        formData: datosEstudiante[0],
                                        items: [
                                            {
                                                itemType: 'group',
                                                caption: 'Información Personal',
                                                colCount: 2,
                                                items: [
                                                    {
                                                        dataField: 'id',
                                                        visible: false
                                                    },
                                                    {
                                                        dataField: 'codigo',
                                                        caption: 'Código',
                                                        showClearButton: true,
                                                        editorOptions: {
                                                            disabled: true
                                                        },
                                                        validationRules: [
                                                            {
                                                                type: 'required',
                                                                message: 'El campo es obligatorio.'
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        itemType: 'empty'
                                                    },

                                                    {
                                                        dataField: 'cedula',
                                                        caption: 'Cédula',
                                                        editorOptions:{
                                                            showClearButton: true,
                                                        }
                                                    },
                                                    {
                                                        itemType: 'empty'
                                                    },
                                                    {
                                                        dataField: 'primerNombre',
                                                        caption: 'Primer Nombre',
                                                        validationRules: [
                                                            {
                                                                type: 'required',
                                                                message: 'El campo es obligatorio.'
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        dataField: 'segundoNombre',
                                                        caption: 'Segundo Nombre'
                                                    },
                                                    {
                                                        dataField: 'primerApellido',
                                                        caption: 'Primer Apellido',
                                                        validationRules: [
                                                            {
                                                                type: 'required',
                                                                message: 'El campo es obligatorio.'
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        dataField: 'segundoApellido',
                                                        caption: 'Segundo Apellido',
                                                        validationRules: [
                                                            {
                                                                type: 'required',
                                                                message: 'El campo es obligatorio.'
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        dataField: 'fechaNacimiento',
                                                        caption: 'Fecha de Nacimiento',
                                                        editorType: "dxDateBox",

                                                        editorOptions: {
                                                            width: "100%",
                                                            displayFormat: "dd/MM/yyyy",
                                                        },
                                                        validationRules: [
                                                            {
                                                                type: 'required',
                                                                message: 'El campo es obligatorio.'
                                                            }
                                                        ]
                                                    },
                                                    // {
                                                    //     dataField: 'lugarNacimiento'
                                                    // },
                                                    // {
                                                    //     dataField: 'nacionalidad'
                                                    // },
                                                    {
                                                        dataField: 'genero',
                                                        editorType: 'dxRadioGroup',
                                                        validationRules: [
                                                            {
                                                                type: 'required',
                                                                message: 'El campo es obligatorio.'
                                                            }
                                                        ],
                                                        editorOptions: {
                                                            layout: "horizontal",
                                                            dataSource: [
                                                                            {
                                                                                ID: "M",
                                                                                desc: "Masculino"
                                                                            },
                                                                            {
                                                                                ID: "F",
                                                                                desc: "Femenino"
                                                                            }
                                                                        ],
                                                                        displayExpr: "desc",
                                                                        valueExpr: "ID"
                                                        },
                                                    },
                                                    {
                                                        dataField: 'telefono'
                                                    },
                                                    {
                                                        itemType: 'empty'
                                                    },
                                                    {
                                                        dataField: 'direccion',
                                                        colSpan: 2,
                                                        editorType: 'dxTextArea',
                                                        validationRules: [
                                                            {
                                                                type: 'required',
                                                                message: 'El campo es obligatorio.'
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        dataField: 'activo'
                                                    }
                                                ]

                                        },
                                        // {
                                        //     itemType: 'group',
                                        //     caption: 'Contacto',
                                        //     colCount: 2,
                                        //     items: [
                                        //         {
                                        //             dataField: 'telefono'
                                        //         },
                                        //         {
                                        //             itemType: 'empty'
                                        //         },
                                        //         {
                                        //             dataField: 'direccion',
                                        //             colSpan: 2,
                                        //             editorType: 'dxTextArea',
                                        //             validationRules: [
                                        //                 {
                                        //                     type: 'required',
                                        //                     message: 'El campo es obligatorio.'
                                        //                 }
                                        //             ]
                                        //         }
                                        //     ]
                                        // },
                                        // {
                                        //     itemType: "button",
                                        //     horizontalAlignment: "left",
                                        //     buttonOptions: {
                                        //         text: "Register",
                                        //         type: "success",
                                        //         useSubmitBehavior: true
                                        //     }
                                        // }

                                    ]
                                     }).dxForm("instance");
                                     //INFO ADICIONAL
                                     $('#form_info_adicional').dxForm({
                                        formData: datosEstudiante[0],
                                        items: [
                                                    {
                                                        dataField: 'nacionalidad'
                                                    },
                                                    {
                                                        dataField: 'lugarNacimiento'
                                                    },
                                        ]
                                    }).dxForm('instance');
                                     //REPRESENTANTES
                                     $("#gridContainer").dxDataGrid({
                                        dataSource: datosEstudiante[0].representantes,
                                        rowAlternationEnabled: false,
                                        //columnHidingEnabled: true,
                                        columnAutoWidth: true,
                                         showColumnLines: true,
                                         showRowLines: true,
                                         showBorders: true,
                                         columns: [
                                             {
                                                dataField: 'id',
                                                visible: false
                                             },
                                             {
                                                 dataField: 'cedula',
                                                 caption: 'Cédula',
                                                 //width: 30,
                                                 validationRules: [
                                                     {
                                                         type: 'required',
                                                         message: 'El campo es obligatorio.'
                                                     }
                                                 ]
                                             },
                                             {
                                                 dataField: 'nombre',
                                                 caption: 'Nombres',
                                                 validationRules: [
                                                    {
                                                        type: 'required',
                                                        message: 'El campo es obligatorio.'
                                                    }
                                                ]
                                             },
                                             {
                                                dataField:  'apellidos',
                                                caption: 'Apellidos',
                                                validationRules: [
                                                    {
                                                        type: 'required',
                                                        message: 'El campo es requerido'
                                                    }
                                                ]
                                             },
                                             {
                                                 dataField: 'parentesco',
                                                 validationRules: [
                                                     {
                                                         type: 'required',
                                                         message: 'El campo es requerido'
                                                     }
                                                 ]
                                             },
                                             {
                                                 dataField: 'telefonoMovil',
                                                 caption: 'Movil',
                                                 validationRules: [
                                                     {
                                                         type: 'required',
                                                         message: 'El campo es requerido'
                                                     }
                                                 ]
                                             },
                                             {
                                                 dataField: 'telefonoFijo',
                                                 caption: 'Fijo'
                                             },
                                             {
                                                 dataField: 'correo'
                                             },
                                             {
                                                 dataField: 'activo'
                                             }
                                         ],
                                         summary: {
                                             totalItems: [
                                                 {
                                                     column: 'cedula',
                                                     summaryType: 'count',
                                                     displayFormat: 'Total: {0}'
                                                 }
                                             ]
                                         },
                                         onEditingStart: e => e.component.columnOption('id','allowEditing', false),
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
                                        editing: {
                                            mode: 'popup',
                                            allowAdding: true,
                                            allowUpdating: true,
                                            allowDeleting: true,
                                            useIcons: true,
                                            texts: {
                                                saveRowChanges: 'Guardar',
                                                cancelRowChanges: 'Cancelar',
                                                confirmDeleteTitle: 'Eliminar Registro',
                                                confirmDeleteMessage: '¿Desea eliminar el registro?'
                                            },
                                            popup: {
                                                title: "Información de Representante",
                                                showTitle: true,
                                                width: 725,
                                                height: 400,
                                                position: {
                                                    my: "center",
                                                    at: "center",
                                                    of: window
                                                }
                                            },
                                        }
                                    });
                                    //TODO: PERIODOS
                                $('#periodos').dxForm({
                                    formData:  datosEstudiante[0],
                                    colCount: 2,
                                    items: [
                                        {
                                            dataField: 'codigoMatricula',
                                            caption: 'Código Matricula'
                                        },
                                        {
                                            dataField: 'fechaMatricula',
                                            caption: 'Fecha Matricula',
                                            editorType: "dxDateBox",
                                        },
                                        {
                                            dataField: "idCurso",
                                            label: {
                                                text: 'Cursos'
                                            },
                                            validationRules: [
                                                {
                                                    type: "required",
                                                    message: "El curso es requerido"
                                                }
                                            ],
                                            editorType: 'dxSelectBox',
                                            editorOptions: {
                                                dataSource: curso,
                                                valueExpr: "id",
                                                displayExpr: "nombre",
                                                onValueChanged: function(e){
                                                    var form = $('#periodos').dxForm('instance');
                                                    var secondEditor =  form.getEditor("idParalelo");
                                                    secondEditor.getDataSource().filter(['idCurso', '=', e.value]);
                                                    secondEditor._options.readOnly = false;
                                                    secondEditor.getDataSource().load();

                                                }

                                            }


                                        },
                                        {
                                            dataField: 'idParalelo',
                                            label: {
                                                text: 'Paralelos'
                                            },
                                            validationRules: [
                                                {
                                                    type: 'required',
                                                    message: 'El Campo es requerido.'
                                                }
                                            ],
                                            editorType: 'dxSelectBox',
                                            editorOptions: {
                                                dataSource: paralelo,
                                                valueExpr: 'idParalelo',
                                                displayExpr: 'nombre',
                                                //readOnly: true
                                                // dataSource: options => {
                                                //     debugger;
                                                //     return {
                                                //         store: paralelo,
                                                //         filter: options.data
                                                //             ? ["idCurso", "=", options.data.idCurso]
                                                //             : null
                                                //     };
                                                // },
                                            },


                                        }
                                    ]
                                });
                                $("#guardar").dxButton({
                                    text: "Guardar",
                                    type: "success",
                                    //useSubmitBehavior: true
                                    onClick: (e) => {//TODO: Guardar Estudiante
                                        //Validacion de los formularios
                                        console.log($('#form-estudiante').serializeArray());
                                        var form = $("#form").dxForm("instance");
                                        var formPerido = $('#periodos').dxForm('instance');
                                        var result = form.validate();
                                        var resultPeriodo = formPerido.validate();
                                        //console.log(result)
                                        //console.log(resultPeriodo);
                                        //console.log($("#gridContainer").dxDataGrid("getDataSource")._items.length);
                                        let cantidadRepresentantes = $("#gridContainer").dxDataGrid("getDataSource")._items.length;
                                        if(result.isValid && resultPeriodo.isValid){
                                            if(cantidadRepresentantes > 0){
                                                debugger;
                                                alert('ok');
                                                console.log($("#gridContainer").dxDataGrid("getDataSource")._items);
                                                guardar();
                                            }else{
                                                DevExpress.ui.notify("Se debe registrar al menos un representante.", 'warning', 5000);
                                            }

                                        }
                                    }
                                });
                                })
                                .catch(function(error) {
                                    DevExpress.ui.notify(error.data, 'error', 5000);
                                });
                        }
                    }
                ]
            }
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

        //MASTER DETAIL
        masterDetail: {
            enabled: true,
            template: function(container, options) {
                var currentStudentData = options.data;
                $("<div>")
                    .addClass("master-detail-caption")
                    .text(
                        "Representantes del alumno: " +
                            currentStudentData.primerNombre +
                            " " +
                            currentStudentData.primerApellido
                    )
                    .appendTo(container);

                var rep = currentStudentData.representantes;
                if(rep.length > 0){
                $("<div>")
                    .dxDataGrid({
                        columnAutoWidth: true,
                        showBorders: true,
                        columns: [
                            "cedula",
                            {
                                dataField: "nombre"
                            },
                            {
                                dataField: "apellidos"
                            },

                            {
                                dataField: "parentesco"
                            },
                            {
                                dataField: "telefonoMovil"
                            },
                            {
                                dataField: "activo"
                            }
                        ],
                        dataSource: new DevExpress.data.DataSource({
                            store: new DevExpress.data.ArrayStore({
                                key: "id",
                                data: rep
                            })
                            //filter: ["EmployeeID", "=", options.key]
                        })
                    })
                    .appendTo(container);
                }else{
                    $('<h1>').text('no tiene registrando ningun representante.').appendTo(container);
                }
            }
        },
        summary: {
            totalItems: [
                {
                    column: "codigo",
                    summaryType: "count",
                    displayFormat: "Total: {0}"
                }
            ]
        },
        // onEditingStart: e =>{
        //     debugger;
        //     let id = e.data.id;
        //     if(id > 0){
        //         representantes = e.data.representantes;
        //         $scope.dataGridOptionsR = {

        //             dataSource: {
        //                 store: representantes
        //             },
        //             showColumnLines: true,
        //             showRowLines: true,
        //             showBorders: true,
        //             editing: {
        //                 mode: "batch",
        //                 allowAdding: true,
        //                 allowUpdating: true
        //             },
        //             columns: [
        //                 {
        //                     dataField: "cedula",
        //                     caption: "Identificación"
        //                 },
        //                 {
        //                     dataField: "nombre",
        //                     caption: "Nombres"
        //                 },
        //                 {
        //                     dataField: "apellidos",
        //                     caption: "Apellidos"
        //                 },
        //                 {
        //                     dataField: "parentesco",
        //                     caption: "Parentesco"
        //                 },
        //                 {
        //                     dataField: "activo",
        //                     caption: "Activo",
        //                     dataType: "boolean"
        //                 }
        //            ]
        //         };

        //             // new DevExpress.data.CustomStore({
        //             // load: () => {
        //             //         return $http.post('/estudiante/representantes/3')
        //             //         .then(response => {
        //             //             alert(JSON.stringify(response.data));
        //             //             debugger;
        //             //             return response.data;
        //             //         })
        //             //         .catch(error => {
        //             //             DevExpress.ui.notify(error.data, 'error', 5000);
        //             //         })
        //             // }
        //             // })
        //     }
        // },
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
                exportAll: "Exportar"
            }
            //allowExportSelectedData: true
        },
        pager: {
            infoText: "Pagina {0} de {1}",
            showInfo: true,
            showNavegationButtons: true,
            visible: true,
            showPageSizeSelector: true,
            allowedPageSizes: [5, 10, 15]
        },
        paging: {
            enable: true,
            pageIndex: 0,
            pageSize: 5
        },
        searchPanel: {
            visible: true
        },
        editing: {
            mode: "form",
            allowAdding: true,
            allowUpdating: true,
            allowDeleting: true,
            useIcons: true,
            texts: {
                saveRowChanges: "Guardar",
                cancelRowChnages: "Cancelar",
                addRow: "Agregar Nuevo"
            },
            form: {
                colCount: 1,
                items: [
                    {
                        itemType: "group",
                        caption: "Información del Estudiante",
                        colCount: 2,
                        items: [
                            {
                                dataField: "codigo",
                                caption: "Codigo"
                            },
                            {
                                itemType: "empty"
                            },
                            {
                                dataField: "cedula",
                                caption: "Cédula",
                                editorOptions: {
                                    showClearButton: true,
                                    maxLength: 10,
                                    placeholder: "Cédula",
                                    mask: "0000000000",
                                    maskRules: { X: /[0-9]/ }
                                }
                            },
                            {
                                itemType: "empty"
                            },
                            {
                                dataField: "primerNombre",
                                caption: "Primer Nombre",
                                editorOptions: {
                                    showClearButton: true
                                }
                            },
                            {
                                dataField: "segundoNombre",
                                caption: "Segundo Nombre",
                                editorOptions: {
                                    showClearButton: true
                                }
                            },
                            {
                                dataField: "primerApellido",
                                caption: "Apellido Paterno",
                                editorOptions: {
                                    showClearButton: true
                                }
                            },
                            {
                                dataField: "segundoApellido",
                                caption: "Apellido Materno",
                                editorOptions: {
                                    showClearButton: true
                                }
                            },
                            {
                                dataField: "genero",
                                caption: "Genero",
                                editorOptions: {
                                    showClearButton: true,
                                    layout: "horizontal"
                                },
                                editorType: "dxRadioGroup"
                            },
                            {
                                dataField: "telefono",
                                caption: "Teléfono",
                                editorOptions: {
                                    showClearButton: true,
                                    mask: "0000000",
                                    maskRules: { X: /[0-9]/ }
                                }
                            },
                            {
                                dataField: "activo",
                                caption: "Activo",
                                editorType: "dxCheckBox",
                                editorOptions: {
                                    value: true
                                }
                            }
                        ]
                    },
                    {
                        itemType: "group",
                        caption: "Nacimiento",
                        colCount: 2,
                        items: [
                            {
                                dataField: "fechaNacimiento",
                                caption: "Fecha",
                                editorOptions: {
                                    showClearButton: true
                                }
                            },
                            {
                                dataField: "lugarNacimiento",
                                caption: "Lugar",
                                editorOptions: {
                                    showClearButton: true
                                }
                            },
                            {
                                dataField: "nacionalidad",
                                caption: "Nacionalidad",
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
                            //dataSource: "representante"
                        },
                        //TODO:
                        tabs: [
                            {
                                title: "Periodo",
                                icon: "fa fa-calendar",
                                colCount: 2,
                                items: [
                                    {
                                        dataField: "codigoMatricula",
                                        caption: "Código de Matricula",
                                        editorOptions: {
                                            showClearButton: true
                                        }
                                    },
                                    {
                                        dataField: "fechaMatricula",
                                        caption: "Fecha de Matricula",
                                        editorOptions: {
                                            showClearButton: true,
                                            value: new Date()
                                        }
                                    },
                                    {
                                        dataField: "idCurso",
                                        caption: "Curso",
                                        editorOptions: {
                                            showClearButton: true
                                            // onValueChanged: () => {
                                            //     console.log('OK');
                                            // }
                                        },
                                        editorType: "dxSelectBox"
                                    },
                                    {
                                        dataField: "idParalelo",
                                        caption: "Paralelo"
                                    }
                                ]
                            },
                            {
                                //TODO: FAMILIARES
                                title: "Familiares",
                                icon: "fa fa-users",
                                items: [
                                    {
                                        dataField: "representantes[].nombre",
                                        template: function (data, itemElement) {
                                            debugger;
                                            console.log(data.component.option("formData"));
                                            itemElement.append("<div id='textAreaContainer'>")
                                                       .dxTextArea({
                                                           value: data.component.option('formData')[data.dataField],

                                                       });
                                        },
                                        //caption: "Representantes",
                                        // cellTemplate: "cellTemplate",
                                        // itemTemplate: 'city-template',
                                        //editorType: 'dxDataGrid'
                                        // template:
                                        //     '<div class="box-body">' +
                                        //     '<div class="gridEstudiantes" class="demo-containder" ng-app="App" ng-controller="appController">' +
                                        //     '<div id="gridContainer" dx-data-grid="dataGridOptionsR"></div>' +
                                        //     "</div>" +
                                        //     "</div>"
                                        // template:
                                        //     '<div data-options="dxTemplate:{ name:"representanteCellTemplate" }">' +
                                        //     '<div id="gridContainer" dx-data-grid="representanteDataGridOptions"></div>' +
                                        //     "</div>"
                                    }
                                ]
                                // tabTemplate: function (itemData, itemIndex, itemElement) {debugger;
                                //     itemElement.append("<p style='color: red'>" + itemData.items[0].dataField);
                                //},
                                // template: function (itemData, itemIndex, itemElement) {debugger;
                                //         itemElement.append('<div class="box-body">' +
                                //          '<div class="gridEstudiantes" class="demo-containder" ng-app="App" ng-controller="appController">' +
                                //          '<div id="gridContainer" dx-data-grid="dataGridOptionsR"></div>' +
                                //          "</div>" +
                                //          "</div>");
                                // }
                            },
                            {
                                title: "Domicilio",
                                icon: "home",
                                items: [
                                    {
                                        dataField: "direccion",
                                        caption: "Dirección",
                                        editorOptions: {
                                            showClearButton: true
                                        }
                                    }
                                ]
                            },
                            {
                                title: "Emergencia",
                                icon: "fa fa-ambulance",
                                items: []
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
        // selection: {
        //     mode: "multiple"
        // },
        rowAlternationEnabled: true,

        //TODO: TOOLBAR
        onToolbarPreparing: function(e) {
            var dataGrid = e.component;

            e.toolbarOptions.items.unshift(
                {
                    location: "before"
                },
                {
                    location: "after",
                    widget: "dxButton",
                    options: {
                        icon: "refresh",
                        //type: "success",
                        onClick: function() {
                            dataGrid.refresh();
                        }
                    }
                },
                {
                    location: 'after',
                    widget: 'dxButton',
                    options: {
                        icon: 'plus',
                        onClick: () => {
                            $http.get("/estudiante/detail/0")
                            .then(result => {
                                document.getElementById("pages").innerHTML = "";
                                document.getElementById('pages').innerHTML = result.data;

                                $("#form").dxForm({
                                    formData: [],
                                    items: [
                                        {
                                            itemType: 'group',
                                            caption: 'Información Personal',
                                            colCount: 2,
                                            items: [
                                                {
                                                    dataField: 'id',
                                                    visible: false
                                                },
                                                {
                                                    dataField: 'codigo',
                                                    caption: 'Código',
                                                    showClearButton: true,
                                                    editorOptions: {
                                                        disabled: true
                                                    },

                                                },
                                                {
                                                    itemType: 'empty'
                                                },
                                                {
                                                    dataField: 'cedula',
                                                    caption: 'Cédula',
                                                    editorOptions:{
                                                        showClearButton: true,
                                                    }
                                                },
                                                {
                                                    itemType: 'empty'
                                                },
                                                {
                                                    dataField: 'primerNombre',
                                                    caption: 'Primer Nombre',
                                                    validationRules: [
                                                        {
                                                            type: 'required',
                                                            message: 'El campo es requerido'
                                                        }
                                                    ],
                                                    editorOptions: {
                                                        showClearButton: true
                                                    }
                                                },
                                                {
                                                    dataField: 'segundoNombre',
                                                    caption: 'Segundo Nombre',
                                                    validationRules: [
                                                        {
                                                            type: 'required',
                                                            message: 'El campo es requerido'
                                                        }
                                                    ],
                                                    editorOptions: {
                                                        showClearButton: true
                                                    }
                                                },
                                                {
                                                    dataField: 'primerApellido',
                                                    caption: 'Primer Apellido',
                                                    validationRules: [
                                                        {
                                                            type: 'required',
                                                            message: 'El campo es requerido'
                                                        }
                                                    ],
                                                    editorOptions: {
                                                        showClearButton: true
                                                    }
                                                },
                                                {
                                                    dataField: 'segundoApellido',
                                                    caption: 'Segundo Apellido',
                                                    validationRules: [
                                                        {
                                                            type: 'required',
                                                            message: 'El campo es requerido'
                                                        }
                                                    ],
                                                    editorOptions: {
                                                        showClearButton: true
                                                    }
                                                },
                                                {
                                                    dataField: 'fechanacimiento',
                                                    //caption: 'Fecha de Nacimiento',
                                                    label: {text: 'Fecha Nacimiento'},
                                                    editorType: 'dxDateBox',
                                                    editorOptions: {
                                                        width: '100%',
                                                        displayFormat: 'dd/MM/yyyy',
                                                    },
                                                    validationRules: [
                                                        {
                                                            type: 'required',
                                                            message: 'El campo es obligatorio.'
                                                        }
                                                    ]

                                                },

                                                // {
                                                //     dataField: 'lugarNacimiento'
                                                // },
                                                // {
                                                //     dataField: 'nacionalidad'
                                                // },
                                                {
                                                    dataField: 'genero',
                                                    editorType: 'dxRadioGroup',
                                                    validationRules: [
                                                        {
                                                            type: 'required',
                                                            message: 'El campo es obligatorio.'
                                                        }
                                                    ],
                                                    editorOptions: {
                                                        layout: "horizontal",
                                                        dataSource: [
                                                                        {
                                                                            ID: "M",
                                                                            desc: "Masculino"
                                                                        },
                                                                        {
                                                                            ID: "F",
                                                                            desc: "Femenino"
                                                                        }
                                                                    ],
                                                                    displayExpr: "desc",
                                                                    valueExpr: "ID"
                                                    },

                                                },
                                                {
                                                    dataField: 'telefono'
                                                },
                                                {
                                                    itemType: 'empty'
                                                },
                                                {
                                                    dataField: 'direccion',
                                                    colSpan: 2,
                                                    editorType: 'dxTextArea',
                                                    validationRules: [
                                                        {
                                                            type: 'required',
                                                            message: 'El campo es obligatorio.'
                                                        }
                                                    ]
                                                },
                                                {
                                                    dataField: 'activo',
                                                    dataType: 'boolean',
                                                    editorType: 'dxCheckBox'
                                                }

                                            ]
                                        },
                                        /*{
                                            itemType: 'group',
                                            caption: 'Contacto',
                                            colCount: 2,
                                            items: [
                                                {
                                                    dataField: 'telefono'
                                                },
                                                {
                                                    itemType: 'empty'
                                                },
                                                {
                                                    dataField: 'direccion',
                                                    colSpan: 2,
                                                    editorType: 'dxTextArea',
                                                    validationRules: [
                                                        {
                                                            type: 'required',
                                                            message: 'El campo es obligatorio.'
                                                        }
                                                    ]
                                                }
                                            ]
                                        },*/
                                        // {
                                        //     itemType: "button",
                                        //     horizontalAlignment: "left",
                                        //     buttonOptions: {
                                        //         text: "Register",
                                        //         type: "success",
                                        //         useSubmitBehavior: true,
                                        //         onClick: function(e){
                                        //            alert(e);
                                        //            //get data
                                        //            console.log($("#gridContainer").dxDataGrid("getDataSource")._items);
                                        //         }
                                        //     }
                                        // }
                                    ]
                                }).dxForm('instance');
                                //INFORMACION ADICIONAL
                                $('#form_info_adicional').dxForm({
                                    formData: [],
                                    items: [
                                                {
                                                    dataField: 'nacionalidad'
                                                },
                                                {
                                                    dataField: 'lugarNacimiento'
                                                },
                                    ]
                                }).dxForm('instance');
                                //REPRESENTANTE
                                $('#gridContainer').dxDataGrid({
                                    dataSource: [],
                                    owAlternationEnabled: false,
                                    //columnHidingEnabled: true,
                                    columnAutoWidth: true,
                                    showColumnLines: true,
                                    showRowLines: true,
                                    showBorders: true,
                                    columns: [
                                        {
                                            dataField: 'id',
                                            visible: false
                                        },
                                        {
                                            dataField: 'cedula',
                                            caption: 'Cédula',
                                            //width: 30,
                                            validationRules: [
                                                {
                                                    type: 'required',
                                                    message: 'El campo es obligatorio.'
                                                }
                                            ]
                                        },
                                        {
                                            dataField: 'nombre',
                                            caption: 'Nombres',
                                            validationRules: [
                                               {
                                                   type: 'required',
                                                   message: 'El campo es obligatorio.'
                                               }
                                           ]
                                        },
                                        {
                                           dataField:  'apellidos',
                                           caption: 'Apellidos',
                                           validationRules: [
                                               {
                                                   type: 'required',
                                                   message: 'El campo es requerido'
                                               }
                                           ]
                                        },
                                        {
                                            dataField: 'parentesco',
                                            validationRules: [
                                                {
                                                    type: 'required',
                                                    message: 'El campo es requerido'
                                                }
                                            ]
                                        },
                                        {
                                            dataField: 'telefonoMovil',
                                            caption: 'Movil',
                                            validationRules: [
                                                {
                                                    type: 'required',
                                                    message: 'El campo es requerido'
                                                }
                                            ]
                                        },
                                        {
                                            dataField: 'telefonoFijo',
                                            caption: 'Fijo'
                                        },
                                        {
                                            dataField: 'correo'
                                        },
                                        {
                                            dataField: 'activo'
                                        }
                                    ],
                                    summary: {
                                        totalItems: [
                                            {
                                                column: 'cedula',
                                                summaryType: 'count',
                                                displayFormat: 'Total: {0}'
                                            }
                                        ]
                                    },
                                    onEditingStart: e => e.component.columnOption('id','allowEditing', false),
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
                                        editing: {
                                            mode: 'popup',
                                            allowAdding: true,
                                            allowUpdating: true,
                                            allowDeleting: true,
                                            useIcons: true,
                                            texts: {
                                                saveRowChanges: 'Guardar',
                                                cancelRowChanges: 'Cancelar',
                                                confirmDeleteTitle: 'Eliminar Registro',
                                                confirmDeleteMessage: '¿Desea eliminar el registro?'
                                            },
                                            popup: {
                                                title: "Información de Representante",
                                                showTitle: true,
                                                width: 725,
                                                height: 400,
                                                position: {
                                                    my: "center",
                                                    at: "center",
                                                    of: window
                                                }
                                            },
                                        }

                                });
                                //TODO: PERIODOS
                                $('#periodos').dxForm({
                                    formData: [],
                                    colCount: 2,
                                    items: [
                                        {
                                            dataField: 'codigoMatricula',
                                            caption: 'Código Matricula'
                                        },
                                        {
                                            dataField: 'fechaMatricula',
                                            caption: 'Fecha Matricula',
                                            editorType: "dxDateBox",
                                        },
                                        {
                                            dataField: "idCurso",
                                            label: {
                                                text: 'Cursos'
                                            },
                                            validationRules: [
                                                {
                                                    type: "required",
                                                    message: "El curso es requerido"
                                                }
                                            ],
                                            editorType: 'dxSelectBox',
                                            editorOptions: {
                                                dataSource: curso,
                                                valueExpr: "id",
                                                displayExpr: "nombre",
                                                onValueChanged: function(e){
                                                    var form = $('#periodos').dxForm('instance');
                                                    var secondEditor =  form.getEditor("idParalelo");
                                                    secondEditor.getDataSource().filter(['idCurso', '=', e.value]);
                                                    secondEditor._options.readOnly = false;
                                                    secondEditor.getDataSource().load();

                                                }

                                            }


                                        },
                                        {
                                            dataField: 'idParalelo',
                                            label: {
                                                text: 'Paralelos'
                                            },
                                            validationRules: [
                                                {
                                                    type: 'required',
                                                    message: 'El Campo es requerido.'
                                                }
                                            ],
                                            editorType: 'dxSelectBox',
                                            editorOptions: {
                                                dataSource: paralelo,
                                                valueExpr: 'idParalelo',
                                                displayExpr: 'nombre',
                                                //readOnly: true
                                                // dataSource: options => {
                                                //     debugger;
                                                //     return {
                                                //         store: paralelo,
                                                //         filter: options.data
                                                //             ? ["idCurso", "=", options.data.idCurso]
                                                //             : null
                                                //     };
                                                // },
                                            },


                                        }
                                    ]
                                });//TODO: GUARDAR NUEVO
                                $("#guardar").dxButton({
                                    text: "Guardar",
                                    type: "success",
                                    //useSubmitBehavior: true
                                    onClick: (e) => {
                                        //Validacion de los formularios
                                        console.log($('#form-estudiante').serializeArray());
                                        var form = $("#form").dxForm("instance");
                                        var formPerido = $('#periodos').dxForm('instance');
                                        var result = form.validate();
                                        var resultPeriodo = formPerido.validate();
                                        // console.log(result)
                                        // console.log(resultPeriodo);
                                        console.log($("#gridContainer").dxDataGrid("getDataSource")._items.length);
                                        let cantidadRepresentantes = $("#gridContainer").dxDataGrid("getDataSource")._items.length;
                                        if(result.isValid && resultPeriodo.isValid){
                                            if(cantidadRepresentantes > 0){

                                                console.log($("#gridContainer").dxDataGrid("getDataSource")._items);
                                                guardar();
                                            }else{
                                                DevExpress.ui.notify("Se debe registrar al menos un representante.", 'error', 5000);
                                            }

                                        }
                                    }
                                });
                            })
                            .catch(error => {alert(error)})
                        }
                    }
                }
            );
        }
    };
    // $scope.representanteDataGridOptions = {
    //     dataSource: {
    //         store: representantes
    //     },
    //     showColumnLines: true,
    //     showRowLines: true,
    //     showBorders: true,
    // }
    /*$scope.dataGridOptionsR = {
        dataSource: {
            store: representantes
        },
        showColumnLines: true,
        showRowLines: true,
        showBorders: true,
        editing: {
            mode: "batch",
            allowAdding: true,
            allowUpdating: true
        },
        columns: [
            {
                dataField: "cedula",
                caption: "Identificación"
            },
            {
                dataField: "nombre",
                caption: "Nombres"
            },
            {
                dataField: "apellidos",
                caption: "Apellidos"
            },
            {
                dataField: "parentesco",
                caption: "Parentesco"
            },
            {
                dataField: "activo",
                caption: "Activo",
                dataType: "boolean"
            }
        ]
    };*/
});
