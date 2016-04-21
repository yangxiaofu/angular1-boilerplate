(function() {
	var FBObjectFactory = function($rootScope) {
		var FBURL = {};
		FBURL.BASE = $rootScope.FBURL.BASE;

		var factory = {};

		factory.save = function(branch, data) {
			var base = FBURL.BASE;

			var url = base;

			var ref = new Firebase(url);

			var objectsRef = ref.child(branch);

			objectsRef.update(data);
		}

		factory.saveWithId = function(branch, data) {
			var base = FBURL.BASE;
			var url = base;
			var ref = new Firebase(url);
			var objectsRef = ref.child(branch);
			var newObjectsRef = objectsRef.push();

			newObjectsRef.update(data);
			var object = {};

			object.key = newObjectsRef.key();

			return object;
		}

		factory.saveWithIdWithBlock = function(branch, data) {
			return new Promise(function(resolve, reject) {
				var base = FBURL.BASE;
				var url = base;
				var ref = new Firebase(url);
				var objectsRef = ref.child(branch);
				var newObjectsRef = objectsRef.push();
				newObjectsRef.update(data);
				var object = {};
				object.key = newObjectsRef.key();
				resolve(object);
			});
		}

		factory.saveWithCustomId = function(branch, branchId, data) {
			var base = FBURL.BASE;
			var url = base;
			var ref = new Firebase(url);
			var objectsRef = ref.child(branch + '/' + branchId);
			objectsRef.update(data);
		}

		factory.saveWithCustomIdWithBlock = function(branch, branchId, data, callback) {
			var base = FBURL.BASE;
			var url = base;
			var ref = new Firebase(url);
			var objectsRef = ref.child(branch + '/' + branchId);
			objectsRef.update(data);

			callback();
		}

		factory.saveInBlockReturnObjects = function(branch, data){
			return new Promise(function(resolve, reject) {
			var base = FBURL.BASE;

			var url = base;

			var ref = new Firebase(url);

			var objectsRef = ref.child(branch);

			objectsRef.update(data);

			var url2 = FBURL.BASE + '/' + branch;
			var url2_ref = new Firebase(url2);

			url2_ref.once('value', function(snapshot) {
				var products = snapshot.val();
				if (products === null) {
					reject('There was an error');
				} else {
					delete products.undefined;
					resolve(products);
				}
			});



		});
		}

		return factory;
	}

	angular.module('bconnectApp')
		.factory('FBObject', FBObjectFactory);
}())