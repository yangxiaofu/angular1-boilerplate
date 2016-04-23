(function(){
	var CardFactory = function($rootScope){
		var FBURL = {};
		FBURL.BASE = $rootScope.FBURL.BASE;


		var factory = {};

		factory.getCard = function(userId) {
			return new Promise(function(resolve, reject) {
				var url = FBURL.BASE + '/Card';
				var url_ref = new Firebase(url);
				console.log(userId);
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

		factory.updateCard = function(key, ...info){

			return new Promise(function(resolve, reject){
				var url = FBURL.BASE + '/Card/' + key;
				var url_ref = new Firebase(url);

				url_ref.update(...info);

				resolve('You have successfully updated your information');


			});
		}

		return factory;
	}

	CardFactory.$inject = ['$rootScope'];

	angular.module('bconnectApp')
		.factory('cardFactory', CardFactory);
}());