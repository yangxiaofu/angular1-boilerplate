(function() {
	var LoginController = function($scope, user, $rootScope) {
		$scope.email = null;
		$scope.password = null;
		$scope.message = null;
		$scope.error = null;

		data = {};

		$scope.login = function() {
			data = {
				email: $scope.email,
				password: $scope.password
			};
			if (($scope.email !== null) && ($scope.password !== null)) {
				user.login($scope.email, $scope.password)
					.then(function(response) {
						$rootScope.loggedIn = true;
						window.location.href = "/#/products";
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

		$scope.logout = function(){
			var url = FBURL.BASE;
			var url_ref = new Firebase(url);

			url_ref.unauth();

			return;
		}
	}

	LoginController.$inject = ['$scope', 'loginFactory', '$rootScope'];

	angular.module('bconnectApp')
		.controller('loginController', LoginController);
}())