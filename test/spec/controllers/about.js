'use strict';

describe('Controller: PhotoController', function () {

  // load the controller's module
  beforeEach(module('potatoFlickrApp'));

  var PhotoController,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PhotoController = $controller('PhotoController', {
      $scope: scope
      // place here mocked dependencies
    });
  }));
});
