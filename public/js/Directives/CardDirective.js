(function(){
	angular.module('bconnectApp')
		.directive('myCard', function() {
			return {
				controller: 'cardController',
				templateUrl: 'js/modules/Card/card.html'
			}
		});

}())