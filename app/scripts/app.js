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
        controller: 'PhotoController'
      })
      .otherwise({
        redirectTo: '/main'
      });
  })
  .controller('FlickrController', function($scope, $rootScope, $window) {
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
            $rootScope.feeds = $scope.array.concat(feeds.items);
            $scope.isFetching = false;
            $scope.failed = false;
            $scope.limit= 5;
            $scope.loadMore = function() {
              $scope.limit = $scope.limit + 5;
              console.log($scope.limit)
            }
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
    $scope.$on('$viewContentLoaded', function() {
        $window.scrollTo(0, 0);
    });
    $('#search-bar').keypress(function(e){
        if(e.which == 13){//Enter key pressed
            $('#search-button').click();//Trigger search button click event
        }
    });
    $scope.fetchPhotos();
  })
  .controller('PhotoController', function($scope, $rootScope, $window) {
    $scope.choosePhoto = function() {
      $scope.photoIndex = window.location.href.substr(window.location.href.lastIndexOf('/') + 1)
      $scope.chosenPhoto = $rootScope.feeds[$scope.photoIndex];
      $scope.photoTags = $scope.chosenPhoto.tags;
    }
    $scope.choosePhoto();
  });
  

