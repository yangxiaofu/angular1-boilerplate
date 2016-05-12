(function(){
	var DescriptionController = function($scope, cardFactory, $location, user, $window){
		$scope.description = null;

		$scope.submitDescription = function(description){
			cardFactory.addDescription(description)
				.then(function(){
					$location.path('products').replace();
				})
				.catch(function(err){
					console.log('Error ' + err);
				})
		}

		function getDescription(userId){
			cardFactory.getCard(userId)
				.then(function(card){
					var description = card.info.Description;
					$scope.description = description;
					$scope.$apply();
					//Need to display the description
				})
				.catch(function(err){
					console.log(err);
				})
		}

		function init(){
			user.isLoggedIn()
				.then(function(authData){
					if (authData === null){
						$location.path('login').replace();
						return;
					}else{
						var userId = $window.sessionStorage.uid;
						getDescription(userId);
					}


				})
				.catch(function(err){
					console.log(`${err}`)
				})
		}

		init();

	}

	DescriptionController.$inject = ['$scope', 'cardFactory', '$location', 'userFactory', '$window'];

	angular.module('bconnectApp')
		.controller('descriptionController', DescriptionController);
}())