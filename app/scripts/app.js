'use strict';

angular
  .module('potatoFlickrApp', [
    'ngResource',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'FlickrController'
      })
      .when('/photo/:id*', {
        templateUrl: 'views/photo.html',
        controller: 'FlickrController'
      })
      .otherwise({
        redirectTo: '/main'
      });
  })
  .controller('FlickrController', function($scope, $routeParams, $window) {
    $scope.fetchPhotos = function(){
      $scope.array = [];
      $scope.failed = false;        
      $scope.isFetching = true;
      $.ajax({
        url: "https://api.flickr.com/services/feeds/photos_public.gne?tags=" + $scope.query + "&tagmode=all&format=json",
        dataType: "jsonp",
        type: 'GET',
        jsonpCallback: 'jsonFlickrFeed',            
        success: function(feeds){
          $scope.$apply(function(){
            $scope.feeds = $scope.array.concat(feeds.items);
            $scope.photoIndex = window.location.href.substr(window.location.href.lastIndexOf('/') + 1)
            $scope.chosenPhoto = $scope.feeds[$scope.photoIndex];
            $scope.photoTags = $scope.chosenPhoto.tags;
            console.log($scope.photoTags)
            $scope.isFetching = false;
            $scope.failed = false;
          });
      },
      error: function(error){
          $scope.$apply(function(){
            $scope.failed = true;                                   
            $scope.isFetching = false;    
          });
        }
      });
    };
    $scope.$on('$viewContentLoaded', function () {
        $window.scrollTo(0, 0);
    });
    console.log($scope.query);
    $scope.fetchPhotos();
  });
  

