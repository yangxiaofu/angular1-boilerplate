(function() {

	var SignUpController = function($scope, $http, user) {
		$scope.email = null;
		$scope.password = null;
		$scope.company = null;
		$scope.name = null;
		$scope.phoneNumber = null;
		$scope.position = null;

		$scope.signUpUser = function() {
			var data = {};
			data.email = $scope.email;
			data.password = $scope.password;
			data.company = $scope.company;
			data.position = $scope.position;
			data.name = $scope.name;
			data.phoneNumber = $scope.phoneNumber;

			if (data.email === null || data.password === null || data.company === null || data.position === null || data.phoneNumber == null || data.name == null) {
				console.log('something is null');
			} else {
				user.signUp(data)
					.then(function(response) {
						var loginData = {};
						loginData.email = $scope.email;
						loginData.password = $scope.password;
						loginFactory.login(data)
							.success(function(response) {
								window.location = 'selection';
							})
							.error(function(error) {
								
							})
					})
					.catch(function(error) {
						console.log(JSON.stringify(error));
					})
			}
		}
	}

	SignUpController.$inject = ['$scope', '$http', 'loginFactory'];

	angular.module('bconnectApp')
		.controller('signUpController', SignUpController);

}());