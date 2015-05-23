'use strict';

angular.module('referralzApp')
  .controller('SessionNewCtrl', function ($scope, $auth) {
    $scope.handleLoginBtnClicked = function() {
      $auth.submitLogin($scope.loginForm)
        .then(function(resp) {
          console.log(resp);
        })
        .catch(function(resp) {
          console.log(resp);
        });
    };
  });
