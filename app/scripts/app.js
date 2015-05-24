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
    'ui.router',
    'restangular',
    'ng-token-auth',
    //'ngFileUpload'
  ])
  .run(function ($rootScope, $location) {
    $rootScope.$on('auth:login-success', function(ev,user) {
      $location.path('/user/' + user.id);
    });
    $rootScope.$on('auth:registration-email-success', function(ev,user) {
      $location.path('/user/' + user.id);
    });
  })
  .config(function ($stateProvider,RestangularProvider, $authProvider) {
    $stateProvider
      // this state will be visible to everyone
      .state('root', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .state('business-new', {
        url: '/business/new',
        templateUrl: 'views/business/new.html',
        controller: 'BusinessNewCtrl',
        resolve: {
          auth: function($auth) {
            return $auth.validateUser();
          },
          categories: function(Restangular) {
            return Restangular.service('categories').getList().then(function (data) {
              return data;
            }, function () {
              return []; // failure
            });
          }
        }
      })
      .state('business-show', {
        url: '/business/{businessId}',
        templateUrl: 'views/business/show.html',
        controller: 'BusinessShowCtrl',
        resolve: {
          businesses: function(Restangular) {
            return Restangular.service('businesses').getList().then(function (data) {
              return data;
            }, function () {
              return []; // failure
            });
          },
          business: function(Restangular,$stateParams) {
           return Restangular.one('businesses', $stateParams.businessId).get().then(function(data) {
             return data;
           }, function() {
             return {}; //failure
           })
          }
        }
      })
      .state('sign-up', {
        url: '/sign-up',
        templateUrl: 'views/user/new.html',
        controller: 'UserNewCtrl'
      })
      .state('sign-in', {
        url: '/sign-in',
        templateUrl: 'views/session/new.html',
        controller: 'SessionNewCtrl'
      })
      .state('user-show',{
        url: '/user/{userId}',
        templateUrl: 'views/user/show.html',
        controller: 'UserShowCtrl'
      });

    RestangularProvider.setBaseUrl('/api/v1');

    $authProvider.configure({
      apiUrl: '/api/v1'
    })

  });
