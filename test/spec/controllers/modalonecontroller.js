'use strict';

describe('Controller: ModalonecontrollerCtrl', function () {

  // load the controller's module
  beforeEach(module('loqalusClientApp'));

  var ModalonecontrollerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ModalonecontrollerCtrl = $controller('ModalonecontrollerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ModalonecontrollerCtrl.awesomeThings.length).toBe(3);
  });
});
