var app = angular.module('personalModule', ['dx']);

app.controller('title', function($scope){
    $scope.modulo = 'Personal Educativo';
});

app.controller('personalController', function($scope, $http){
    //ROL
    var rol  = new DevExpress.data.CustomStore({
        key: 'id',
        loadMode: 'raw',
        load: () => {
            return $http.post('/profesor/rol')
            .then((response) => {
                return response.data;
            })
            .catch((err) => {
                DevExpress.ui.notify(err.data, 'error',5000);
            })
        },

    });


    //CRUD
    var personal = new DevExpress.data.CustomStore({
        load: () => {
            return $http.post('/personal/all')
            .then((response) => {
                return response.data;
            })
            .catch((err) =>
            {
                DevExpress.ui.notify(err.data, 'error',5000);
            });
        },
        update: (key, values) => {
            let id = JSON.stringify(key['id']);
            if(id !== 0)
            {
                return $http.post('/personal/update/' + id, values)
                .then((response) => {
                    DevExpress.ui.notify(response.data['mensaje'], "success", 5000);
                })
                .catch((err) => {
                    DevExpress.ui.notify(err.data, 'error',5000);
                })
            }

        },
        //Insertar
        insert: (values) => {
            if(values !== null)
            {
                return $http.post('/personal/insert', values)
                .then((response) => {
                    DevExpress.ui.notify(response.data['mensaje'], "success", 5000);
                })
                .catch((err) => {
                    DevExpress.ui.notify(err.data, 'error',5000);
                })

            }

        },
        remove: (key) => {
            let id = key;
            if(id !== 0)
            {
                debugger;
               return $http.post('/personal/remove/' +id)
               .then((response) => {
                    DevExpress.ui.notify(response.data['mensaje'], "success", 5000);
               })
               .catch((err) => {
                    DevExpress.ui.notify(err.data, 'error',5000);
               })
            }
        }
    });//fin data store

    $scope.dataGridOptions = {
        dataSource: {
            store: personal
        },

        rowAlternationEnabled: true,
        columnHidingEnabled: true,
        columnAutoWidth: true,
        columns: [
            {
                dataField: 'cedula',
                caption: 'Cédula',
                validationRules:[
                    {
                        type: 'stringLength',
                        max : 10,
                        min: 10,
                        message: 'debe se 10'
                    },
                    {
                        type: 'required',
                        message: 'El campo es requerido'
                    },


                ]
            },
            {
                dataField: 'primerNombre',
                caption: 'Nombre',
                //fixed: true,
                // calculateCellValue: function(data) {
                //     return [
                //         data.primerNombre, data.primerApellido, data.segundoApellido]
                //         .join(" ");
                // },
                validationRules:[
                    {
                        type: 'required',
                        message: 'El campo es requerido'
                    }
                ]
            },
            {
                dataField: 'primerApellido',
                caption: 'Apellido',
                validationRules:[
                    {
                        type: 'required',
                        message: 'El campo es requerido'
                    }
                ]
            },
            {
                dataField: 'correo',
                caption: 'Correo Electrónico',
                validationRules:[
                    {
                        type: 'required',
                        message: 'El campo es requerido'
                    },
                    {
                        type: 'email'
                    }
                ]
            },
            {
                dataField: 'id_rol',
                caption: 'Rol',
                validationRules:[
                    {
                        type: 'required',
                        message: 'El campo es requerido'
                    }
                ],
                lookup: {
                    dataSource: rol,
                    displayExpr: 'nombre',
                    valueExpr: 'id'
                }

            },
            {
                dataField: 'activo',
                caption: 'Activo',
                validationRules:[
                    {
                        type: 'required',
                        message: 'El campo es requerido'
                    }
                ]
            },
            {
                dataField: 'fechaNacimiento',
                dataType: 'date',
                visible: false,
                format: 'dd/MM/yyyy'
            },
            {
                dataField: 'accesoSistema',
                dataType: 'boolean',
                visible: false
            },
            {
                dataField: 'Genero',
                visible: false,
                lookup:{
                    dataSource: [
                        {
                        "ID": 'M',
                        "desc": "Masculino",
                    },
                {
                    'ID': 'F',
                    'desc': 'Femenino'
                }],
                    displayExpr: 'desc',
                    valueExpr: 'ID'
                }
            },
            {
                dataField: 'segundoNombre',
                visible: false
            },
            {
                dataField: 'segundoApellido',
                visible:false,
                validationRules:[
                    {
                        type: 'required',
                        message: 'El campo es requerido'
                    }
                ]
            },
            {
                dataField: 'direccion',
                visible: false
            },
            {
                dataField: 'telefono',
                visible: false
            }
        ],
        summary: {
            totalItems: [{
                column: "cedula",
                summaryType: "count",
                displayFormat: 'Total: {0}'
            }]
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
        selection: {
            mode: "multiple"
        },
        editing: {
            mode: 'form',
            allowAdding: true,
            allowUpdating: true,
            useIcons: true,
            texts: {
                saveRowChanges: 'Guardar',
                cancelRowChanges: 'Cancelar'
            },
            form: {
                colCount: 2,
                items: [
                    {
                        dataField: 'id_rol',
                        caption: 'Rol',
                        editorOptions: {
                            showClearButton: true
                        }
                        //editorType: 'dxTagBox'
                    },
                    {
                        itemType: 'empty'
                    },
                    {
                        dataField: 'cedula',
                        caption: 'Cedula',
                        editorOptions: {
                            showClearButton: true
                        }
                    },
                    {
                        itemType: 'empty'
                    },
                    {
                        dataField: 'primerNombre',
                        caption:'Primer Nombre',
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
                        dataField: 'fechaNacimiento',
                        caption: 'Fecha Nacimiento',
                        editorOptions: {
                            showClearButton: true
                        }

                    },
                    {
                        dataField: 'Genero',
                        caption: 'Genero',
                        editorOptions: {
                            showClearButton: true
                        }
                        //editorType: 'dxRadioGroup',

                    },
                    {
                        dataField: "activo",
                        caption: 'Activo',
                        dataType: "boolean",

                    },
                    {
                        itemType: 'empty'
                    },
                    {
                        itemType: 'tabbed',
                        tabPanelOptions: {
                            deferRendering: false
                        },
                        colSpan: 2,
                        tabs: [{
                            title: "Contacto",
                            items: [
                                {
                                    dataField: 'direccion',
                                    caption: 'Dirección',
                                    editorOptions: {
                                        showClearButton: true
                                    }
                                },
                                {
                                    dataField: 'correo',
                                    caption: 'Correo Electronico',
                                    editorOptions: {
                                        showClearButton: true
                                    }
                                },
                                {
                                    dataField: 'telefono',
                                    caption: 'Telefono',
                                    editorOptions: {
                                        showClearButton: true
                                    }
                                }
                            ]
                        },
                        {
                            title: "Permisos",
                            items: [
                                {
                                    dataField: 'accesoSistema',
                                    caption: 'Acceso al Sistema'
                                }
                            ]
                        },
                        ]
                    }

                ]
            }
        },
        //tool bar
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
                        onClick: function() {
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
                        onClick: function() {
                            console.log(dataGrid.getSelectedRowsData());
                            //Obtiene el o los dato(s) seleccionados
                            let selectedData = dataGrid.getSelectedRowsData();
                            let idData = selectedData[0].id;
                            //TODO: Realizar un dialog de confirmación de la eliminación de registros
                            //Mejorar pra cuando se selecciones más de un registro

                            // personal.store().remove(idData);
                            //var ds = $("#gridContainer").dxDataGrid("getDataSource");
                            var ds = document.getElementById('gridcontainer').dxDataGrid('getDataSource');
                           ds.store().remove(idData);
                           ds.reload();

                        }

                    }
                }
            );
        }

    }
})
