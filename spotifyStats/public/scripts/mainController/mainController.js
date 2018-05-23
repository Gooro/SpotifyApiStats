var mainController = /** @class */ (function () {
    function mainController($scope, $rootScope, $http) {
        $scope.testMessage = function () {
            $http.get("http://localhost:1337/login").then(function (value) { return console.log(value.data); }, function (err) { return console.error(err); });
        };
        $rootScope.$on('viewContentLoaded', function (event) {
            console.log('sada');
        });
    }
    return mainController;
}());
app.controller('mainController', mainController);
//# sourceMappingURL=mainController.js.map