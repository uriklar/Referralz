'use strict';

angular.module('referralzApp')
  .controller('BusinessNewCtrl', function ($scope, Restangular, $location) {
  	var baseBusinesses = Restangular.all('businesses');

  	$scope.newBusiness = {
  		name: "" 
  	};

  	$scope.submit = function() {
  		baseBusinesses
  			.post({ business: $scope.newBusiness })
				.then(function(addedBusiness) {
								console.log(addedBusiness);
								$location.path("/business/"+addedBusiness.id);
							}, function(e){
								console.log("there was an error");
								console.log(e);
							});
  	}
  });
