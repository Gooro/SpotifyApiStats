var logController = /** @class */ (function () {
    function logController($scope, $http, $rootScope, $window) {
        $scope.login = function () {
            $http.get("http://localhost:1337/login").then(function (value) { return $window.location.href = value.data; }, function (err) { return console.error(err); });
        };
    }
    return logController;
}());
app.controller("logController", logController);
app.config(function ($stateProvider) {
    $stateProvider
        .state('log', {
        url: '/log',
        controller: 'logController',
        templateUrl: "log.html"
    });
});
//# sourceMappingURL=logController.js.map