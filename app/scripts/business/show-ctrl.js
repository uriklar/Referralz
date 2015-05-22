'use strict';

angular.module('referralzApp')
  .controller('BusinessShowCtrl', function ($scope,business) {
    $scope.business = business;
  });
