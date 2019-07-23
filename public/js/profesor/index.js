var app = angular.module('profesorModule',['dx']);

app.controller('title', function title($scope){
    $scope.modulo = 'Profesor';
});

app.controller('profesorController', function profesorController($http, $scope){
    var profesores = new DevExpress.data.CustomStore({
        load: () => {
            return $http.post('/profesor/all')
            .then((response) => {
                return response.data;
            })
            .catch((err) => {
                DevExpress.ui.notify(err.data, 'error',5000);
            })
        }
    });

    //opciones grid
    $scope.dataGridOptions  = {
        dataSource: {
            store: profesores
        }
    }
})

