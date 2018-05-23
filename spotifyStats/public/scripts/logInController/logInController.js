var loginController = /** @class */ (function () {
    function loginController($scope) {
    }
    return loginController;
}());
app.controller("loginController", loginController);
app.config(function ($stateProvider) {
    $stateProvider
        .state('login', {
        url: '/login',
        controller: 'loginController',
        templateUrl: "login.html"
    });
});
//# sourceMappingURL=logInController.js.map