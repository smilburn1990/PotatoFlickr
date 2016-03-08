'use strict';

angular
  .module('potatoFlickrApp', [
    'ngResource',
    'ngRoute',
    'ngStorage'
  ])
  //Provides page routes and adds controllers accordingly
  .config(function ($routeProvider) {
    $routeProvider
      .when('/main', {//main page
        templateUrl: 'views/main.html',
        controller: 'FlickrController'
      })
      .when('/photo/:id*', {//detail page
        templateUrl: 'views/photo.html',
        controller: 'PhotoController'
      })
      .otherwise({
        redirectTo: '/main'//fall back
      });
  })
  //Factory service for fetching data from the API
  .factory('FlickrService', function ($resource) {
    return $resource('http://api.flickr.com/services/feeds/photos_public.gne',
      { format: 'json', jsoncallback: 'JSON_CALLBACK' }, 
      { 'load': { 'method': 'JSONP' } 
    });
  })
  //Controller for main page
  .controller('FlickrController', function($scope, $localStorage, $window, FlickrService) {    
    $scope.limit = 5; //Limits number of photos to 5
    $localStorage.query = $scope.query;
    //Function for fetching photographs
    $scope.fetchPhotos = function() {
      FlickrService.load({ tags: $localStorage.query }).$promise.then(function(data) {//Adds custom search query to url
        $localStorage.feeds = data;
        $scope.feeds = $localStorage.feeds;
      })
    }
    //Function for loading more images
    $scope.loadMore = function() {
      if ($scope.limit !== 20) {//If the limit is not 20
        $scope.limit += 5;//Add another 5
      } else {
        $('#load-more').hide();//else hide button
      }
    }
    $('#search-bar').keypress(function(e){
        if(e.which == 13){//Enter key pressed
            $('#search-button').click();//Trigger search button click event
        }
    });
    $scope.fetchPhotos();//Call fetchPhoto function
  })
  //Controller for photo detail page
  .controller('PhotoController', function($scope, $localStorage, $window, FlickrService) {
    $scope.$on('$viewContentLoaded', function () {
      $window.scrollTo(0, 0);
    });
    $scope.choosePhoto = function() {
      $scope.photoIndex = window.location.href.substr(window.location.href.lastIndexOf('/') + 1)//Takes the index of the photo from the url
      $scope.chosenPhoto = $localStorage.feeds.items[$scope.photoIndex];//Creates scope for chosen photo using the index
      $scope.photoTags = $scope.chosenPhoto.tags;//Creates scope for the tags
    }
  });
  

