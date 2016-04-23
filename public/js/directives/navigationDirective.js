(function() {

		angular.module('bconnectApp')
			.directive('navBar', function() {
					return{
						controller: 'navigationController',
						templateUrl: 'js/views/partials/navigation-bar.html'
					}
				});

}())