(function() {
	var SearchController = function($scope, $rootScope, $window, $location, searchFactory, userFactory, $routeParams) {

		$scope.keyword = $routeParams.keyword;
		$scope.cards = [];
		var emailSet = new Set();
		$scope.hidden = true;

		$scope.search = function(keyword) {
			$scope.cards = [];

			searchFactory.findUsers(keyword)
				.then(function(users) {
					for (var user in users) {
						userFactory.getCard(user)
							.then(function(card) {
								$scope.cards.push(card);
								$scope.hidden = false;
								$scope.$apply();
							})
							.catch(function(err) {

							})
					}
				})
				.catch(function(err) {
					console.log(`Error: ${err}`);
				})

		};

		$scope.addToEmailList = function(email) {

			if (emailSet.has(email)) {
				emailSet.delete(email);
			} else {
				emailSet.add(email);
			}
		}

		function init() {
			console.log($scope.keyword);
			if ($scope.keyword !== undefined) {
				$scope.hidden = false;
				$scope.search($scope.keyword);
			}
		}

		init();
	}

	SearchController.$inject = ['$scope', '$rootScope', '$window', '$location', 'searchFactory', 'userFactory', '$routeParams'];

	angular.module('bconnectApp')
		.controller('searchController', SearchController);

}())