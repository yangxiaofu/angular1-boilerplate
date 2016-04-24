(function() {
	var SelectionController = function($http, $scope, categoryFactory, userFactory, appSettings, $location, arrayFactory) {
		var categorySet = new Set();
		var myCategorySet = new Set();
		$scope.categoriesArray = [];
		$scope.myCategoriesArray = [];
		$scope.userId = userFactory.getUserId();
		$scope.appSettings = appSettings;
		

		init();

		$scope.addCategoryToUser = function(category) {
			var index = $scope.categoriesArray.indexOf(category);

			$scope.myCategoriesArray.push(category);
			$scope.categoriesArray.splice(index, 1);

			categoryFactory.addCategoryToUser(category, $scope.userId)
				.then(function(response) {
					
				})
		}

		$scope.removeCategoryFromUser = function(category, index) {
			var index = $scope.myCategoriesArray.indexOf(category);
			//Front End User Swap
			$scope.categoriesArray.push(category);
			$scope.myCategoriesArray.splice(index, 1);
			
			categoryFactory.removeCategoryFromUser(category, $scope.userId)
				.then(function(resolve) {
					console.log('Removed');
				})
		}

		$scope.segueToPortfolioMaker = function(){
			$location.path = 'products';
			$scope.$apply();
		}

		// Functions //

		function init() {
			getCategories();
			getUserCategories($scope.userId);

			var a = ['a', 'g', 'c', 'd'];
			var b = ['b', 'c', 'e'];

			var result = arrayFactory.intersection(a,b);

			var a = ['a', 'g', 'c', 'd'];
			var b = ['b', 'c', 'e'];

			var result = arrayFactory.union(a,b);
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
			categoryFactory.getUserCategories(userId)
				.then(function(userCategories) {
					for (myCategory in userCategories) {
						$scope.myCategoriesArray.push(myCategory);
						
					}
					$scope.$apply();
				})
				.catch(function(err) {

				})
		}

		function getCategories() {
			categoryFactory.getCategories()
				.then(function(categories) {
					for (var category in categories) {
						$scope.categoriesArray.push(category);
					}
					$scope.$apply();
				})
				.catch(function(err) {

				})
		}



	}

	SelectionController.$inject = ['$http', '$scope', 'categoryFactory', 'userFactory', 'appSettings', '$location', 'arrayFactory'];

	angular.module('bconnectApp')
		.controller('selectionController', SelectionController);
}())