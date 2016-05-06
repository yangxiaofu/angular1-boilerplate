(function() {
	var SelectionController = function($http, $scope, categoryFactory, userFactory, appSettings, $location, arrayFactory, searchFactory) {
		var categorySet = new Set();
		var myCategorySet = new Set();
		var categoriesArray = [];
		var myCategoriesArray = [];

		$scope.categoriesArray = [];
		$scope.myCategoriesArray = [];
		$scope.userId = userFactory.getUserId();
		$scope.appSettings = appSettings;

		$scope.addCategoryToUser = function(category) {
			var index = $scope.categoriesArray.indexOf(category);

			$scope.myCategoriesArray.push(category);
			$scope.categoriesArray.splice(index, 1);

			categoryFactory.addCategoryToUser(category, $scope.userId)
				.then(function(response) {
					searchFactory.addString(category, $scope.userId);
				})
		}

		$scope.removeCategoryFromUser = function(category, index) {
			var index = $scope.myCategoriesArray.indexOf(category);
			//Front End User Swap
			$scope.categoriesArray.push(category);
			$scope.myCategoriesArray.splice(index, 1);

			categoryFactory.removeCategoryFromUser(category, $scope.userId)
				.then(function(resolve) {
					searchFactory.removeString(category, $scope.userId);
					console.log('Removed Category from user');
				})
		}

		$scope.segueToPortfolioMaker = function() {
			$location.path = 'products';
		}

		// Functions //

		function init() {
			getCategories()
				.then(function(categories) {
					for (var category in categories) {
						categoriesArray.push(category);
					}
					getUserCategories($scope.userId)
						.then(function(userCategories) {
							for (myCategory in userCategories) {
								myCategoriesArray.push(myCategory);
							}
							$scope.categoriesArray = arrayFactory.filter(categoriesArray, myCategoriesArray);
							$scope.myCategoriesArray = arrayFactory.filter(myCategoriesArray, categoriesArray);
							$scope.$apply();
						})
				})


		}

		function getUserId() {
			userFactory.getUserId()
				.then(function(response) {
					$scope.userId = response.userId;
					getUserCategories($scope.userId);
				})
				.catch(function(error) {
					console.log(error);
				})
		}

		function getUserCategories(userId) {
			return categoryFactory.getUserCategories(userId)

		}

		function getCategories() {
			return categoryFactory.getCategories();

		}

		init();


	}

	SelectionController.$inject = ['$http', '$scope', 'categoryFactory', 'userFactory', 'appSettings', '$location', 'arrayFactory', 'searchFactory'];

	angular.module('bconnectApp')
		.controller('selectionController', SelectionController);
}())