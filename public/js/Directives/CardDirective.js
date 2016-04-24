(function(){
	angular.module('bconnectApp')
		.directive('myCard', function() {
			return {
				controller: 'cardController',
				templateUrl: 'js/Modules/Card/card.html'
			}
		});

}())