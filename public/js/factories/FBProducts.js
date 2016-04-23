(function() {
	var FBProducts = function($rootScope, FBUser) {
		var FBURL = {};
		FBURL.BASE = $rootScope.FBURL.BASE;

		var factory = {};

		function updateCategory(category, product) {
			var data = {
				[product]: true
			}
			var url = FBURL.BASE + '/Categories/' + category + '/Products';

			var url_ref = new Firebase(url);

			url_ref.update(data);
		}

		function updateUser(product, userId) {
			var url = FBURL.BASE + '/ProductIndex/' + product + '/Users/';
			var url_ref = new Firebase(url);
			var data = {
				[userId]: true
			}

			url_ref.update(data);
		}

		function updateBranch(r, i) {
			var relatedProduct_url = FBURL.BASE + '/ProductIndex/' + r + '/RelatedProducts/' + i;
			var relatedProduct_url_ref = new Firebase(relatedProduct_url);
			var newRelatedArray = [];
			var branch = {};

			relatedProduct_url_ref.once("value", function(relatedProduct_branch) {

				if (relatedProduct_branch.val() !== null) {
					var value = relatedProduct_branch.val();
					var count = value.count + 1;

					branch = {
						count: count,
						updateAt: Firebase.ServerValue.TIMESTAMP
					}

				} else {

					branch = {
						count: 1,
						updateAt: Firebase.ServerValue.TIMESTAMP,
						createdAt: Firebase.ServerValue.TIMESTAMP
					}

				}

				relatedProduct_url_ref.update(branch);
				return;
			});
		}

		function subtractIndex(r, i) {
			var relatedProduct_url = FBURL.BASE + '/ProductIndex/' + r + '/RelatedProducts/' + i;
			var relatedProduct_url_ref = new Firebase(relatedProduct_url);
			var newRelatedArray = [];
			var branch = {};

			relatedProduct_url_ref.once("value", function(relatedProduct_branch) {

				if (relatedProduct_branch.val() !== null) {
					var value = relatedProduct_branch.val();
					count = value.count - 1;

					branch = {
						count: count,
						updateAt: Firebase.ServerValue.TIMESTAMP
					}

				}
				relatedProduct_url_ref.update(branch);
				return;
			});
		}

		function indexProduct(userId, product, relatedProducts, categories) {
			var insertedProductArray = [];
			var relatedProductsArray = [];

			for (var thisProduct in relatedProducts) {
				if (thisProduct !== 'userId') {
					if (thisProduct === product) {
						insertedProductArray.push(thisProduct);
					} else {
						relatedProductsArray.push(thisProduct);
					}
				}
			}

			var productInitData = {
				name: insertedProductArray[0]
			}
			var url3 = FBURL.BASE + '/ProductIndex/' + insertedProductArray[0];
			var url3_ref = new Firebase(url3);
			url3_ref.update(productInitData);


			//Inserting related products
			var insertedProduct_url = FBURL.BASE + '/ProductIndex/' + insertedProductArray[0] + '/RelatedProducts';
			var insertedProduct_url_ref = new Firebase(insertedProduct_url);
			var newProductBranch = {};

			insertedProduct_url_ref.once("value", function(insertedProduct_branch) {
				if (insertedProduct_branch.val() !== null) {
					insertedProduct_branch.forEach(function(eachBranch) {
						var key = eachBranch.key();
						var value = eachBranch.val();

						for (var i in relatedProductsArray) {
							//Updates the count.
							if (key === relatedProductsArray[i]) {

								var count = value.count;
								count = count + 1;
								value.count = count;

								newProductBranch[key] = {
									count: count,
									updateAt: Firebase.ServerValue.TIMESTAMP
								}
							}
						}
					});
				} else {
					for (var i in relatedProductsArray) {

						newProductBranch[relatedProductsArray[i]] = {
							count: 1,
							createdAt: Firebase.ServerValue.TIMESTAMP,
							updateAt: Firebase.ServerValue.TIMESTAMP
						}
					}
				}

				var url2 = FBURL.BASE + '/ProductIndex/' + insertedProductArray[0];
				var url2_ref = new Firebase(url2);

				url2_ref.child('RelatedProducts');
				insertedProduct_url_ref.update(newProductBranch);



			});

			//Inserting the categories into the database
			var categories_url = FBURL.BASE + '/ProductIndex/' + insertedProductArray[0] + '/Categories';
			var categories_url_ref = new Firebase(categories_url);

			categories_url_ref.update(categories);

			for (var x in relatedProductsArray) {
				updateBranch(relatedProductsArray[x], insertedProductArray[0]);
			}

			updateUser(insertedProductArray[0], userId);

			for (var each in categories) {
				updateCategory(each, insertedProductArray[0]);
			}


			return new Promise(function(resolve, reject) {
				//Return a Promise that collects related products
				var url1 = FBURL.BASE + '/ProductIndex/' + insertedProductArray[0] + '/RelatedProducts';

				var url1_ref = new Firebase(url1);
				//FIXME: Need to order by count somehow somewhere. 
				url1_ref.once('value', function(snapshot) {
					var products = snapshot.val();

					resolve(products);

				});
			});
		}

		function deIndexProduct(product, relatedProducts) {
			var insertedProductArray = [product];
			var relatedProductsArray = [];

			for (var thisProduct in relatedProducts) {

				if (thisProduct !== 'userId') {
					relatedProductsArray.push(thisProduct);
				}
			}


			var insertedProduct_url = FBURL.BASE + '/ProductIndex/' + insertedProductArray[0];
			var insertedProduct_url_ref = new Firebase(insertedProduct_url);
			var newProductBranch = {};

			insertedProduct_url_ref.once("value", function(insertedProduct_branch) {

				if (insertedProduct_branch.val() !== null) {
					insertedProduct_branch.forEach(function(eachBranch) {
						var key = eachBranch.key();
						var value = eachBranch.val();

						for (var i in relatedProductsArray) {
							//Updates the count.
							if (key === relatedProductsArray[i]) {

								var count = value.count;
								count = count - 1;
								value.count = count;

								newProductBranch[key] = {
									count: count,
									updateAt: Firebase.ServerValue.TIMESTAMP
								}
							}
						}
					});
				}

				insertedProduct_url_ref.update(newProductBranch);
			});

			for (x in relatedProductsArray) {
				subtractIndex(relatedProductsArray[x], insertedProductArray[0]);
			}

			updateUser();
		}

		factory.getRelatedProducts = function(product) {
			return new Promise(function(resolve, reject) {
				var product_url = FBURL.BASE + '/ProductIndex/' + product + '/RelatedProducts';
				var product_url_ref = new Firebase(product_url);
				product_url_ref.orderByChild("count").limitToLast(10).once("value", function(snapshot) {
					var relatedProducts = snapshot.val();

					if (relatedProducts !== null) {
						resolve(relatedProducts);
					} else {
						error = {
							message: "This node does not exist"
						}
						reject(error);
					}


				});
			});
		}

		factory.removeProductFromUser = function(product, userId) {
			return new Promise(function(resolve, reject) {

				var url = FBURL.BASE + '/Users/' + userId + '/Products/' + product;
				var url_ref = new Firebase(url);

				url_ref.remove();

				var url1 = FBURL.BASE + '/ProductIndex/' + product + '/Users/' + userId;
				var url1_ref = new Firebase(url1);

				url1_ref.remove();

				//TODO: - DeIndex Product is important

				resolve('Success Removing');
			})
		}

		factory.addProductToUser = function(keyword, userId) {
			var productData = {};

			productData = {
				[keyword]: true
			}

			//GET THE CATEGORIES OF THE USER

			var url = FBURL.BASE + '/Users/' + userId + '/Categories';
			var url_ref = new Firebase(url);
			return new Promise(function(resolve, reject) {
				url_ref.once("value", function(snapshot) {
					var categories = snapshot.val();

					FBUser.addProduct(userId, 'Products', productData)
						.then(function(relatedProducts) {
							indexProduct(userId, keyword, relatedProducts, categories)
								.then(function(products) {
									resolve(products);
									$scope.$apply();
								})
								.catch(function(error) {
									reject(error);
								});

						})

				});
			})
		}

		factory.getUsers = function(product) {
			return new Promise(function(resolve, reject) {

				var Product = S(product).capitalize().s

				var url = FBURL.BASE + '/ProductIndex/' + Product + '/Users';

				var url_ref = new Firebase(url);

				url_ref.once("value", function(snapshot) {
					var card = null;
					var cards = [];

					if (snapshot.val() !== null) {

						snapshot.forEach(function(childSnapshot) {
							var key = childSnapshot.key();
							card = getUserCard(key)
								.then(function(card) {
									console.log(card);
									cards.push(card);
								})
								.catch(function(error) {

								})

						});
						resolve(cards);

					} else {
						var error = {};
						error.message = "This are no users";
						reject(error);
					}


				});
			});
		}

		factory.getUserCard = function(userId) {
			var url = FBURL.BASE + '/Card'
			var url_ref = new Firebase(url);

			return new Promise(function(resolve, reject) {
				url_ref.orderByChild('userId').equalTo(userId).on("child_added", function(snapshot) {
					var card = snapshot.val();
					resolve(card);
				});
			});
		}


		return factory;

	}

	FBProducts.$inject = ['$rootScope', 'userFactory'];

	angular.module('bconnectApp')
		.factory('FBProducts', FBProducts);
}())