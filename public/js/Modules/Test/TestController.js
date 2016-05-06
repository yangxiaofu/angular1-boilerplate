(function() {
	var TestController = function($scope, stringFactory, searchFactory, $rootScope, arrayFactory) {
		init();


		function init() {
			string = "Non-Metallic Enclosures";
			searchFactory.addString(string);
			//searchFactory.removeUser(string);
		}

	}

	TestController.$inject = ['$scope', 'stringFactory', 'searchFactory', '$rootScope', 'arrayFactory'];

	angular.module('bconnectApp')
		.controller('testController', TestController);
}())