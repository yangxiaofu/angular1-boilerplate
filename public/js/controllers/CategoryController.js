(function() {
	var CategoryController = function($scope, $http, categoryFactory) {
		$scope.name = null;
		$scope.categories = [];
		$scope.productsInCategory = [];
		$scope.categoryToAdd = null;
		$scope.categoryProducts = null;
		$scope.display = false;
		$scope.selectedCategory = null;
		$scope.productToAdd = null;

		init();
		//Load anything on the page that needs to be loaded. 
		function init() {
			getCategories();
		}

		function getCategories() {
			categoryFactory.getCategories()
				.then(function(response) {
					for (var each in response) {
						$scope.categories.push(each);
					}
					console.log($scope.categories);
				})
				.catch(function() {

				})
		}

		$scope.addProductToCategory = function(category, product) {


			categoryFactory.addProductToCategory($scope.productToAdd, $scope.selectedCategory)
				.then(function(response) {
					$scope.productsInCategory.push($scope.productToAdd);
					$scope.productToAdd = null;
				})
				.catch(function(error) {
					console.log(error);
				})

		}

		$scope.removeProductFromCategory = function(index, product) {
			categoryFactory.removeProductFromCategory(product, $scope.selectedCategory)
				.success(function(response) {
					$scope.productsInCategory.splice(index, 1);
				})
				.error(function(err) {

				})
		}

		$scope.showProducts = function(category) {
			$scope.selectedCategory = category;
			$scope.productsInCategory = [];

			if ($scope.display === false) {
				$scope.display = true;
			}

			categoryFactory.getProductsFromCategory(category)
				.then(function(response) {
					for (var product in response) {
						$scope.productsInCategory.push(product);
					}
				})
				.catch(function(err) {
					console.log(err);
				})
		}

		$scope.addCategory = function(cateogoryToAdd) {
			if ($scope.categoryToAdd !== null) {
				categoryFactory.addCategory($scope.categoryToAdd)
					.then(function(response) {
						$scope.categories.push($scope.categoryToAdd);
						$scope.categoryToAdd = null;
					})
					.catch(function(err) {
						console.log(err);
					})
			}
		}

		$scope.removeCategory = function(index) {
			bootbox.confirm("Are you sure you want to delete this category?", function(result) {
				if (result === true) {
					var key = $scope.categories[index];
					$scope.categories.splice(index, 1);
					categoryFactory.removeCategory(key)
						.success(function() {
							console.log('Success');
						})
						.error(function() {
							console.log('Failed');
						});
				}
			});
		}
	};

	CategoryController.$inject = ['$scope', '$http', 'categoryFactory'];

	angular.module('bconnectApp')
		.controller('categoryController', CategoryController);
}())