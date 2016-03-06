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
  .factory('FlickrService', function ($resource) {
    return $resource('http://api.flickr.com/services/feeds/photos_public.gne', { format: 'json', jsoncallback: 'JSON_CALLBACK' }, { 'load': { 'method': 'JSONP' } });
  })
  .controller('FlickrController', function($scope, $rootScope, $window, FlickrService) {    
    $scope.limit = 5;
    $scope.fetchPhotos = function() {
      $rootScope.feeds = FlickrService.load({ tags: $scope.query });
    }
    $scope.loadMore = function() {
      $scope.limit = $scope.limit + 5;
      console.log($scope.limit)
    }
    $('#search-bar').keypress(function(e){
        if(e.which == 13){//Enter key pressed
            $('#search-button').click();//Trigger search button click event
        }
    });
    $scope.fetchPhotos();
  })
  .controller('PhotoController', function($scope, $rootScope, $window, FlickrService) {
    $scope.choosePhoto = function() {
      $scope.photoIndex = window.location.href.substr(window.location.href.lastIndexOf('/') + 1)
      $scope.chosenPhoto = $scope.feeds.items[$scope.photoIndex];
      $scope.photoTags = $scope.chosenPhoto.tags;
    }
  });
  

