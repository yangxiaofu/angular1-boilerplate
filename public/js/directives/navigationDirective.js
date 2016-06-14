(function() {
	angular.module('myApp')
		.directive('navBar', function() {
			return {
				controller: 'navigationController as navCtrl',
				templateUrl: 'js/Modules/Navigation/navigation-bar.html'
			}
		});

}())