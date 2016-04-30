(function() {
	var ProfileController = function($scope, user, $window, $rootScope, $location) {
		var loggedIn = $rootScope.loggedIn;

		if (loggedIn === true) {
			$scope.activeCard = 'active';
			$scope.activeProducts = null;
			$scope.activeSettings = null;
			$scope.hideCard = false;
			$scope.hideProducts = true;
			$scope.hideSettings = true;
			
			userId = $window.sessionStorage.uid;

			$scope.setActiveCard = function() {
				$scope.activeCard = 'active';
				$scope.activeSettings = '';
				$scope.hideCard = false;
				$scope.hideSettings = true;
			}
			$scope.setActiveSettings = function() {
				$scope.activeCard = '';
				$scope.activeSettings = 'active';
				$scope.hideCard = true;
				$scope.hideSettings = false;
			}
		} else {
			$location.path('login');
		}
	}

	ProfileController.$inject = ['$scope', 'userFactory', '$window', '$rootScope', '$location'];

	angular.module('bconnectApp')
		.controller('profileController', ProfileController);
}())