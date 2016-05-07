(function() {
	var SearchController = function($scope, $rootScope, $window, $location, searchFactory, userFactory, $routeParams, searchHistoryFactory, products, $http) {
		$scope.keyword = $routeParams.keyword;
		$scope.cards = [];
		$scope.cardsCol1 = [];
		$scope.cardsCol2 = [];
		$scope.cardsCol3 = [];
		$scope.selectedDropDownItem = null;
		$scope.dropdownItems = ['Busbar', 'ERICO', 'Prince'];
		$scope.initProducts = [];

		var emailSet = new Set();
		$scope.hidden = true;
		$scope.userProducts = [];
		$scope.errorMessage = null;
		$scope.hideAlert = true;
		$scope.profileImageURL = $window.sessionStorage.profileImageUrl;

		$scope.openProductDetails = function(userId) {
			$scope.userProducts = [];
			userFactory.getProducts(userId)
				.then(function(products) {
					toggleAlert(null, true);
					for (var product in products) {
						$scope.userProducts.push(product);
					}
					$scope.$apply();
				})
				.catch(function(err) {
					toggleAlert(err, false);
				})
		}

		$scope.openDialog = function() {
			userFactory.isLoggedIn()
				.then(function(authData) {
					if (authData !== null) {
						bootbox.dialog({
							title: "Your message here",
							message: '<label for="company">Company</label>' +
								'<input class="form-control" placeholder="Company" id="company"/><br />' +
								'<label for="message">Message</label>' +
								'<textarea class="form-control" id="message" row="5">Hi, I would like to get more information on your products.  ' +
								'Please reply to respond.' +
								'</textarea><br />' +
								'<label for="email-address">bcc</label>' +
								'<input class="form-control" placeholder="Email Address" id="email-address">',
							buttons: {
								success: {
									label: "Send",
									className: "btn-success",
									callback: function() {
										var company = $('#company').val();
										var message = $('#message').val();
										var email = $('#email-address').val();

										data = {
											to: "fudaviddong@gmail.com",
											sender: "fudavid.dong@pentair.com",
											subject: "Product Interest " + company,
											message: message,
											html: message
										}

										$http.post('https://dd-email.herokuapp.com/sendEmail', data)
											.success(function(response){
												console.log(response);
											})
											.catch(function(err){
												console.log(err);
											});


										//Send a message in this statemetn
										//Example.show("Hello " + name + ". You've chosen <b>" + answer + "</b>");
									}
								}
							}
						});
					} else {
						$location.path('/signup').replace();
						$scope.$apply();
					}
				})

		}

		$scope.search = function(keyword) {

			if (keyword !== undefined) {

				$scope.cardsCol1.forEach(function(each) {
					var index = $scope.cardsCol1.indexOf(each);

					$scope.cardsCol1.splice(index, 1);
				});
				$scope.cardsCol2.forEach(function(each) {

					var index = $scope.cardsCol1.indexOf(each);
					$scope.cardsCol2.splice(index, 1);

				});

				$scope.cardsCol3.forEach(function(each) {

					var index = $scope.cardsCol1.indexOf(each);
					$scope.cardsCol3.splice(index, 1);

				});

				addToSearchHistory(keyword);

				searchFactory.findUsers(keyword)
					.then(function(users) {
						var column = 1;
						for (var user in users) {
							sortCard(user, column);

							if (column === 3) {
								column = 1;
							} else {
								column = column + 1;
							}
						}
					})
					.catch(function(err) {
						toggleAlert(err, false);
					})
			}

		};

		$scope.addToEmailList = function(email) {
			if (emailSet.has(email)) {
				emailSet.delete(email);
			} else {
				emailSet.add(email);
			}
		}

		function sortCard(user, column) {
			userFactory.getCard(user)
				.then(function(card) {
					card.emailHash = calcMD5(card.Email);

					userFactory.getProducts(card.userId)
						.then(function(products) {
							card.products = products;

							toggleAlert(null, true);

							switch (column) {
								case 1:

									$scope.cardsCol1.push(card);
									break;
								case 2:

									$scope.cardsCol2.push(card);
									break;
								case 3:

									$scope.cardsCol3.push(card);
									break;
							}

							$scope.hidden = false;
							$scope.$apply();
						})
						.catch(function(err) {
							console.log(err);
						})

				})
				.catch(function(err) {
					toggleAlert(err, false);
				})


		}

		function addToSearchHistory(keyword) {
			searchHistoryFactory.addToSearchHistory(keyword)
		}

		function toggleAlert(err, hide) {
			if (hide) {
				$scope.hideAlert = hide;
			} else {
				$scope.hideAlert = false;
				$scope.errorMessage = err;

			}
			$scope.$apply();
		}

		function getProductsList() {

			products.getProducts()
				.then(function(products) {
					for (var product in products) {
						$scope.initProducts.push(product);
					}
					$scope.$apply();
				})
				.catch(function(err) {
					console.log(err);
				})
		}

		function init() {
			if ($scope.keyword !== undefined) {
				$scope.hidden = false;
				$scope.search($scope.keyword);
			}

			if ($routeParams.keyword !== undefined) {
				var keyword = $routeParams.keyword;
				addToSearchHistory(keyword);
			}

			getProductsList();
		}

		init();
	}

	SearchController.$inject = ['$scope', '$rootScope', '$window', '$location', 'searchFactory', 'userFactory', '$routeParams', 'searchHistoryFactory', 'FBProducts', '$http'];

	angular.module('bconnectApp')
		.controller('searchController', SearchController);

}())