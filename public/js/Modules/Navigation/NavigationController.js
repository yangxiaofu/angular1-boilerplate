(function() {
	var NavigationController = function($scope) {
		var loggedIn = $window.sessionStorage.loggedIn;
		$scope.loggedIn = loggedIn;
		$scope.keyword = null;

		function init() {
			user.isLoggedIn()
				.then(function(authData) {
					if (authData !== null) {
						$window.sessionStorage.loggedIn = true;
						$window.sessionStorage.uid = authData.auth.uid;
						$window.sessionStorage.profileImageUrl = authData.password.profileImageURL;
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

		this.search = function(keyword){
			$scope.keyword = '';
			$location.path('search/' + keyword).replace();
		}

		init();
	}

	NavigationController.$inject = ['$scope'];

	angular.module('myApp')
		.controller('navigationController', NavigationController);

}())