var appAdmin = angular.module("EscuelaAdministradorModule", ['dx']);

appAdmin.controller('administradoresController', function administradoresController($scope, $http){
    var idEscuela = $('#idEscuela').val();
    console.log(idEscuela);
    $scope.pb = 'dd';
    var administradores = new DevExpress.data.CustomStore({
        load: () => {
            return $http.post('/escuela/administradores/'+ idEscuela)
            .then(response => {
                return response
            })
            .catch(error => console.error(error));
        },
        insert: (values) => {
            return $http.post("/escuela/administrador/insertar/" + idEscuela, values)
            .then(response => {
                DevExpress.ui.notify(response.data["mensaje"], "success", 5000);
            }).catch(error => {
                DevExpress.ui.notify(error.data, "error", 5000);
            })
        },
        update: (key, values) => {
            let id = JSON.stringify(key['id']);
            if(id !== 0)
            {
               return $http.post("/escuela/administrador/actualizar/" + id, values)
               .then(response => {
                   DevExpress.ui.notify(response.data["mensaje"], "success", 5000);
               })
               .catch(error => {
                   DevExpress.ui.notify(error.data, "error", 5000);
               })
            }

        },
        remove: (key) => {
            let id = JSON.stringify(key["id"]);
            if(id > 0)
            {
                return $http.post("/escuela/administrador/eliminar/" + id)
                .then(response => {
                    DevExpress.ui.notify(response.data["mensaje"], "success", 5000);
                })
                .catch(error => {
                    DevExpress.ui.notify(error.data, "error", 5000);
                })
            }
        }
    });

    $scope.dataGridOptions = {
        dataSource: {
            store: administradores
        },
        rowAlternationEnabled: true,
        columnHidingEnabled: true,
        columnAutoWidth: true,
        columns: [
            {
                dataField: 'id',
                caption: 'Id',
                visible: false
            },
            {
                dataField: 'cedula',
                caption: 'Cédula',
                validationRules:[
                    {
                        type: 'stringLength',
                        max : 10,
                        min: 10,
                        message: 'La longitud debe ser igual a 10.'
                    },
                    {
                        type: 'required',
                        message: 'El campo es requerido'
                    },


                ]
            },
            {
                dataField: "primerNombre",
                caption: "Primer Nombre",
                validationRules:[
                    {
                        type: 'required',
                        message: 'El campo es requerido'
                    }
                ]
            },
            {
                dataField: "segundoNombre",
                caption: "Segundo Nombre",
                validationRules:[
                    {
                        type: 'required',
                        message: 'El campo es requerido'
                    }
                ]
            },
            {
                dataField: "primerApellido",
                caption: "Primer Apellido",
                validationRules:[
                    {
                        type: 'required',
                        message: 'El campo es requerido'
                    }
                ]
            },
            {
                dataField: "segundoApellido",
                caption: "Segundo Apellido",
                validationRules:[
                    {
                        type: 'required',
                        message: 'El campo es requerido'
                    }
                ]
            },
            {
                dataField: "nombreUsuario",
                caption: 'usuario'
            },
            {
                dataField: "correo",
                caption: 'Correo',
                validationRules:[
                    {
                        type: 'required',
                        message: 'El campo es requerido'
                    },
                    {
                        type: 'email',
                        message: 'El correo es invalido'
                    }
                ]
            },
            {
                dataField: "activo",
                caption: "Activo",
                dataType: 'boolean',
                validationRules:[
                    {
                        type: 'required',
                        message: 'El campo es requerido'
                    }
                ]
            }
        ],
        onCellPrepared: function(e){
            if(e.rowType === 'data'){
                var $links = e.cellElement.find(".dx-link");
                if(e.row.data.activo === false) {
                    $links.filter(".dx-link-delete").remove();
                }
            }
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
                saveRowChanges: 'Guardar',
                cancelRowChanges: 'Cancelar',
                confirmDeleteTitle: 'Eliminar Registro',
                confirmDeleteMessage: "¿Está ud. seguro que desea eliminar este registro?"
            },
            form: {
                colCount: 1,
                items: [
                    {
                        itemType: 'group',
                        caption: 'Información de Personal',
                        colCount: 2,
                        items: [
                            {
                                dataField: 'id',
                                disabled: true,
                                visible: false
                            },

                            {
                                dataField: 'cedula',
                                editorOptions: {
                                    showClearButton: true
                                }
                            },
                            {
                                itemType: 'empty'
                            },
                            {
                                dataField: 'primerNombre',
                                editorOptions: {
                                    showClearButton: true
                                }
                            },
                            {
                                dataField: 'segundoNombre',
                                editorOptions: {
                                    showClearButton: true
                                }
                            },
                            {
                                dataField: 'primerApellido',
                                editorOptions: {
                                    showClearButton: true
                                }
                            },
                            {
                                dataField: 'segundoApellido',
                                editorOptions: {
                                    showClearButton: true
                                }
                            },
                            {
                                dataField: 'correo',
                                editorOptions: {
                                    showClearButton: true
                                }
                            },
                            {
                                dataField: "activo",
                                caption: 'Activo',
                                dataType: "boolean",

                            },

                        ]
                    }
                ]

            }
        }

    }
});
// $(function(){
//     var IdEscuela = $('#idEscuela').val();
//     debugger;
//     $.ajax({
//         type:'POST',
//         url:'/escuela/administradores/' + IdEscuela,
//         headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
//         success:function(data){
//            console.log(data);
//         }
//      });
//     var administradores = new DevExpress.data.CustomStore({
//         load: () => {
//             var d = $.Deferred();
//             return $.ajax({
//                 type:'POST',
//                 url:'/escuela/administradores/' + IdEscuela,
//                 headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
//                 success:function(data){
//                    console.log(data);
//                    d.resolve(data);
//                 },
//                 error: function(error){
//                     console.log(error);
//                 }
//              });
//         }
//     });
// $('#gridEscuelaAdministradores').dxDataGrid({
//     dataSource: [],
//     rowAlternationEnabled: true,
//     columnHidingEnabled: true,
//     columnAutoWidth: true,
//     columns: [
//         {
//             dataField: "cedula",
//             caption: "Cédula"
//         },
//         {
//             dataField: "Nombre",
//             caption: "Nombres"
//         },
//         {
//             dataField: "apellidos",
//             caption: "apellidos"
//         },
//         {
//             dataField: "usuario",
//             caption: "usuario"
//         }
//     ],
//     showBorders: true,
//     filterRow: {
//         visible: false
//     },
//     pager: {
//         infoText: 'Página {0} de {1}',
//         showInfo: true,
//         showNavegationButtons: true,
//         visible: true,
//         showPageSizeSelector: true,
//         allowedPageSizes: [5,10,15]
//     },
//     paging: {
//         enabled: false
//     }
// })

// })
