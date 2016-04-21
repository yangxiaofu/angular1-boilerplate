(function() {
	var app = angular.module('bconnectApp', ['firebase'])
		.run(function($rootScope){
			$rootScope.FBURL = {
				BASE: "https://bconnectto.firebaseio.com/"
			}
		})

}())