(function(){
	var SearchController = function($scope, $rootScope, $window, $location, searchFactory){
		$scope.keyword = null;



		$scope.search = function(keyword = 'busbar'){
			
		}
	}

	SearchController.$inject = ['$scope', '$rootScope', '$window', '$location', 'searchFactory'];

	angular.module('bconnectApp')
		.controller('searchController', SearchController);

}())