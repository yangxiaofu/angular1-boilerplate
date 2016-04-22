(function() {
	var CategoryFactory = function($rootScope) {
		var FBURL = {};
		FBURL.BASE = $rootScope.FBURL.BASE;
		var factory = {};

		factory.getCategories = function() {
			var url = FBURL.BASE + '/Categories';
			var url_ref = new Firebase(url);

			return new Promise(function(resolve, reject) {
				url_ref.once("value", function(snapshot) {
					var categories = snapshot.val();
					var myCategories = {};
					var data = {};
					snapshot.forEach(function(category) {
						var categoryName = category.key();
						data[categoryName] = true;
					});

					resolve(data);

				});
			})
		}

		factory.getUserCategories = function(userId) {
			if (userId === null) {
				res.badRequest(500);
			} else {
				var url = FBURL.BASE + '/Users/' + userId + '/Categories';
				var url_ref = new Firebase(url);

				return new Promise(function(resolve, reject) {
					url_ref.once('value', function(snapshot) {
						var categories = snapshot.val();
						resolve(categories);
					});
				})

			}
		}

		factory.addCategory = function(ProductCategory) {
			var data = {
				[ProductCategory]: {
					name: ProductCategory
				}
			}
			return new Promise(function(resolve, reject) {
				FBObject.saveInBlockReturnObjects('Categories', data)
					.then(function(response) {
						resolve(response);
					})
					.catch(function(err) {
						reject(err);
					});
			})
		}

		factory.removeCategory = function(category) {


			return new Promise(function(resolve, reject) {
				var url = FBURL.BASE + '/Categories/' + category;
				var url_ref = new Firebase(url);

				url_ref.remove();
				resolve('Success');

			})
		}

		factory.removeCategoryFromUser = function(category, userId) {
			return new Promise(function(resolve, reject) {
				var url = FBURL.BASE + '/Users/' + userId + '/Categories/' + category;
				var url_ref = new Firebase(url);

				url_ref.remove();

				var url1 = FBURL.BASE + '/Categories/' + category + '/Users/' + userId;
				var url1_ref = new Firebase(url1);

				url1_ref.remove();

				resolve('Success');

			});
		}

		

		factory.addProductToCategory = function(product, category) {
			return new Promise(function(resolve, reject) {
				if ((category !== null) || (product !== null)) {


					var categoryData = {
						[category]: true
					}

					var url = FBURL.BASE + '/ProductIndex/' + product + '/Category';

					var url_ref = new Firebase(url);
					url_ref.update(categoryData);

					var data2 = {
						[product]: true
					}
					var url2 = FBURL.BASE + '/Categories/' + category + '/Products';
					var url2_ref = new Firebase(url2);
					url2_ref.update(data2);

					resolve('Success');
				} else {
					reject('Bad Request');
				}

			})
		}

		factory.getProductsFromCategory = function(category) {
			return new Promise(function(resolve, reject) {
				if (category !== null) {
					var url = FBURL.BASE + '/Categories/' + category + '/Products';
					var url_ref = new Firebase(url);

					url_ref.once("value", function(snapshot) {
						var products = snapshot.val();

						resolve(products);
					});

				} else {
					reject('Bad Request');
				}
			})
		}

		factory.addCategoryToUser = function(category, userId) {
			return new Promise(function(resolve, reject) {
				var url = FBURL.BASE + '/Users/' + userId + '/Categories';
				var url_ref = new Firebase(url);

				var data = {
					[category]: true
				}

				url_ref.update(data);

				var url2 = FBURL.BASE + '/Categories/' + category + '/Users/';
				var url2_ref = new Firebase(url2);

				url2_ref.update({
					[userId]: true
				});

				resolve('Success');

			})
		}

		factory.removeProductFromCategory = function(product, category) {

			return new Promise(function(resolve, reject) {
				var url = FBURL.BASE + '/Categories/' + category + '/Products/' + product;
				var url_ref = new Firebase(url);

				url_ref.remove();

				resolve('Success');

			})
		}

		return factory;

	}

	angular.module('bconnectApp')
		.factory('categoryFactory', CategoryFactory);

}())