(function(){
	var StringFactory = function(){
		var factory = {};

		factory.separateString = function(string){
			var result = string.split(" ");
			return result;
		}

		return factory;
	}

	angular.module('bconnectApp')
		.factory('stringFactory', StringFactory);
}())