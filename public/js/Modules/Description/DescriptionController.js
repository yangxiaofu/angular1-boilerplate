(function(){
	var DescriptionController = function($scope, cardFactory, $location, user, $window, $timeout){
		$scope.description = null;
		$scope.saveStatus = 'Save';
		$scope.hideContinue = true;

		$scope.submitDescription = function(description){
			cardFactory.addDescription(description)
				.then(function(){
					$scope.saveStatus = 'Saved';
					$scope.hideContinue = false;
					$scope.$apply();

					$timeout(function(){
						$scope.saveStatus = 'Save';
						$scope.$apply();
					}, 2000)
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

	DescriptionController.$inject = ['$scope', 'cardFactory', '$location', 'userFactory', '$window', '$timeout'];

	angular.module('bconnectApp')
		.controller('descriptionController', DescriptionController);
}())