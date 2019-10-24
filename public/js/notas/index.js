var appNotas = angular.module('notasModule', ['ngRoute']);

appNotas.config(function($routeProvider, $locationProvider){
    $locationProvider.hashPrefix('');
    $routeProvider.when('/notas/comportamiento/:idCurso/:idParalelo',{
        templateUrl: "/resources\views\General\Notas\comportamiento.blade.php"
    })
    .otherwise({redirectTo: '/home'});
});
