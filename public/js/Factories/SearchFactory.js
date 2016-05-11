(function() {



	var SearchFactory = function($rootScope, stringFactory, $window) {


		var FBURL = {};
		FBURL.BASE = $rootScope.FBURL.BASE;
		var associatedUsers = 'associatedUsers';
		var searchIndex = 'SearchIndex';
		var searchCount = 'searchCount';

		var factory = {};

		factory.findUsers = function(keyword) {
			return new Promise(function(resolve, reject) {
				if ($window.sessionStorage.loggedIn === false) {
					userId = 'Anonomous User';
				} else {
					userId = $window.sessionStorage.uid;
				}

				var data = {
					keyword: keyword,
					userId: userId
				}
				updateSearch(data);
				updateUserSearchHistory(data);

				//var url = FBURL.BASE + '/ProductIndex/' + keyword + '/Users';
				var url = FBURL.BASE + '/SearchIndex/' + keyword + '/associatedUsers';
			
				var url_ref = new Firebase(url);

				url_ref.once('value', function(snapshot) {
					var users = snapshot.val();
			
					if (users !== null) {
						resolve(users);
					} else {
						var err = "No Users Exist for this Product";
						reject(err);
					}
				})
			})
		}


		factory.removeUser = function(string, userId) {
			if ($window.sessionStorage.loggedIn) {
				userId = $window.sessionStorage.uid;

				var output = [];
				output.push(string);

				var result = stringFactory.separateString(string);


				for (var word in result) {
					output.push(result[word]);
				}

				output.forEach(function(word) {
					var url = FBURL.BASE + 'SearchIndex/' + word + '/' + associatedUsers + '/' + userId;
					var url_ref = new Firebase(url);
					url_ref.remove();
				})
			}


		}

		factory.removeString = function(string, userId) {
			var url = FBURL.BASE + searchIndex + '/' + string + '/associatedUsers/' + userId;
			var url_ref = new Firebase(url);

			var output = [];
			output.push(string);

			var result = stringFactory.separateString(string);

			for (var word in result){
				output.push(result[word]);
			}

			output.forEach(function(word){
				removeString(word, userId);
			});
			
		}

		function removeString(string, userId){
			var url = FBURL.BASE + searchIndex + '/' + string + '/associatedUsers/' + userId;
			
			var url_ref = new Firebase(url);
			url_ref.remove();
		}

		factory.addString = function(string, userId) {
			if (userId === undefined) {
				userId = 'BETA_USER';
			}
			
			var stringObjects = {};
			var output = [];
			output.push(string);

			var result = stringFactory.separateString(string);

			for (var word in result) {
				output.push(result[word]);
			}

			output.forEach(function(word) {
				var key = word;
				var _output = output;
				var data = {};

				_output.forEach(function(each) {

					hasChild(each)
						.then(function(exists) {
							if (exists === true) {
								addUser(each, userId);
							} else {
								data = {
									[associatedUsers]: {
										[userId]: true
									},
									createdAt: Firebase.ServerValue.TIMESTAMP,
									updatedAt: Firebase.ServerValue.TIMESTAMP,
									searchCount: 0
								}

								addString(each, data);
							}
						})
						.catch(function() {

						})



				});

				addString(key, data);
			})
		}

		function addString(key, value) {
			var url = FBURL.BASE + searchIndex;
			var url_ref = new Firebase(url);

			url_ref.child(key).update(value);

			return;
		}

		function addUser(key, userId) {
			var url = FBURL.BASE + searchIndex + '/' + key + '/' + associatedUsers;
			var url_ref = new Firebase(url);

			var data = {
				[userId]: true
			}

			url_ref.update(data);

			var url_update = FBURL.BASE + 'SearchIndex/' + key;
			var url_update_ref = new Firebase(url_update);

			var data = {
				updatedAt: Firebase.ServerValue.TIMESTAMP
			}

			url_update_ref.update(data);

			return;
		}

		function hasChild(key) {
			var url = FBURL.BASE + 'SearchIndex/';
			var url_ref = new Firebase(url);

			return new Promise(function(resolve, reject) {
				url_ref.once('value', function(snapshot) {
					var hasChild = snapshot.hasChild(key);

					if (hasChild) {
						resolve(true);
					} else {
						resolve(false);
					}

				})
			})
		}

		function updateSearch(data) {
			var userId = data.userId;
			var keyword = encodeURIComponent(data.keyword);

			var url = FBURL.BASE + searchIndex + '/' + keyword + '/' + searchCount;

			var url_ref = new Firebase(url);
			url_ref.transaction(function(currentValue) {
				return (currentValue || 0) + 1;

				var updateData = {
					lastSearchedAt: Firebase.ServerValue.TIMESTAMP
				}

				var url1 = FBURL.BASE + searchIndex + '/' + keyword;
				var url1_ref = new Firebase(url1);

				url1_ref.update(updateData);
				var userData = {
					[userId]: true
				}

				var url2 = FBURL.BASE + searchIndex + '/' + keyword + '/searchedBy';
				var url2_ref = new Firebase(url2);

				url2_ref.update(userData);
			});


		}

		function updateUserSearchHistory(data) {
			var userId = data.userId;
			var keyword = data.keyword;

			updateData = {
				[keyword]: {
					searchedAt: Firebase.ServerValue.TIMESTAMP
				}
			}

			var url = FBURL.BASE + '/Users/' + userId + '/SearchHistory';
			var url_ref = new Firebase(url);
			var new_url_ref = url_ref.push();

			new_url_ref.update(updateData);
		}

		return factory;
	}

	SearchFactory.$inject = ['$rootScope', 'stringFactory', '$window'];

	angular.module('bconnectApp')
		.factory('searchFactory', SearchFactory);

}())