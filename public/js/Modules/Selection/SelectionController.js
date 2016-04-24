(function() {
	var SelectionController = function($http, $scope, categoryFactory, userFactory, appSettings) {
		var categorySet = new Set();
		var myCategorySet = new Set();
		$scope.categoriesArray = [];
		$scope.myCategoriesArray = [];
		$scope.userId = userFactory.getUserId();
		$scope.appSettings = appSettings;
		

		init();


		$scope.addCategoryToUser = function(category) {
			addUserCategory(category);
			categoryFactory.addCategoryToUser(category, $scope.userId)
				.then(function(response) {
					console.log('Added');
				})
		}

		$scope.removeCategoryFromUser = function(category, index) {

			//Front End User Swap
			$scope.categoriesArray.push(category);
			$scope.myCategoriesArray.splice(index, 1);
			myCategorySet.delete(category);
			
			categoryFactory.removeCategoryFromUser(category, $scope.userId)
				.then(function(resolve) {
					console.log('Removed');
				})
		}

		$scope.segueToPortfolioMaker = function(){
			console.log('Shoudl segue now');
			window.location.href = '#/products';
		}

		// Functions //

		function init() {
			getCategories();
			getUserCategories($scope.userId);
		}

		var addUserCategory = function(category) {
			myCategorySet.add(categorySet);
			$scope.categoriesArray = [...categorySet];
			$scope.myCategoriesArray = [...myCategorySet];

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
						addUserCategory(myCategory);
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
						categorySet.add(category);
					}
					$scope.$apply();
				})
				.catch(function(err) {

				})
		}



	}

	SelectionController.$inject = ['$http', '$scope', 'categoryFactory', 'userFactory', 'appSettings'];

	angular.module('bconnectApp')
		.controller('selectionController', SelectionController);
}())