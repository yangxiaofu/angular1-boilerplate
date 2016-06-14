(function() {
	var app = angular.module('myApp', ['ngRoute', 'ngAnimate'])
		.run(function($rootScope) {
			//Constants cna go in here. 
		})

	app.config(['$httpProvider', function($httpProvider) {
		$httpProvider.defaults.useXDomain = true;
		$httpProvider.defaults.withCredentials = true;
		delete $httpProvider.defaults.headers.common["X-Requested-With"];
		$httpProvider.defaults.headers.common["Accept"] = "application/json";
		$httpProvider.defaults.headers.common["Content-Type"] = "application/json";
	}]);

	app.config(function($routeProvider) {
		$routeProvider
			.when('/', {
				controller: 'homeController',
				templateUrl: 'js/Modules/Home/home.html'
			})
	});

}())