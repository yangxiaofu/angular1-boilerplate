(function(){
	var LoginController = function($http, $scope, loginFactory, $firebaseObject, test){
		$scope.test = null;
		
		$scope.getAdmin = function(word){
			console.log(word);
		}


		
		// test.getUserCard("6380db0f-bce7-42cd-8814-0db5816e546e")
		// 	.then(function(card){
		// 		console.log(card);
		// 	})	
		// 	.catch(function(err){

		// 	})
	}

	LoginController.$inject = ['$http', '$scope', 'loginFactory', '$firebaseObject', 'FBProducts'];

	angular.module('bconnectApp')
		.controller('loginController', LoginController);
}())