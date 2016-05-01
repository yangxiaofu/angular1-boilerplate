(function() {
	var ProductsController = function($http, $scope, user, productFactory, $rootScope, $window, $location) {
		var loggedIn = $rootScope.loggedIn;
		
		if (loggedIn) {
			$scope.userId = user.getUserId();
			$scope.email = null;
			$scope.productToAdd = null;
			$scope.myProducts = [];
			$scope.relatedProducts = [];
			$scope.initProducts = [];

			var myProducts = new Set();
			var relatedProducts = new Set();

			function init() {
				getMyProducts()

				getProductList();
			}


			function getProductList(){
				productFactory.getProducts()
					.then(function(products){
						for (var product in products){
							$scope.initProducts.push(product);
						}

						$scope.$apply();
					})

			}

			function addRelatedProduct(product) {
				relatedProducts.add(product);
				$scope.relatedProducts = [...relatedProducts];
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
						for (var x in response) {
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
			init()
		} else {
			$location.path('login').replace();
			
		}


		

		//functions
	}

	ProductsController.$inject = ['$http', '$scope', 'userFactory', 'FBProducts', '$rootScope', '$window', '$location'];

	angular.module('bconnectApp')
		.controller('productsController', ProductsController);
}())