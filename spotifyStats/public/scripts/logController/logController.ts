interface logInterface {
    login(): void;
}

class logController {
    constructor($scope: logInterface, $http: angular.IHttpService, $rootScope: angular.IRootScopeService, $window) {
        $scope.login = () => {
            $http.get("http://localhost:1337/login").then(
                value => $window.location.href = value.data,
                err => console.error(err)
            );
        }
    }
}

app.controller("logController", logController);

app.config(function ($stateProvider) {
    $stateProvider
        .state('log', {
            url: '/log',
            controller: 'logController',
            templateUrl: "log.html"
        })

});