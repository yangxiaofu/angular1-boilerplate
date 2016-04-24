(function() {
	var NavigationController = function($scope, user, $rootScope, $location, $window) {
		var loggedIn = $window.sessionStorage.loggedIn;
		$scope.loggedIn = loggedIn;

		function init() {
			user.isLoggedIn()
				.then(function(loggedIn) {
					if (loggedIn === true) {
						$window.sessionStorage.loggedIn = true;
						$scope.loggedIn = true;
						$scope.$apply();
					} else {
						$window.sessionStorage.loggedIn = false;
						$scope.loggedIn = false;
						$scope.$apply();
					}
				})
		}

		this.logout = function() {
			$window.sessionStorage = false;
			user.logout();
			$location.path('login');
		}

		init();
	}

	NavigationController.$inject = ['$scope', 'userFactory', '$rootScope', '$location', '$window'];

	angular.module('bconnectApp')
		.controller('navigationController', NavigationController);

}())