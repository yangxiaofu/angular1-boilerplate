(function() {
	var ProductsController = function($http, $scope, user, productFactory) {
		$scope.userId = null;
		$scope.email = null;
		$scope.productToAdd = null;
		$scope.myProducts = [];
		$scope.relatedProducts = [];

		var myProducts = new Set();
		var relatedProducts = new Set();

		init()

		function init() {
			getUserId();
		}

		function addRelatedProduct(product) {
			relatedProducts.add(product);
			
			let difference = new Set([...relatedProducts].filter(x => !myProducts.has(x)));
			$scope.relatedProducts = [...difference];
		}

		function removeRelatedProduct(product) {
			relatedProducts.delete(product);
			$scope.relatedProducts = [...relatedProducts];
		}

		function addProduct(product) {
			myProducts.add(product);
			$scope.myProducts = [...myProducts];
		}

		function removeProduct(product) {
			myProducts.delete(product);
			$scope.myProducts = [...myProducts];
		}

		function getUserId() {
			user.getUserId()
				.then(function(response) {
					$scope.userId = response.userId;
					getMyProducts($scope.userId);
				})
				.catch(function(err) {
					console.log(err);
				})
		}

		function getMyProducts(userId) {
			user.getUserProducts(userId)
				.then(function(response) {
					for (let x in response) {
						addProduct(x);
						console.log(x);
					}

				})
				.catch(function(error) {
					console.log(error);
				})
		}

		//Scope
		$scope.addProductToUser = function(product) {

			if (product !== null) {

				addProduct(product);

				productFactory.addProductToUser(product)
					.then(function(response) {
						for (var x in response) {
							relatedProducts.add(x);
							addRelatedProduct(x);
						}
						console.log(response);
					})
					.catch(function(err) {
						console.log(err);
					})
			}
		}

		$scope.removeProductFromUser = function(product) {
			if (product != null) {
				removeProduct(product);

				productFactory.removeProductFromUser(product)
					.then(function() {
						console.log('Success');
					})
					.catch(function() {
						console.log('Failed');
					})
			}
		}

		$scope.getRelatedProducts = function() {
			productFactory.getRelatedProducts($scope.productToAdd)
				.then(function(response) {
					console.log(`Related Product: ${$scope.relatedProducts}`);
				})
				.catch(function(error) {

				})
		}
		//functions
	}

	ProductsController.$inject = ['$http', '$scope', 'loginFactory', 'FBProducts'];

	angular.module('bconnectApp')
		.controller('productsController', ProductsController);
}())