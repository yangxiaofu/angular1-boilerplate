(function() {
	var SearchController = function($scope, $rootScope, $window, $location, searchFactory, userFactory, $routeParams, searchHistoryFactory) {

		$scope.keyword = $routeParams.keyword;
		$scope.cards = [];
		var emailSet = new Set();
		$scope.hidden = true;
		$scope.userProducts = [];
		$scope.errorMessage = null;
		$scope.hideAlert = true;
		$scope.profileImageURL = $window.sessionStorage.profileImageUrl;

		$scope.openProductDetails = function(userId) {
			$scope.userProducts = [];
			userFactory.getProducts(userId)
				.then(function(products) {
					toggleAlert(null, true);
					for (var product in products) {
						$scope.userProducts.push(product);
					}

					$scope.$apply();
				})
				.catch(function(err) {
					toggleAlert(err, false);
				})
		}

		$scope.search = function(keyword) {
			$scope.cards = [];

			addToSearchHistory(keyword);

			searchFactory.findUsers(keyword)
				.then(function(users) {
					for (var user in users) {
						userFactory.getCard(user)
							.then(function(card) {
								card.emailHash = calcMD5(card.Email);

								userFactory.getProducts(card.userId)
									.then(function(products) {
										card.products = products;
										
										toggleAlert(null, true);
										$scope.cards.push(card);
										$scope.hidden = false;
										$scope.$apply();
									})
									.catch(function(err) {
										console.log(err);
									})

							})
							.catch(function(err) {
								toggleAlert(err, false);
							})
					}
				})
				.catch(function(err) {
					toggleAlert(err, false);
				})
		};

		$scope.addToEmailList = function(email) {
			if (emailSet.has(email)) {
				emailSet.delete(email);
			} else {
				emailSet.add(email);
			}
		}

		function addToSearchHistory(keyword) {
			searchHistoryFactory.addToSearchHistory(keyword)
		}

		function toggleAlert(err, hide) {
			if (hide) {
				$scope.hideAlert = hide;
			} else {
				$scope.hideAlert = false;
				$scope.errorMessage = err;

			}
			$scope.$apply();

		}

		function init() {
			if ($scope.keyword !== undefined) {
				$scope.hidden = false;
				$scope.search($scope.keyword);
			}
		}

		init();
	}

	SearchController.$inject = ['$scope', '$rootScope', '$window', '$location', 'searchFactory', 'userFactory', '$routeParams', 'searchHistoryFactory'];

	angular.module('bconnectApp')
		.controller('searchController', SearchController);

}())