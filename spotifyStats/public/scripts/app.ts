var app = angular.module('spotifyStats', ['ui.router']);


app.service('authInterceptor', function ($q) {
});

app.config(function ($httpProvider, $stateProvider, $urlRouterProvider) {
    $httpProvider.config;

    $urlRouterProvider.otherwise('/login');

    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'login.html'
        })
        .state('home', {
            url: '/home',
            templateUrl: 'home.html'
        })

    $httpProvider.interceptors.push('authInterceptor');
});

app.run(function ($rootScope, $state) {
    $rootScope.$on("$viewContentLoaded", function () {
        (<any>window).AniJS.run();
        $.getScript('../lib/tilt.jquery.min.js', function () {
            $.getScript('../scripts/tilt.js');
            console.log("tilt.js works")
        });
    })
});
