(function() {

	angular.module('bconnectApp')
		.directive('navBar', function() {
			return {
				controller: 'navigationController as navCtrl',
				templateUrl: 'js/modules/navigation/navigation-bar.html'
			}
		});

}())