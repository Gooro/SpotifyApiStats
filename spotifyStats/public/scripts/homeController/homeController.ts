﻿interface homeInterface {
    userData: any;
    musicData: any;
}

class homeController {
    constructor($scope: homeInterface, $rootScope: angular.IRootScopeService, $http: angular.IHttpService) {


        $http.get("http://localhost:1337/userdata").then(value => { $scope.userData = value.data; console.log(value.data) }); 
        $http.get("http://localhost:1337/musicdata").then(value => { $scope.musicData = value.data; console.log(value.data)});




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