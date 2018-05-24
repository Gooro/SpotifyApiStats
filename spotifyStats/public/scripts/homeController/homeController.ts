interface homeInterface {
    userData: any;
    artistData: any;
    tracksData: any;
    topArtistData: any;
    topTracksData: any;
    topTracksSData: any;
    topArtistSData: any;
    topGenre: any;
    minutesMonth: any;
    top15longterm: boolean;
    top1longterm: boolean;
    onepagesNumber: number;
    currentPage: number;
    progress: number;
    $apply;
}

class homeController {
    constructor($scope: homeInterface, $rootScope: angular.IRootScopeService, $http: angular.IHttpService) {
        $scope.top15longterm = true;
        $scope.top1longterm = true;
        $scope.onepagesNumber = document.getElementsByClassName('onepage').length;
        $scope.currentPage = 1;
        $scope.progress = ($scope.currentPage / $scope.onepagesNumber)*100;

        $http.get("http://localhost:1337/userdata").then(value => { $scope.userData = value.data; console.log(value.data) });
        $http.get("http://localhost:1337/topartistdata").then(value => { $scope.topArtistData = value.data; console.log(value.data) });
        $http.get("http://localhost:1337/toptracksdata").then(value => { $scope.topTracksData = value.data; console.log(value.data) });
        $http.get("http://localhost:1337/toptracksdatashortterm").then(value => { $scope.topTracksSData = value.data; console.log(value.data) });
        $http.get("http://localhost:1337/topartistdatashortterm").then(value => { $scope.topArtistSData = value.data; console.log(value.data) });
        $http.get("http://localhost:1337/topartistsforgenre").then(value => { $scope.topGenre = value.data; console.log(value.data) });


        $rootScope.$on("$viewContentLoaded", function () {
            (<any>window).AniJS.run();


            var mainTilt = $(".mainTilt");
            var tiltElement = $(".tiltElement");

            $(document).on("mousemove", function (e) {
                var ax = -($(window).innerWidth() / 2 - e.pageX) / 80;
                var ay = ($(window).innerHeight() / 2 - e.pageY) / 60;
                tiltElement.attr("style", "transform: rotateY(" + ax + "deg) rotateX(" + ay + "deg);-webkit-transform: rotateY(" + ax + "deg) rotateX(" + ay + "deg);-moz-transform: rotateY(" + ax + "deg) rotateX(" + ay + "deg)");
                mainTilt.attr("style", "transform: rotateY(" + -ax + "deg) rotateX(" + -ay + "deg);-webkit-transform: rotateY(" + -ax + "deg) rotateX(" + -ay + "deg);-moz-transform: rotateY(" + -ax + "deg) rotateX(" + -ay + "deg)");
            });

            var onepagescroll = (<any>window).$(".home");

            onepagescroll.onepage_scroll({
                sectionContainer: ".onepage",
                easing: "ease-in-out",
                animationTime: 600,
                loop: true,
                keyboard: true,
                pagination: false,
                afterMove: function (index) {
                    $scope.$apply(function () {
                        $scope.progress = ((index / $scope.onepagesNumber)*100);
                    });
                },
            });
        })
    }
}

app.controller("homeController", homeController);

app.config(function ($stateProvider) {
    $stateProvider
        .state('home', {
            url: '/home',
            controller: 'homeController',
            templateUrl: 'home.html'
        })
});