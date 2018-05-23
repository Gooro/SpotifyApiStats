interface mainInterface {
    testMessage(): void;
}

class mainController {
    constructor($scope: mainInterface, $rootScope: angular.IRootScopeService,  $http: angular.IHttpService) {
        $scope.testMessage = () => {
            $http.get("http://localhost:1337/login").then(
                value => console.log(value.data),
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