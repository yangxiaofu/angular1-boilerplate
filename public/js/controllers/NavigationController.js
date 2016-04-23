(function() {

	var NavigationController = function($scope, user) {
		$scope.loggedIn = null;

		init();

		function init() {
			user.isLoggedIn()
				.then(function(loggedIn) {
					if (loggedIn === true) {
				
						$scope.loggedIn === true;
					} else {
						$scope.loggedIn === false;
				
					}
					$scope.$apply();
				})
				// SCOPE FUNCTION// 
			$scope.logout = function() {
				
				user.logout();
				window.location.href = '/';
			}
		}


	}

	NavigationController.$inject = ['$scope', 'loginFactory'];

	angular.module('bconnectApp')
		.controller('navigationController', NavigationController);

}())