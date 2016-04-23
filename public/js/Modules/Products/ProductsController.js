(function() {
	var ProductsController = function($http, $scope, user, productFactory, $rootScope) {

		console.log($rootScope.loggedIn);
		if ($rootScope.loggedIn === true) {

			$scope.userId = user.getUserId();
			$scope.email = null;
			$scope.productToAdd = null;
			$scope.myProducts = [];
			$scope.relatedProducts = [];

			var myProducts = new Set();
			var relatedProducts = new Set();

			init()

			function init() {
				getMyProducts();
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

			}

			function getMyProducts() {
				user.getUserProducts($scope.userId)
					.then(function(response) {
						for (let x in response) {
							addProduct(x);
						}
						$scope.$apply();

					})
					.catch(function(error) {

					})
			}

			//Scope
			$scope.addProductToUser = function(product) {

				if (product !== null) {

					addProduct(product);

					productFactory.addProductToUser(product, $scope.userId)
						.then(function(response) {
							for (var x in response) {
								relatedProducts.add(x);
								addRelatedProduct(x);
							}
							$scope.$apply();

						})
				}
			}

			$scope.removeProductFromUser = function(product) {
				if (product != null) {
					removeProduct(product);

					productFactory.removeProductFromUser(product, $scope.userId)
						.then(function() {
							$scope.$apply();
						})
						.catch(function() {

						})
				}
			}

			$scope.getRelatedProducts = function() {
				productFactory.getRelatedProducts($scope.productToAdd)
					.then(function(response) {

						$scope.$apply();
					})
					.catch(function(error) {

					})
			}

		} else {
			window.location.href = '#/login';
		}


		//functions
	}

	ProductsController.$inject = ['$http', '$scope', 'userFactory', 'FBProducts', '$rootScope'];

	angular.module('bconnectApp')
		.controller('productsController', ProductsController);
}())