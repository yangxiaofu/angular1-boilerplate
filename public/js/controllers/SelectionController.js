(function() {
	var SelectionController = function($http, $scope, categoryFactory, userFactory) {

		$scope.categoriesArray = [];
		$scope.myCategoriesArray = [];
		$scope.userId = null;

		init();

		$scope.segueToPortolioMaker = function(){
			window.location.href = '/#/products';
		}

		$scope.addToUser = function(category){
			$scope.myCategoriesArray.push(category);
			categoryFactory.addCategoryToUser(category, $scope.userId)
				.then(function(response){	
					console.log(response);
				})
				.catch(function(error){

				})
		}

		$scope.removeCategoryFromUser = function(category, index){
			$scope.myCategoriesArray.splice(index, 1);
			categoryFactory.removeCategoryFromUser(category, $scope.userId)
				.then(function(resolve){
					
				})
				.catch(function(reject){

				});

			
		}

		function init() {
			getUserId()
			getCategories();
			
		}

		function getUserId(){
			userFactory.getUserId()
				.then(function(response){
					$scope.userId = response.userId;
					getUserCategories($scope.userId);
				})
				.catch(function(error){
					console.log(error);
					//window.location.href = "/";
				})
		}

		function getUserCategories(userId){
			categoryFactory.getUserCategories(userId)
				.then(function(userCategories){
					for (myCategory in userCategories){
						$scope.myCategoriesArray.push(myCategory);
					}
					$scope.$apply();
				})
				.catch(function(err){
					console.log(err);
				})
		}

		function getCategories() {
			categoryFactory.getCategories()
				.then(function(categories) {
					console.log(categories);
					for (var category in categories) {
						$scope.categoriesArray.push(category);
					}
					$scope.$apply();
				})
				.catch(function(err) {

				})
		}

	}

	SelectionController.$inject = ['$http', '$scope', 'categoryFactory', 'loginFactory'];

	angular.module('bconnectApp')
		.controller('selectionController', SelectionController);
}())