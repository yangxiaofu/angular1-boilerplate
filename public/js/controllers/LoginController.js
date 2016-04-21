(function(){
	var LoginController = function($http, $scope, loginFactory, $firebaseObject, FBObject){

		loginFactory.getCard("6380db0f-bce7-42cd-8814-0db5816e546e")
			.then(function(card){
				console.log(card);
			})
			.catch(function(err){
				console.log(err);
			})
	}

	LoginController.$inject = ['$http', '$scope', 'loginFactory', '$firebaseObject', 'FBObject'];

	angular.module('bconnectApp')
		.controller('loginController', LoginController);
}())