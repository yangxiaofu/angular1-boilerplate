(function() {
	var app = angular.module('bconnectApp', ['ngRoute', 'ngAnimate'])
		.run(function($rootScope) {
			$rootScope.FBURL = {
				//BASE: "https://bconnectto-prod.firebaseio.com/" // For production
				BASE: "https://bconnectto.firebaseio.com/" // For development
			}
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
			.when('/description', {
				controller: 'descriptionController',
				templateUrl: 'js/Modules/Description/description.html'
			})
			.otherwise({
				redirect: '/'
			})
	});



}())