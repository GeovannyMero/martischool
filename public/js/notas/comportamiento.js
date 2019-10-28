appNotas.controller('comportamientoController', function comportamientoController($http, $scope){
    debugger;
    let idCurso = document.getElementById('idCurso').value;
    var vm = this;
    // $http.post('/notas/comportamientoPorCurso/'+idCurso)
    // .then(response => {
    //     console.log(response.data);
    //     $scope.estudiantesPorCurso = response.data;
    // })
    // .catch(error => {
    //     alert(error);
    // })
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
                        DevExpress.ui.notify("Refresh button has been clicked!");
                    }
                }
            },
            {
                location: 'before',
                widget: 'dxSelectBox',
                locateInMenu: 'auto',
                options: {
                    width: 140,
                    items: [],
                    valueExpr: "id",
                    displayExpr: "text",
                    value: "",
                    onValueChanged: function(args) {
                        // if(args.value > 1) {
                        //     productsStore.filter("type" , "=", args.value);
                        // } else {
                        //     productsStore.filter(null);
                        // }
                        // productsStore.load();
                    }
                }
            },
            {
                location: 'before',
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
                location: 'before',
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
    }

    var estudiantesPorCurso = new DevExpress.data.CustomStore({
        load: () => {
            return $http.post('/notas/comportamientoPorCurso/' + idCurso)
            .then(response => {
                console.log(response.data.length);
                $scope.cantidadEstudiante = response.data.length;
                return response.data;
            })
            .catch(error => {
                DevExpress.ui.notify(error.data['mensaje'], 'error', 5000);
            })
        }
    });

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
           $scope.selectedEmployee = selectedItems.selectedRowsData[0];
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



