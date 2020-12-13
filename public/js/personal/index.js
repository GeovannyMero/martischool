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

    //periodo
    var periodo = new DevExpress.data.CustomStore({
        key: 'id',
        loadMode: 'raw',
        load: () => {
            return $http.post('/planificacion/periodoActual/2020')
            .then((response) => {
                return response.data;
            })
            .catch((err) => {
                DevExpress.ui.notify(err.data, 'error', 5000);
            })
        }
    })


    //CRUD
    var personal = new DevExpress.data.CustomStore({
        load: () => {
            return $http.post('/personal/all')
            .then((response) => {
                console.log(JSON.stringify(response.data));
                return response.data;
            })
            .catch((err) =>
            {
                DevExpress.ui.notify(err.data, 'error',5000);
            });
        },
        update: (key, values) => {
            //debugger;
            //alert(values['planificacion_id']);
           // debugger;
            //console.log(key["planificacion_id"] == null ? 0 : 1);
            let id = JSON.stringify(key['id']);
            //let planificacion = ;
            // let datos = {
            //     planificacion_id: JSON.stringify(key['planificacion_id']),
            //     data: values
            // }

            let planificacion = key['planificacion_id'] == null ? values['planificacion_id'] : key['planificacion_id'];
            if(id !== 0)
            {
                return $http.post('/personal/update/' + id + "/" + planificacion, values)
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
            //debugger;
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
            let id = key.id;
            if(id !== 0)
            {
                debugger;
               return $http.post('/personal/remove/' +id)
               .then((response) => {
                DevExpress.ui.notify({
                    message: response.data['mensaje'],
                    position: {
                        my: 'center top',
                        at: 'center top',
                        offset: '50 60'

                    },
                    width: 400,

                }, 'success', 3000)
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

        rowAlternationEnabled: false,
        columnHidingEnabled: true,
        columnAutoWidth: true,
        showColumnLines: true,
        showRowLines: true,
        showBorders: true,
        columns: [
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
                dataField: 'planificacion_id',
                caption: 'Cursos',
                visible: false,
                lookup: {
                    dataSource: periodo,
                    displayExpr:  data => data.periodo_inicio + " - " + data.curso + ' - ' + data.paralelo,
                    valueExpr: 'planificacion_id'
                }
            },
            {
                dataField: 'activo',
                caption: 'Activo',
                dataType: 'boolean',
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
                visible: false,
                validationRules: [
                    {
                        type: 'required',
                        message: "El campo es requerido."
                    }
                ]
            },
            {
                dataField: 'telefono',
                visible: false
            }
        ],
        masterDetail: {
            enabled: true,
            template: '<h3>Cursos Asignados</h3>'
        },
        summary: {
            totalItems: [{
                column: "cedula",
                summaryType: "count",
                displayFormat: 'Total: {0}'
            }]
        },
        onCellPrepared: function(e){
            if(e.rowType === 'data'){
                var $links = e.cellElement.find(".dx-link");
                if(e.row.data.activo === false) {
                    $links.filter(".dx-link-delete").remove();
                }
            }
        },
        //TODO: cambiar el color de ROW
        // onRowPrepared: function(e){
        //     if(e.rowType === 'data'){
        //         // var $links = e.cellElement.find(".dx-link");
        //         if(e.data.activo === false) {
        //             debugger;

        //             e.rowElement.css("background-color", "#f7b5b5");
        //            // e.rowElement.className.remove("dx-row-alt", "");

        //         }
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
            fileName: "personal",
            texts: {
                exportAll: 'Exportar'
            }
            //allowExportSelectedData: true
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
        // selection: {
        //     mode: "multiple"
        // },

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
                                dataField: 'id_rol',
                                caption: 'Rol',
                                editorOptions: {
                                    showClearButton: true,
                                    placeholder: 'Seleccionar'
                                },
                                //editorType: 'dxTagBox'
                            },
                            {
                                itemType: 'empty'
                            },
                            {
                                dataField: 'cedula',
                                caption: 'Cedula',
                                editorOptions: {
                                    showClearButton: true,
                                    maxLength: 10,
                                    placeholder: 'Cédula',
                                    //showSpinButtons: true,
                                    mask: "0000000000",
                                    maskRules: {"X": /[0-9]/}
                                },
                               //editorType: 'dxNumberBox'
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
                                    showClearButton: true,
                                    layout: "horizontal"
                                },
                                editorType: 'dxRadioGroup',



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
                                    //animationEnabled: true,
                                    deferRendering: false
                                },
                                colSpan: 2,
                                tabs: [{
                                    title: "Contacto",
                                    colCount: 2,
                                    icon: 'fa fa-address-book',
                                    items: [

                                        {
                                            dataField: 'correo',
                                            caption: 'Correo Electrónico',
                                            editorOptions: {
                                                showClearButton: true
                                            }
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
                                            dataField: 'direccion',
                                            colSpan: 2,
                                            caption: 'Dirección',
                                            editorOptions: {
                                                showClearButton: true
                                            }
                                        },
                                    ]
                                },
                                {
                                    title: "Permisos",
                                    icon: 'key',
                                    items: [
                                        {
                                            dataField: 'accesoSistema',
                                            caption: 'Acceso al Sistema'
                                        }
                                    ]
                                },
                                {
                                    title: 'Cursos Asignados',
                                    icon: 'fa fa-graduation-cap',
                                    badge: '1',
                                    items: [
                                        {
                                            dataField: 'planificacion_id',
                                            caption: 'planificacion_id',
                                            editorOptions: {
                                                showClearButton: true,
                                                placeholder: 'Seleccionar'
                                            },
                                            //editorType: 'dxTagBox'
                                        },
                                    ]
                                }
                                ]
                            }

                        ]
                    }

                ]//kk
            }
        },
        //tool bar
        onToolbarPreparing: e => {
            var dataGrid = e.component;

            e.toolbarOptions.items.unshift(
                {
                    location: 'after',
                },
                {
                    location: 'after',
                    widget: 'dxButton',
                    options: {
                        icon: 'refresh',
                        //type: 'success',
                        onClick: function() {
                            dataGrid.refresh();
                        }
                    }
                },
                // {
                //     location: 'after',
                //     widget: 'dxButton',
                //     options: {
                //         icon:'trash',
                //         //type: 'danger',
                //         onClick: function() {
                //             //console.log(dataGrid.getSelectedRowsData());
                //             //Obtiene el o los dato(s) seleccionados
                //             let selectedData = dataGrid.getSelectedRowsData();
                //             let idData = selectedData[0].id;
                //             //TODO: Realizar un dialog de confirmación de la eliminación de registros
                //             //Mejorar pra cuando se selecciones más de un registro
                //             // personal.store().remove(idData);
                //             var ds = $("#gridContainer").dxDataGrid("getDataSource");
                //             ds.store().remove(idData);
                //            ds.reload();

                //         }

                //     }
                // }
            );
        }

    }
})
