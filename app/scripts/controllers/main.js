'use strict';

/**
 * @ngdoc function
 * @name referralzApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the referralzApp
 */ 
angular.module('referralzApp')
  .controller('MainCtrl', function ($scope, $resource) {
  	$resource("/api/v1/businesses").query();
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
