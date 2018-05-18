var app = angular.module('spotifyStats', []);


app.service('authInterceptor', function ($q) {
});

app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.config
    $httpProvider.interceptors.push('authInterceptor');
}]);

