var homeController = /** @class */ (function () {
    function homeController($scope, $rootScope) {
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
                easing: "ease-in-out",
                animationTime: 600,
                loop: true,
                keyboard: true,
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