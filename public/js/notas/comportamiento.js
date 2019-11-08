var parciales = {
    store: new DevExpress.data.CustomStore({
        key: 'id',
        loadMode: 'raw',
        load: () => {
            return $.getJSON('/parciales/parciales')
            .done(response => {
                console.log(" => "+ (JSON.stringify(response[0].id)));
                response;

            })
        },

    }),
    group: 'descripcion',
}

appNotas.controller('comportamientoController', function comportamientoController($http, $scope, $window){

    let idCurso = document.getElementById('idCurso').value;
    //toolbar
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
                                    debugger;
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
                    onClick: function() {

                        $("#simplePopup").dxPopup({
                            title: "Popup Title",
                            contentTemplate: function () {
                                return $("<p />").text("Popup content");
                                }
                        });
                        $("#simplePopup").dxPopup("show");
                                    //DevExpress.ui.notify("Refresh button has been clicked!");
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
           let nota = typeof selectedItems.selectedRowsData[0].nota === 'undefined' ? 0 : selectedItems.selectedRowsData[0].nota;
            debugger;
           alert(JSON.stringify(selectedItems.selectedRowsData[0]));
           $('#calificacion').html('Calificación');
           $('#nota').dxTextBox({
               value: typeof selectedItems.selectedRowsData[0].nota === 'undefined' ? 0 : selectedItems.selectedRowsData[0].nota,
               width: 80,
               buttons: [{
                name: "password",
                location: "after",
                options: {
                    icon: "edit",
                    stylingMode: "text",
                    //type: "success",
                    onClick: function() {

                        $("#notaPopup").dxPopup({
                            title: "Ingrese la Calificación",
                            width: 280,
                            height: 250,

                            contentTemplate: function (e) {
                                // var boton = $('#btnSave').dxButton({
                                //     text: 'save'
                                // })
                                // var a = $("<div />").attr('id', 'notaContainner').dxTextBox({
                                //     value: 5
                                // }).dxTextBox('instance');
                                // var c = a.option('value');

                                //alert(c);
                                // contentElement.append(
                                //     $('<div />').attr('id', 'nota').dxTextBox({
                                //         value: 5,
                                //         width: 80,

                                //     }),
                                //     $('<div />').attr('id', 'buttonContainner').dxButton({
                                //         text: 'Guardar',
                                //         onClick: function(){


                                //         }
                                //     })
                                // )


                                var formContainer = $("<div id='form'>");
                                formContainer.dxForm({
                                    formData: selectedItems.selectedRowsData[0],
                                    showValidationSummary: true,
                                    items: [

                                        {
                                            dataField: 'id',
                                            visible: false
                                        },
                                        {
                                            dataField: 'parcial_id',
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
                                            validationRules: [
                                                {
                                                    type: 'required',
                                                    message: 'El campo es requerido'
                                                }
                                            ]
                                        },
                                        {
                                            itemType: 'button',
                                            alignment: "left",
                                            buttonOptions: {
                                                text: "Guardar",
                                                useSubmitBehavior: true,
                                                onClick: function () {
                                                   // var a = $('#nota').dxTextBox('instance').option('value');
                                                    var form = $("#form").dxForm("instance");
                                                    var data = form.option("formData")
                                                    alert(JSON.stringify(data));
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
                                            alignment: "right",
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

           })
        },

        //
        // onToolbarPreparing: function(e){
        //     var dataGrid = e.component;

        //     e.toolbarOptions.items.unshift({
        //         location: 'before',

        //     },
        //     {
        //         location: 'before',
        //         widget: 'dxSelectBox',
        //         options: {
        //             width: 200,

        //         }
        //     },
        //     {
        //         location: 'before',
        //         widget: 'dxCheckBox',
        //         options: {
        //             text: 'Positivo'
        //         }
        //     },
        //     {

        //             location: 'before',
        //             widget: 'dxButton',
        //             options: {
        //                 text: 'Añadir'
        //             }

        //     })
        // }
        //

    }


});

