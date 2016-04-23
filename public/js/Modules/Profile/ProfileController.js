(function() {
	var ProfileController = function($rootScope, $scope, user, $window) {
		if ($rootScope.loggedIn === true) {
			$scope.activeCard = 'active';
			$scope.activeSettings = null;
			$scope.hideCard = false;
			$scope.hideSettings = true;
			
			userId = $window.sessionStorage.currentUser;

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
			
			window.location.href = '/';
		}
	}

	ProfileController.$inject = ['$rootScope', '$scope', 'userFactory', '$window'];

	angular.module('bconnectApp')
		.controller('profileController', ProfileController);
}())