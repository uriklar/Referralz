'use strict';

/**
 * @ngdoc overview
 * @name referralzApp
 * @description
 * # referralzApp
 *
 * Main module of the application.
 */
angular
  .module('referralzApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'restangular'
  ])
  .config(function ($routeProvider,RestangularProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/business/new',{
        templateUrl: 'views/business/new.html',
        controller: 'BusinessNewCtrl'
      })
      .when('/business/:id',{
        templateUrl: 'views/business/show.html',
        controller: 'BusinessShowCtrl',
        resolve: {
          business: function(Restangular,$route){
            return Restangular.service('businesses').one($route.current.params.id).get().then(function (data) {
              return data;
            }, function () {
              return []; // failure
            });
          }
        }
      })
      .otherwise({
        redirectTo: '/'
      });

    RestangularProvider.setBaseUrl('/api/v1');
  });
