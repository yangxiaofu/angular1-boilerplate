(function() {
	var LoginFactory = function($firebaseObject, $rootScope) {
		var FBURL = {};
		FBURL.BASE = $rootScope.FBURL.BASE;

		var factory = {};

		factory.getUserId = function() {
			var url = FBURL.BASE;
			var ref = new Firebase(url);
			var authData = ref.getAuth();
			return authData.uid;
		}

		factory.isLoggedIn = function() {
			var url = FBURL.BASE;
			var ref = new Firebase(url);

			return new Promise(function(resolve, reject) {
				var loggedIn = ref.getAuth();
				if (loggedIn !== null) {
					resolve(true);
				} else {
					resolve(false);
				}
			})
		}

		factory.makeAdmin = function(email) {

			var url = FBURL.BASE + '/Users';
			var url_ref = new Firebase(url);

			url_ref.orderByChild('email').equalTo(email).once('child_added', function(snapshot) {
				var user = snapshot.val();
				var userId = user.userId;
				var data = {
					isAdmin: true
				}

				var url1 = FBURL.BASE + '/Users/' + userId;
				var url1_ref = new Firebase(url1);

				url1_ref.update(data);

				return;
			});
		}

		factory.removeAdmin = function(userId) {

			var data = {
				isAdmin: false
			}
			var url = FBURL.BASE + '/Users/' + userId;
			var url_ref = new Firebase(url);
			url_ref.update(data);
			return;

		}

		factory.getAdmin = function() {
			return new Promise(function(resolve, reject) {
				var url = FBURL.BASE + '/Users';
				var url_ref = new Firebase(url);

				url_ref.orderByChild('isAdmin').equalTo(true).once('value', function(snapshot) {
					var users = snapshot.val();
					if (users === null) {
						var error = {};
						error.message = 'There are no administrative users';
						reject(error);
					} else {
						resolve(users);
					}

				});
			})
		}

		factory.getUserIdFromEmail = function(email) {
			return new Promise(function(resolve, reject) {
				var url = FBURL.BASE + '/Users/';
				var url_ref = new Firebase(url);

				url_ref.orderByChild('email').equalTo(email).once('child_added', function(snapshot){
					var userId = snapshot.key();
					resolve(userId);
				})
			});
		}

		factory.getCard = function(userId) {
			return new Promise(function(resolve, reject) {
				var url = FBURL.BASE + '/Card';
				var url_ref = new Firebase(url);

				url_ref.orderByChild('userId').equalTo(userId).once("value", function(snapshot) {

					if (snapshot.val() === null) {
						var error = {};
						error.message = "This user has no cards";
						reject(error);
					} else {
						resolve(snapshot.val());
					}

				});
			});
		}

		factory.get = function(userId, branch) {
			var url = FBURL.BASE + '/' + userBranchId + '/' + userId + '/' + branch;
			var urlRef = new Firebase(url);

			return new Promise(function(resolve, reject) {
				urlRef.on("value", function(snapshot) {
					var objects = snapshot.val();
					resolve(objects);
				}, function(errorObject) {
					reject(errorObject);
				});
			})
		}

		factory.addProduct = function(userId, branch, data) {
			var url = FBURL.BASE + '/Users/' + userId;
			var ref = new Firebase(url);
			var branchRef = ref.child(branch);

			branchRef.update(data);

			return new Promise(function(resolve, reject) {
				var key = null;
				for (var x in data) {
					key = x;
				}

				var url1 = FBURL.BASE + '/Users/' + userId + '/Products';
				var url1_ref = new Firebase(url1);

				url1_ref.once('value', function(snapshot) {
					var products = snapshot.val();
					resolve(products);
				});

			});
		}

		factory.remove = function(userId, branch, data) {
			return new Promise(function(resolve, reject) {
				if (Object.keys(data).length === 0) {
					reject('There was an error');
				} else {
					for (item in data) {
						var encodedItem = encodeURIComponent(item);
						var url = FBURL.BASE + '/' + userBranchId + userId + '/' + branch + '/' + encodedItem;

						var urlRef = new Firebase(url);

						urlRef.once("value", function(response) {
							urlRef.remove();
							if (response.val() === null) {
								reject("There is no data");
							} else {

								var url1 = FBURL.BASE + '/' + userBranchId + userId + '/' + branch;
								var url1_ref = new Firebase(url1);

								url1_ref.once('value', function(snapshot) {
									var products = snapshot.val();
									resolve(products);
								})
							}

						});


					}
				}

			});
		}

		factory.signUp = function(data) {
			var url = FBURL.BASE;
			var ref = new Firebase(url);

			return ref.createUser(data, function(error, userData) {
				if (error) {

				} else {
					//Saves the Card
					var uid = userData.uid;

					var key = {};

					var cardData = {
						Name: data.name,
						Company: data.company,
						Headline: data.position,
						Email: data.email,
						PhoneNumber: data.phoneNumber,
						userId: userData.uid
					}

					var url = FBURL.BASE;
					var ref = new Firebase(url);
					var objectsRef = ref.child('Card');
					var newObjectsRef = objectsRef.push();

					newObjectsRef.update(cardData);

					key.card = newObjectsRef.key();


					//Saves the email
					var emailData = {
						email: data.email,
						type: 'Work',
						userId: userData.uid
					}

					var url = FBURL.BASE;
					var ref = new Firebase(url);
					var objectsRef = ref.child('Email');
					var newObjectsRef = objectsRef.push();

					newObjectsRef.update(emailData);

					key.email = newObjectsRef.key();


					//Saves the Phone
					var phoneData = {
						number: data.phoneNumber,
						type: 'Work',
						userId: userData.uid
					}

					var url = FBURL.BASE;
					var ref = new Firebase(url);
					var objectsRef = ref.child('Phone');
					var newObjectsRef = objectsRef.push();
					newObjectsRef.update(phoneData);
					key.phoneNumber = newObjectsRef.key();


					//Saves the User Information
					var userData = {
						Card: {
							[key.card]: true
						},
						Email: {
							[key.email]: true
						},
						Phone: {
							[key.phoneNumber]: true
						},
						userId: userData.uid,
						email: data.email,
						full_name: data.name,
						isAdmin: false
					}

					var url = FBURL.BASE;
					var ref = new Firebase(url);
					var objectsRef = ref.child('Users/' + uid);

					objectsRef.update(userData);
				}
			});
		}

		factory.login = function(email, password) {
			var data = {
				email: email,
				password: password
			}
			var url = FBURL.BASE;
			var ref = new Firebase(url);

			return ref.authWithPassword(data, function(error, authData) {
				if (error) {
					console.log('failed');
				} else {
					console.log('success');
				}
			})
		}

		factory.logout = function() {
			var url = FBURL.BASE;
			var ref = new Firebase(url);
			ref.unauth();
		}

		factory.getUserProducts = function(userId) {
			var url = FBURL.BASE + '/Users/' + userId + '/Products';
			var url_ref = new Firebase(url);

			return new Promise(function(resolve, reject) {
				url_ref.once('value', function(snapshot) {
					resolve(snapshot.val());
				});
			})
		}


		// create a synchronized array
		// click on `index.html` above to see it used in the DOM!



		return factory;
	}

	angular.module('bconnectApp')
		.factory('loginFactory', LoginFactory);
}())