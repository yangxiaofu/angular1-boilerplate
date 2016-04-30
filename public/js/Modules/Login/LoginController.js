(function() {
	var LoginController = function($scope, user, $window, appSettings, $location) {
		$scope.email = null;
		$scope.password = null;
		$scope.message = null;
		$scope.error = null;

		data = {};

		$scope.login = function() {

			if (($scope.email !== null) && ($scope.password !== null)) {
				user.login($scope.email, $scope.password)
					.then(function(response) {
						$location.path('search').replace();
						$scope.$apply();	
					})
					.catch(function(error) {
						if (error.code = 'INVALID_EMAIL'){
							$scope.error = 'You have entered an invalid email address';
						}
						$scope.$apply();
					});
			} else {
				$scope.message = 'Both the email address and the password must be entered';
			}
		}
	}

	LoginController.$inject = ['$scope', 'userFactory', '$window', 'appSettings', '$location'];

	angular.module('bconnectApp')
		.controller('loginController', LoginController);
}())