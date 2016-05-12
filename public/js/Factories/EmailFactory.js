(function() {
	var EmailFactory = function($http) {
		var factory = {};

		factory.sendEmail = function(data) {
			return $http.post('https://dd-email.herokuapp.com/sendEmail', data)
		}


		return factory;
	}

	EmailFactory.$inject = ['$http'];

	angular.module('bconnectApp')
		.factory('emailFactory', EmailFactory);
}())