(function() {
	var app = angular.module('bconnectApp', ['firebase', 'ngRoute'])
		.run(function($rootScope) {
			$rootScope.FBURL = {
				BASE: "https://bconnectto.firebaseio.com/"
			}
		})

	app.config(function($routeProvider) {
		//Routes go here
		$routeProvider
			.when('/', {
				controller: 'loginController',
				templateUrl: 'js/views/login.html'
			})
			.when('/signup', {
				controller: 'signUpController',
				templateUrl: 'js/views/signup.html'
			})
			.when('/products', {
				controller: 'productsController',
				templateUrl: 'js/views/products.html'
			})
			.when('/selection', {
				controller: 'selectionController',
				templateUrl: 'js/views/selection.html'
			})
			.when('/cook', {
				controller: 'adminController',
				templateUrl: 'js/views/admin/cook.html'
			})
			.when('/bosswork', {
				controller: 'categoryController',
				templateUrl: 'js/views/admin/bosswork.html'
			})
	});



}())