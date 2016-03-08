'use strict';

describe('Controller: FlickrController', function () {

  // load the controller's module
  beforeEach(module('potatoFlickrApp'));

  var FlickrController,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FlickrController = $controller('FlickrController', {
      $scope: scope
      // place here mocked dependencies
    });
  }));
});
