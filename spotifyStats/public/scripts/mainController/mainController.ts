interface mainInterface {
    testMessage(): void;
}

class mainController {
    constructor($scope: mainInterface, $http: angular.IHttpService, $window) {
        $scope.testMessage = () => {
            $http.get("http://localhost:1337/login").then(
                value => $window.location.href = value.data,
                err => console.error(err)
            );
        }
    }
    
}

app.controller('mainController', mainController);