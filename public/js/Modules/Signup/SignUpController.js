(function() {
	var SignUpController = function($scope, $http, user, $location) {
		$scope.email = null;
		$scope.password = null;
		$scope.company = null;
		$scope.name = null;
		$scope.phoneNumber = null;
		$scope.position = null;
		$scope.webAddress = null

		$scope.signUpUser = function() {
			var data = {};
			data.email = $scope.email;
			data.password = $scope.password;
			data.company = $scope.company;
			data.position = $scope.position;
			data.name = $scope.name;
			data.phoneNumber = $scope.phoneNumber;
			data.webAddress = $scope.webAddress;

			if (data.email === null || data.password === null || data.company === null || data.position === null || data.phoneNumber === null || data.name === null || data.webAddress === null) {
				
			} else {
				user.signUp(data)
					.then(function(response) {

						user.login($scope.email, $scope.password)
							.then(function(response) {
								$location.path('selection').replace();
								$scope.$apply();
							})
							.catch(function(error) {
								console.log(error);
							})
					})
					.catch(function(error) {
						console.log(JSON.stringify(error));
					})
			}
		}
	}

	SignUpController.$inject = ['$scope', '$http', 'userFactory', '$location'];

	angular.module('bconnectApp')
		.controller('signUpController', SignUpController);

}());