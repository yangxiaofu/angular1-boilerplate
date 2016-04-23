(function() {

	angular.module('bconnectApp')
		.directive('navBar', function() {
			return {
				controller: 'navigationController as navCtrl',
				templateUrl: 'js/views/partials/navigation-bar.html'
			}
		});

}())