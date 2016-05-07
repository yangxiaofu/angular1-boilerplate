(function(){
	var EmailFactory = function($http){
		
	}

	EmailFactory.$inject = ['$http'];

	angular.module('bconnectApp')
		.factory('emailFactory', EmailFactory);
}())