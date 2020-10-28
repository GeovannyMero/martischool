var parciales = {
    store: new DevExpress.data.CustomStore({
        key: 'id',
        loadMode: 'raw',
        load: () => {
            return $.getJSON('/parciales/parciales')
            .done(response => {
                //console.log(" => "+ (JSON.stringify(response[0].id)));
                response;

            })
        },

    }),
    group: 'descripcion',
}

appNotas.controller('comportamientoController', function comportamientoController($http, $scope, $window){

    let idCurso = document.getElementById('idCurso').value;

    var estudiantesPorCurso = new DevExpress.data.CustomStore({
        load: () => {
            return $http.post('/notas/comportamientoPorCurso/' + idCurso)
            .then(response => {
                //console.log(response.data);
                $scope.cantidadEstudiante = response.data.length;
                return response.data;
            })
            .catch(error => {
                DevExpress.ui.notify(error.data['mensaje'], 'error', 5000);
            })
        }
    });
    //toolbar
    $scope.toolbarOptions = {
        items: [
            {
                location: 'before',
                widget: 'dxButton',
                options: {
                    type: 'back',
                    text: 'Back',
                    onClick: function() {
                        $window.location.href = '/notas'
                        DevExpress.ui.notify("Back button has been clicked!");
                    }
                }
            },
            {
                location: 'before',
                widget: 'dxButton',
                locateInMenu: 'auto',
                options: {
                    icon: "refresh",
                    onClick: function() {
                        //DevExpress.ui.notify("Refresh button has been clicked!");
                        $('#gridContainer').dxDataGrid("instance").refresh();
                    }
                }
            },
            {
                location: 'before',
                widget: 'dxSelectBox',
                //locateInMenu: 'auto',
                options: {
                    width: 240,
                    dataSource: parciales,
                    displayExpr: "nombre",
                    valueExpr: "id",
                    grouped: true,
                    value: 1,

                    onValueChanged: function(args) {
                            estudiantesPorCurso.load()
                                .done(function (data) {
                                    //debugger;
                                    //console.log(JSON.stringify(data.filter(p => p.parcial_id === args.value)));
                                    $('#nota').dxTextBox({
                                        value: 0
                                    })
                                    $('#gridContainer').dxDataGrid({
                                        dataSource: data.filter(p => p.parcial_id === args.value)
                                    });
                                    //return data.filter(p => p.parcial_id === args.value);
                                })
                                .fail(function (error) {
                                    debugger;
                                    DevExpress.ui.notify(error, 'error', 5000);
                                    alert('>KI' + error);
                                });

                        estudiantesPorCurso.load();
                    }
                }
            },
            {
                location: 'center',
                widget: 'dxCheckBox',
                locateInMenu: 'auto',
                options: {
                    text: 'positivos',
                    //icon: "refresh",
                    onClick: function() {
                        DevExpress.ui.notify("Refresh button has been clicked!");
                    }
                }
            },
            {
                location: 'center',
                widget: 'dxCheckBox',
                locateInMenu: 'auto',
                options: {
                    text: 'Negativos',
                    //icon: "refresh",
                    onClick: function() {
                        DevExpress.ui.notify("Refresh button has been clicked!");
                    }
                }
            },
            // {
            //     location: 'center',
            //     locateInMenu: 'never',
            //     template: function() {
            //         return $("<div class='toolbar-label'><b>Tom's Club</b> Products</div>");
            //     }
            // },
            {
                location: 'after',
                widget: 'dxButton',
                locateInMenu: 'auto',
                options: {
                    text: 'Agregar',
                    icon: "plus",
                    onClick: function(e) {
                        debugger;
                        //TODO: Detalles de comportamiento.
                        var dataGrid = $("#gridContainer").dxDataGrid("instance");
                        var selectedRowsData = dataGrid.getSelectedRowsData();
                        //alert(JSON.stringify(selectedRowsData[0].comportamientoId));
                        let comportamientoId = selectedRowsData[0].comportamientoId
                        $("#detallesPopup").dxPopup({
                            title: "Detalle de Comportamiento",
                            width: 570,
                            height: 300,
                            contentTemplate: (e) => {
                                //return $("<p />").text("Popup content");
                                var tipos = ['Positivo', 'Negativo'];
                                var formDetallesContainer = $("<div id='formDetalles'>");
                                    formDetallesContainer.dxForm({
                                        formData: {
                                            'fecha': '',
                                            'tipo': '',
                                            'comentario': '',
                                            'comportamientoId': comportamientoId
                                        },
                                        colCount: 2,
                                        items: [
                                            {
                                                dataField: 'comportamientoId',
                                                visible: false
                                            },
                                            {
                                                dataField: 'fecha',
                                                caption: 'Fecha',
                                                dataType: 'date',
                                                editorType: 'dxDateBox',
                                                editorOptions: {
                                                    displayFormat: "dd/MM/yyyy"
                                                },
                                                validationRules: [
                                                    {
                                                        type: 'required',
                                                        message: 'El campo es requerido.'
                                                    }
                                                ]
                                            },
                                            {
                                                dataField: 'tipo',
                                                caption: 'Tipo',
                                                editorType: 'dxRadioGroup',
                                                editorOptions: {
                                                    dataSource: tipos,
                                                    layout: "horizontal"
                                                },
                                                validationRules: [
                                                    {
                                                        type: 'required',
                                                        message: 'El campo es requerido.'
                                                    }
                                                ]
                                            },
                                            {
                                                dataField: 'comentario',
                                                caption: 'Comentario',
                                                editorType: 'dxTextArea',
                                                colSpan: 2,
                                                validationRules: [
                                                    {
                                                        type: 'required',
                                                        message: 'El campo es requerido'
                                                    }
                                                ]
                                            },
                                            {
                                                itemType: 'empty',
                                                colSpan: 2
                                            },
                                            {
                                                itemType: 'button',
                                                alignment: "right",
                                                buttonOptions: {
                                                    text: "Guardar",
                                                    useSubmitBehavior: true,
                                                    onClick: function () {
                                                        debugger;
                                                        alert('Obtener datos');
                                                        var form = $("#formDetalles").dxForm("instance");
                                                        var data = form.option("formData");
                                                        alert(JSON.stringify(data));
                                                        $http.post('/detallesComportamiento/guardarDetalles', data)
                                                        .then(response => {
                                                            alert(JSON.stringify(response.data));
                                                        })
                                                        .catch(error => {
                                                            alert(error);
                                                        })
                                                    }
                                                }
                                            },
                                            {
                                                itemType: 'button',
                                                alignment: "left",
                                                buttonOptions: {
                                                    text: 'Cancelar',
                                                    onClick: () =>  {
                                                        $("#detallesPopup").dxPopup("hide");
                                                    }
                                                }
                                            }
                                        ]
                                    }).dxForm('instance');
                                    e.append(formDetallesContainer);
                                }
                        });

                        $("#detallesPopup").dxPopup("show");
                    }
                }
            },

        ]
    };
    //grid

    //opciones Grid
    $scope.dataGridOptions = {
        dataSource: {
            store: estudiantesPorCurso
        },
        showBorders: true,
        selection: {
            mode: "single"
        },
        columns: [
            {
                dataField: 'id',
                width:50
            },
            {
                dataField: 'primerNombre',
                caption: 'Estudiante',
                calculateCellValue: function(data) {
                    return [
                        data.primerNombre, data.segundoNombre, data.primerApellido, data.segundoApellido]
                        .join(" ");
                },
            }
        ],
        onSelectionChanged: function (selectedItems) {
           //$scope.selectedEmployee = selectedItems.selectedRowsData[0];
           //obtener la nota
           debugger;
           let nota = selectedItems.selectedRowsData.length > 0 ? selectedItems.selectedRowsData[0].nota : 0;
            //alert(nota);
           //alert(JSON.stringify(selectedItems.selectedRowsData[0]));
           $('#calificacion').html('Calificación');
           $('#nota').dxTextBox({
               value: nota,
               width: 90,
               buttons: [{
                name: "password",
                location: "after",
                options: {
                    icon: "edit",
                    stylingMode: "text",
                    onClick: function() {
                        $("#notaPopup").dxPopup({
                            title: "Ingrese la Calificación",
                            width: 280,
                            height: 250,
                            contentTemplate: function (e) {
                                //TODO: NOTA.
                                var formContainer = $("<div id='form'>");
                                formContainer.dxForm({
                                    formData: selectedItems.selectedRowsData[0],
                                    showValidationSummary: true,
                                    colCount: 2,
                                    items: [

                                        {
                                            dataField: 'id',
                                            visible: false
                                        },
                                        {
                                            dataField: 'parcial_id',
                                            caption: 'Parcial',
                                            colSpan: 2,
                                            editorType: 'dxSelectBox',
                                            editorOptions: {
                                                dataSource: parciales,
                                                displayExpr: 'nombre',
                                                valueExpr: "id",
                                                grouped: true,
                                                displayExpr: "nombre",
                                                },
                                            validationRules: [
                                                {
                                                    type: 'required',
                                                    message: 'El campo es requerido.'
                                                }
                                            ]
                                        },
                                        {
                                            dataField: 'nota',
                                            colSpan: 2,
                                            validationRules: [
                                                {
                                                    type: 'required',
                                                    message: 'El campo es requerido'
                                                }
                                            ]
                                        },
                                        {
                                            itemType: 'empty',
                                            colSpan: 2
                                        },
                                        {
                                            itemType: 'button',
                                            alignment: "right",
                                            buttonOptions: {
                                                text: "Guardar",
                                                useSubmitBehavior: true,
                                                onClick: function () {
                                                   // var a = $('#nota').dxTextBox('instance').option('value');
                                                    var form = $("#form").dxForm("instance");
                                                    var data = form.option("formData")
                                                    //alert(JSON.stringify(data));
                                                    $http.post('/notas/guardarNota', data)
                                                    .then(response => {
                                                        response.data;
                                                        $("#notaPopup").dxPopup("hide");
                                                    })
                                                    .catch(error => {
                                                        DevExpress.ui.notify(error.data, 'error', 5000);
                                                    })
                                                }
                                            }
                                        },
                                        {
                                            itemType: 'button',
                                            alignment: "left",
                                            buttonOptions: {
                                                text: 'Cancelar',
                                                onClick: () =>{
                                                    $("#notaPopup").dxPopup("hide");
                                                }
                                            }
                                        }
                                    ]
                                }).dxForm('instance');
                                e.append(formContainer);
                             }
                        });
                        $("#notaPopup").dxPopup("show");
                    }
                }
            }]

           });
           //TODO: componente para detalles
           let comportamientoId = selectedItems.selectedRowsData[0].comportamientoId;
           if(comportamientoId > 0)
           {
               debugger;
                let detalles = $http.post('/detallesComportamiento/detalles/' + comportamientoId)
                .then(response => {
                    $scope.detallesComportamiento = response.data;
                    $('#detalles').dxDataGrid({
                        dataSource: response.data,
                        // onCellPrepared: function(options){
                        //   var fieldData = options.value;
                        //     var fieldHtml = "";
                        //       //if(fieldData && fieldData.value){
                        //         if(fieldData === 'P'){
                        //             fieldHtml += "<span style = 'color: red'>POSITIVO</span>";
                        //         }
                        //         options.cellElement.html(fieldHtml);
                        //      //}


                        // },
                        columns: [
                            {
                                dataField: 'fecha',
                            },
                            {
                                dataField: 'tipo',
                                cellTemplate: (container, options) => {

                                    if(options.data.tipo == 'P'){
                                        debugger;
                                        return $("<span style='color: white; background-color: green'>Positivo</span>");
                                    }else{
                                        return $("<span style='color: white; background-color: red'>Negativo</span>");
                                    }
                                }
                            },
                            {
                                dataField: 'comentario'
                            }
                        ]
                    })
                })
                .catch(error => {
                    alert(JSON.stringify(error));
                })
           }else{
               DevExpress.ui.notify('ERROR');
           }

        },
    }


});
