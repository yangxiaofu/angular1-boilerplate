(function() {
	var SearchFactory = function($rootScope, stringFactory) {
		var FBURL = {};
		FBURL.BASE = $rootScope.FBURL.BASE;
		var factory = {};

		var branch = "SearchIndex";

		function addString(key, value) {
			var url = FBURL.BASE + '/SearchIndex/';
			var url_ref = new Firebase(url);

			url_ref.child(key).update(value);

			return;
		}


		factory.findUsers = function(keyword) {

			return new Promise(function(resolve, reject) {
				var url = FBURL.BASE + '/ProductIndex/' + keyword + '/Users';
				var url_ref = new Firebase(url);
				url_ref.once('value', function(snapshot) {
					var users = snapshot.val();
					if (users !== null){
						resolve(users);
					}else{
						var err = "No Users Exist for this Product";
						reject(err);
					}
					
					
				})
			})

		}

		factory.addString = function(string) {


			var stringObjects = {};
			var output = [];
			output.push(string);
			var string_branch = {};

			var result = stringFactory.separateString(string);

			for (var word in result) {
				output.push(result[word]);
				//searchFactory.addString(result[word]);
			}

			var i = 0;
			var length = output.length;

			output.forEach(function(word) {
				var key = word;
				var _output = output;
				var data = {};


				_output.forEach(function(each) {
					data[each] = true;
				});

				addString(key, data);
			})
		}

		return factory;
	}

	SearchFactory.$inject = ['$rootScope', 'stringFactory'];

	angular.module('bconnectApp')
		.factory('searchFactory', SearchFactory);

}())