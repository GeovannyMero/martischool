var app = angular.module("comportamientoModule", ['dx']);

app.controller("title", function ($scope){
    $scope.modulo = "Informe de comportamiento";
})


app.controller("informe_comportamientoController", function informe_comportamientoController($http, $scope){
    var datosEstudiantes = new DevExpress.data.CustomStore({
        load: () => {
            return $http.post("/ObtenerDatosComportamiento")
                .then((response) => {
                    console.log(response);
                    return response.data;
                })
                .catch(error => {
                    DevExpress.ui.notify(error.data, "error", 5000);
                })
        }
    });
    $scope.pivotGridOptions = {
        allowSortingBySummary: true,
        allowSorting: true,
        allowFiltering: true,
        allowExpandAll: true,
        height: 500,
        showBorders: true,
        showRowTotals: false,
        showRowGrandTotals: true,
        fieldPanel: {
            // ...
            visible: false // shows the Field Panel
        },
        fieldChooser: {
            enabled: false
        },
        export: {
            enabled: false
        },
        onContentReady: function(e) {
            e.element.find(".dx-pivotgrid-horizontal-headers .dx-grandtotal").first().text("Promedio");
            e.element.find(".dx-pivotgrid-vertical-headers .dx-grandtotal").first().text("Promedio");
        },
        dataSource: {
            fields: [{
                caption: "Estudiante",
                width: 300,
                dataField: "alumno",
                area: "row"
            },
                {
                    dataField: "quintil",
                    dataType: "string",
                    area: "column",
                    expanded: true
                },
                {
                dataField: "parcial",
                dataType: "string",
                area: "column"
            }, {
                caption: "notas",
                dataField: "nota",
                dataType: "number",
                summaryType: "sum",
                //format: "currency",
                area: "data"
            }],
            store: datosEstudiantes
        }
    }
});
