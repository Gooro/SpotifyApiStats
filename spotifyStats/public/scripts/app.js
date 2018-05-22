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
    });
    $httpProvider.interceptors.push('authInterceptor');
});
app.run(function ($rootScope, $state) {
    $rootScope.$on("$viewContentLoaded", function () {
        window.AniJS.run();
        $.getScript('../lib/tilt.jquery.min.js', function () {
            $.getScript('../scripts/tilt.js');
            console.log("tilt.js works");
            $.getScript('../lib/jquery.onepage-scroll.min.js');
            console.log("scroll.js works");
        });
    });
});
//# sourceMappingURL=app.js.map