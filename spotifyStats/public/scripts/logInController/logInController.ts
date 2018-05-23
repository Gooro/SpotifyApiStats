interface loginInterface {

}

class loginController {
    constructor($scope: loginInterface, ) {

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