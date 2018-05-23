var homeController = /** @class */ (function () {
    function homeController($scope, $rootScope, $http) {
        $http.get("http://localhost:1337/userdata").then(function (value) {
            $scope.userData = value;
            console.log($scope.userData);
        });
        $rootScope.$on("$viewContentLoaded", function () {
            window.AniJS.run();
            var mainTilt = $(".mainTilt");
            var tiltElement = $(".tiltElement");
            $(document).on("mousemove", function (e) {
                var ax = -($(window).innerWidth() / 2 - e.pageX) / 80;
                var ay = ($(window).innerHeight() / 2 - e.pageY) / 60;
                tiltElement.attr("style", "transform: rotateY(" + ax + "deg) rotateX(" + ay + "deg);-webkit-transform: rotateY(" + ax + "deg) rotateX(" + ay + "deg);-moz-transform: rotateY(" + ax + "deg) rotateX(" + ay + "deg)");
                mainTilt.attr("style", "transform: rotateY(" + -ax + "deg) rotateX(" + -ay + "deg);-webkit-transform: rotateY(" + -ax + "deg) rotateX(" + -ay + "deg);-moz-transform: rotateY(" + -ax + "deg) rotateX(" + -ay + "deg)");
            });
            var onepagescroll = window.$(".home");
            onepagescroll.onepage_scroll({
                sectionContainer: ".onepage",
                easing: "ease",
                // "ease-out", "ease-in-out", or even cubic bezier value such as "cubic-bezier(0.175, 0.885, 0.420, 1.310)"
                animationTime: 600,
                pagination: true,
                updateURL: false,
                beforeMove: function (index) { },
                afterMove: function (index) { },
                loop: false,
                keyboard: true,
                responsiveFallback: false,
                // you want the responsive fallback to be triggered. For example, set this to 600 and whenever
                // the browser's width is less than 600, the fallback will kick in.
                direction: "vertical" // You can now define the direction of the One Page Scroll animation. Options available are "vertical" and "horizontal". The default value is "vertical".  
            });
        });
    }
    return homeController;
}());
app.controller("homeController", homeController);
app.config(function ($stateProvider) {
    $stateProvider
        .state('home', {
        url: '/home',
        controller: 'homeController',
        templateUrl: 'home.html'
    });
});
//# sourceMappingURL=homeController.js.map