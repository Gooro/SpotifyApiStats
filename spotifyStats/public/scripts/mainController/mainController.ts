interface mainInterface {
    testMessage(): void;
}

class mainController {
    constructor($scope: mainInterface, $http: angular.IHttpService) {
        $scope.testMessage = () => {
            $http.get("http://localhost:1337/login").then(
                value => console.log(value.data),
                err => console.error(err)
            );
        }
    }

}

app.controller('mainController', mainController);