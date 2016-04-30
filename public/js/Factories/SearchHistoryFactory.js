(function(){
	var SearchHistoryFactory = function($rootScope){
		var FBURL = {};
		FBURL.BASE = $rootScope.FBURL.BASE;
		var factory = {};

		factory.addToSearchHistory = function(keyword){
			
			var url = FBURL.BASE + '/SearchHistory/';
			var url_ref = new Firebase(url);

			var data = {
				keyword: keyword,
				searchAt: Firebase.ServerValue.TIMESTAMP
			}

			var url_ref1 = url_ref.push();
			url_ref1.update(data);

			return;
		}

		return factory;
	}

	SearchHistoryFactory.$inject = ['$rootScope'];

	angular.module('bconnectApp')
		.factory('searchHistoryFactory', SearchHistoryFactory);
}())