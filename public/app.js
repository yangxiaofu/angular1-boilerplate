(function() {
	var app = angular.module('bconnectApp', ['firebase', 'ngRoute'])
		.run(function($rootScope){
			$rootScope.FBURL = {
				BASE: "https://bconnectto.firebaseio.com/"
			}
		})

	app.config(function($routeProvider){
		//Routes go here
		$routeProvider
			.when('/', 
				{
					controller: 'LoginController',
					templateUrl: 'js/views/login.html'
				})
	})


}())