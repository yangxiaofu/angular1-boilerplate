(function() {
	var CardController = function(user, $window, $scope, cardFactory) {
		userId = $window.sessionStorage.currentUser;
		$scope.cardKey = null;
		$scope.cardName = null;
		$scope.cardCompany = null;
		$scope.cardPosition = null;
		$scope.cardEmail = null;
		$scope.cardPhoneNumber = null;
		$scope.hideAlert = true;

		function init() {
			getCard(userId);
		}

		function getCard(userId) {
			cardFactory.getCard(userId)
				.then(function(card) {
					$scope.cardKey = card.key;
					$scope.cardName = card.info.Name;
					$scope.cardCompany = card.info.Company;
					$scope.cardPosition = card.info.Headline;
					$scope.cardEmail = card.info.Email;
					$scope.cardPhoneNumber = card.info.PhoneNumber;
					$scope.$apply();
					
				})
				.catch(function(error) {
					console.log(error);
				})
		}

		$scope.updateCard = function(){

			var info = {
				Name: $scope.cardName,
				Company: $scope.cardCompany,
				Headline: $scope.cardPosition, 
				Email: $scope.cardEmail,
				PhoneNumber: $scope.cardPhoneNumber
			}

			cardFactory.updateCard($scope.cardKey, info)	
				.then(function(response){
					$scope.hideAlert = false;
					$scope.updateMessage = response;

					setTimeout(function(){
						$scope.hideAlert = true;
					}, 5000)
					
				})
		}

		init();

	}

	CardController.$inject = ['userFactory', '$window', '$scope', 'cardFactory'];

	angular.module('bconnectApp')
		.controller('cardController', CardController);
}())