var app = angular.module("comportamientoModule", ["ngRoute",'dx']);

/*app.controller("title", function ($scope){
    $scope.modulo = "Informe de comportamiento";
})*/

app.config(function($routeProvider, $locationProvider){
    $locationProvider.hashPrefix("");
    $routeProvider.when("/informe/comportamiento/:idCurso/:idParalelo",{
       templateUrl: "/resources\views\General\Reportes\comportamientoCurso.blade.php"
   })
});


app.controller("informe_comportamientoController", function informe_comportamientoController($http, $scope){
    var datosEstudiantes = new DevExpress.data.CustomStore({
        load: () => {
            var idCurso = $("#idCurso").val();
            var idParalelo = $("#idParalelo").val();
            return $http.post("/ObtenerDatosComportamiento/"+idCurso+"/"+idParalelo)
                .then((response) => {
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
            e.element.find(".dx-pivotgrid-horizontal-headers .dx-grandtotal").first().text("Total");
            e.element.find(".dx-pivotgrid-vertical-headers .dx-grandtotal").first().text("Total");
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

