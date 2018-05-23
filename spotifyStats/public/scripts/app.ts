var app = angular.module('spotifyStats', ['ui.router']);


app.service('authInterceptor', function ($q) {
});

app.config(function ($httpProvider, $stateProvider, $urlRouterProvider, $locationProvider) {
    $httpProvider.config;
    $locationProvider.hashPrefix('');
    $urlRouterProvider.otherwise('login');
    $stateProvider
    $httpProvider.interceptors.push('authInterceptor');
});

app.run(function ($rootScope, $state) {
});
