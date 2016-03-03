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
  .controller('FlickrController', function($scope) {
    $scope.fetchPhotos = function(){
      $scope.array = [];
      $scope.failed = false;        
      $scope.isFetching = true;
      $.ajax({
        url: "https://api.flickr.com/services/feeds/photos_public.gne?tags=potato&tagmode=all&format=json",
        dataType: "jsonp",
        jsonpCallback: 'jsonFlickrFeed',            
        success: function(feeds){
          $scope.$apply(function(){
            $scope.feeds = $scope.array.concat(feeds.items);
            console.log($scope.feeds)
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
    $scope.fetchPhotos();
  });

