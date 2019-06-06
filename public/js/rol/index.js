var app = angular.module('RolModule', ['dx']);

app.controller('rolController', function rolController($scope, $http){
    var roles = DevExpress.data.CustomStore({
        load: () => {
            return $http.post('/rol/all')
            .the((response)=>{
                return response.data;
            })
            .catch((err)=>{
                console.log(err);
            })
        }
    })
});
