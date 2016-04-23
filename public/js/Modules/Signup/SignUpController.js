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
						console.log('Signed Up Successfully');
						user.login($scope.email, $scope.password)
							.then(function(response) {
								console.log('Should redirect');
								window.location.href = '#/selection';
							})
							.catch(function(error) {
								console.log('Problem Loggin In');
							})
					})
					.catch(function(error) {
						console.log(JSON.stringify(error));
					})
			}
		}
	}

	SignUpController.$inject = ['$scope', '$http', 'userFactory'];

	angular.module('bconnectApp')
		.controller('signUpController', SignUpController);

}());