(function() {
	angular.module('bconnectApp')
		.directive('navBar', function() {
			return {
				controller: 'navigationController as navCtrl',
				templateUrl: 'js/Modules/Navigation/navigation-bar.html'
			}
		});

}())