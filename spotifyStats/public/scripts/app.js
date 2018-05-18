var app = angular.module('website', ['ui.router', 'toastr', 'ngCookies']);
app.service('authInterceptor', function ($q, $state) {
});
app.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.config;
        $httpProvider.interceptors.push('authInterceptor');
    }]);
//# sourceMappingURL=app.js.map