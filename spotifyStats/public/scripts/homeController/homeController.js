var homeController = /** @class */ (function () {
    function homeController($scope, $rootScope, $http, $timeout) {
        $scope.top15longterm = true;
        $scope.top1longterm = true;
        $scope.onepagesNumber = document.getElementsByClassName('onepage').length;
        $scope.currentPage = 1;
        $scope.progress = ($scope.currentPage / $scope.onepagesNumber) * 100;
        $http.get("http://localhost:1337/userdata").then(function (value) { $scope.userData = value.data; console.log(value.data); });
        $http.get("http://localhost:1337/topartistdata").then(function (value) { $scope.topArtistData = value.data; console.log(value.data); });
        $http.get("http://localhost:1337/toptracksdata").then(function (value) { $scope.topTracksData = value.data; console.log(value.data); });
        $http.get("http://localhost:1337/toptracksdatashortterm").then(function (value) { $scope.topTracksSData = value.data; console.log(value.data); });
        $http.get("http://localhost:1337/topartistdatashortterm").then(function (value) { $scope.topArtistSData = value.data; console.log(value.data); });
        $http.get("http://localhost:1337/topartistsforgenre").then(function (value) { $scope.topGenre = value.data; console.log(value.data); });
        $http.get("http://localhost:1337/toptracksdatalongterm").then(function (value) { $scope.tracksStyleData = value.data; console.log("To Cię Dominik interesuje", value.data); });
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
                pagination: false,
                afterMove: function (index) {
                    $scope.$apply(function () {
                        $scope.progress = ((index / $scope.onepagesNumber) * 100);
                    });
                },
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