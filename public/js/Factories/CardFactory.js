(function() {
	var CardFactory = function($rootScope, $window) {
		var FBURL = {};
		FBURL.BASE = $rootScope.FBURL.BASE;


		var factory = {};

		factory.addDescription = function(description) {
			var userId = $window.sessionStorage.uid;
			var url = FBURL.BASE + 'Users/' + userId + '/Card';
			var url_ref = new Firebase(url);

			return new Promise(function(resolve, reject) {
				url_ref.once('child_added', function(snapshot) {
					console.log('Card Value ' + snapshot.key());

					var key = snapshot.key();

					var url1 = FBURL.BASE + 'Card/' + key;
					var url1_ref = new Firebase(url1);

					data = {
						Description: description
					}

					url1_ref.update(data);

					resolve();
				})
			})


		}

		factory.getCard = function(userId) {
			return new Promise(function(resolve, reject) {

				var url = FBURL.BASE + '/Card';
				var url_ref = new Firebase(url);

				url_ref.orderByChild('userId').equalTo(userId).once("child_added", function(snapshot) {

					if (snapshot.val() === null) {
						var error = {};
						error.message = "This user has no cards";
						reject(error);
					} else {
						var key = snapshot.key();
						var card = {
							key: key,
							info: snapshot.val()
						}
						resolve(card);
					}
				});
			});
		}

		factory.updateCard = function(key, info) {
			return new Promise(function(resolve, reject) {
				var url = FBURL.BASE + '/Card/' + key;
				var url_ref = new Firebase(url);
				url_ref.update(info);

				var url2 = FBURL.BASE + '/Users/' + $window.sessionStorage.uid;
				var url2_ref = new Firebase(url2);

				var info2 = {
					full_name: info.Name,
					website: info.Website,
					email: info.Email
				}
				url2_ref.update(info2);

				resolve('You have successfully updated your information');
			});
		}

		return factory;
	}

	CardFactory.$inject = ['$rootScope', '$window'];

	angular.module('bconnectApp')
		.factory('cardFactory', CardFactory);
}());