(function() {
	var NavigationController = function(user, $rootScope) {
		
		init();


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
	}

	NavigationController.$inject = ['loginFactory', '$rootScope'];

	angular.module('bconnectApp')
		.controller('navigationController', NavigationController);

}())