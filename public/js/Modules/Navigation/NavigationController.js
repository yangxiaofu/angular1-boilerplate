(function() {
	var NavigationController = function(user, $rootScope, $window) {
		
		function init() {
			user.isLoggedIn()
				.then(function(loggedIn) {
					if (loggedIn === true) {
						$rootScope.loggedIn = true;
					} else {
						$rootScope.loggedIn = false;
					}
				})
		}

		this.logout = function() {
			$rootScope.loggedIn = false;
			user.logout();
			window.location.href = '/';
		}

		init();
	}

	NavigationController.$inject = ['userFactory', '$rootScope', '$window'];

	angular.module('bconnectApp')
		.controller('navigationController', NavigationController);

}())