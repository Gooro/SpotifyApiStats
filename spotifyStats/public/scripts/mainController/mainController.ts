interface mainInterface {
    testMessage(): void;
}

class mainController {
    constructor($scope: mainInterface, $http: angular.IHttpService, $rootScope: angular.IRootScopeService, $window) {
        $scope.testMessage = () => {
            $http.get("http://localhost:1337/login").then(
                value => $window.location.href = value.data,
                err => console.error(err)
            );
        }

        $rootScope.$on('viewContentLoaded',
            function (event) {
                console.log('sada');
            }
        );
    }
    
}

app.controller('mainController', mainController);