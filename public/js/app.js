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
			.when('/navigation', {
				controller: 'signUpController',
				templateUrl: 'js/views/login.html'
			})
			// .when('/', {
			// 	controller: 'loginController',
			// 	templateUrl: 'js/views/login.html'
			// })
			// .when('/test', {
			// 	controller: 'productsController',
			// 	templateUrl: 'js/views/test.html'
			// });
	})


	app.directive('capitalizeFirst', function($parse) {
		return {
			require: 'ngModel',
			link: function(scope, element, attrs, modelCtrl) {
				var capitalize = function(inputValue) {
					if ((inputValue === null) || (inputValue === undefined)){
						inputValue = '';
					}
					var capitalized = inputValue.charAt(0).toUpperCase() +
						inputValue.substring(1);
					if (capitalized !== inputValue) {
						modelCtrl.$setViewValue(capitalized);
						modelCtrl.$render();
					}
					return capitalized;
				}
				modelCtrl.$parsers.push(capitalize);
				capitalize($parse(attrs.ngModel)(scope)); // capitalize initial value
			}
		};
	});



}())