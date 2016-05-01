(function() {
	var SearchController = function($scope, $rootScope, $window, $location, searchFactory, userFactory, $routeParams, searchHistoryFactory, products) {
		$scope.keyword = $routeParams.keyword;
		$scope.cards = [];
		$scope.cardsCol1 = [];
		$scope.cardsCol2 = [];
		$scope.cardsCol3 = [];
		$scope.selectedDropDownItem = null;
		$scope.dropdownItems = ['Busbar', 'ERICO', 'Prince'];
		$scope.initProducts = [];

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
			$scope.cardsCol1 = [];
			$scope.cardsCol2 = [];
			$scope.cardsCol3 = [];

			addToSearchHistory(keyword);

			searchFactory.findUsers(keyword)
				.then(function(users) {
					var column = 1;
					for (var user in users) {
						sortCard(user, column);

						if (column === 3) {
							column = 1;
						} else {
							column = column + 1;
						}
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

		function sortCard(user, column) {
			userFactory.getCard(user)
				.then(function(card) {
					card.emailHash = calcMD5(card.Email);

					userFactory.getProducts(card.userId)
						.then(function(products) {
							card.products = products;

							toggleAlert(null, true);
							
							switch (column) {
								case 1:
									
									$scope.cardsCol1.push(card);
									break;
								case 2:
									
									$scope.cardsCol2.push(card);
									break;
								case 3:
								
									$scope.cardsCol3.push(card);
									break;
							}

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

		function getProductsList(){

			products.getProducts()
				.then(function(products){
					for (var product in products){
						$scope.initProducts.push(product);
					}
					$scope.$apply();
				})
				.catch(function(err){
					console.log(err);
				})
		}

		function init() {
			if ($scope.keyword !== undefined) {
				$scope.hidden = false;
				$scope.search($scope.keyword);
			}

			if ($routeParams.keyword !== undefined){
				var keyword = $routeParams.keyword;
				addToSearchHistory(keyword);
			}

			getProductsList();
		}

		init();
	}

	SearchController.$inject = ['$scope', '$rootScope', '$window', '$location', 'searchFactory', 'userFactory', '$routeParams', 'searchHistoryFactory', 'FBProducts'];

	angular.module('bconnectApp')
		.controller('searchController', SearchController);

}())