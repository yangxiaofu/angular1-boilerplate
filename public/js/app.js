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
			.when('/login', {
				controller: 'loginController',
				templateUrl: 'js/Modules/Login/login.html'
			})
			.when('/', {
				controller: 'searchController',
				templateUrl: 'js/Modules/Search/search.html'
			})
			.when('/signup', {
				controller: 'signUpController',
				templateUrl: 'js/Modules/Signup/signup.html'
			})
			.when('/products', {
				controller: 'productsController',
				templateUrl: 'js/Modules/Products/products.html'
			})
			.when('/selection', {
				controller: 'selectionController',
				templateUrl: 'js/Modules/Selection/selection.html'
			})
			.when('/admin/cook', {
				controller: 'cookController',
				templateUrl: 'js/Modules/Admin/cook/cook.html'
			})
			.when('/admin/bosswork', {
				controller: 'bossWorkController',
				templateUrl: 'js/Modules/Admin/bosswork/bosswork.html'
			})
			.when('/profile', {
				controller: 'profileController',
				templateUrl: 'js/Modules/Profile/profile.html'
			})
			.when('/search', {
				controller: 'searchController', 
				templateUrl: 'js/Modules/Search/search.html'
			})
			.when('/search/:keyword', {
				controller: 'searchController', 
				templateUrl: 'js/Modules/Search/search.html'
			})
			.when('/test', {
				controller: 'testController', 
				templateUrl: 'js/Modules/Test/test.html'
			})
			.otherwise({redirect: '/'})
	});



}())