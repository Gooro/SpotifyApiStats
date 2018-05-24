var loginController = /** @class */ (function () {
    function loginController($scope, $http, $rootScope, $window) {
        $scope.login = function () {
            $http.get("http://localhost:1337/login").then(function (value) { return $window.location.href = value.data; }, function (err) { return console.error(err); });
        };
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
//# sourceMappingURL=loginController.js.map