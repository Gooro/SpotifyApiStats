interface loginInterface {
    login(): void;
}

class loginController {
    constructor($scope: loginInterface, $http: angular.IHttpService, $rootScope: angular.IRootScopeService, $window) {
        $scope.login = () => {
            $http.get("http://localhost:1337/login").then(
                value => $window.location.href = value.data,
                err => console.error(err)
            );
        }
    }
}

app.controller("loginController", loginController);

app.config(function ($stateProvider) {
    $stateProvider
        .state('login', {
            url: '/login',
            controller: 'loginController',
            templateUrl: "login.html"
        })

});