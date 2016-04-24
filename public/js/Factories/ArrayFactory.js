(function() {
	var ArrayFactory = function() {
		var factory = {};

		//A will filter out the indexes in B
		factory.filter = function(a, b){
			var result = [];

			var aSet = new Set(a);
			var bSet = new Set(b);

			for (var i in b){
				var check = aSet.has(b[i]);
				var index = a.indexOf(b[i]);

				if (check === true){
					a.splice(index, 1);
				}
			}

			return a;
		}

		factory.intersection = function(a, b) {
			var result = [];

			for (var i in a) {
				for (var x in b) {
					if (a[i] === b[x]) {
						result.push(a[i]);
					}

				}
			}
			return result;
		}

		factory.difference = function(a, b) {
			var result = [];

			var aSet = new Set(a);
			var bSet = new Set(b);

			for (var i in a) {
				var check = bSet.has(a[i]);
				var index = b.indexOf(a[i]);
				if (check !== true){
					result.push(a[i]);
				}else{
					b.splice(index, 1);
				}
			}

			for (var i in b) {
				var check = aSet.has(b[i]);
				var index = a.indexOf(b[i]);
				if (check !== true){
					result.push(b[i]);
				}else{
					a.splice(index, 1);
				}
			}
			return result;
		}

		factory.union = function(a, b) {
			var result = [];

			var aSet = new Set(a);
			var bSet = new Set(b);

			for (var i in a){
				var check = bSet.has(a[i]);
				var index = b.indexOf(a[i]);
				if (check === true){
					b.splice(index, 1);
				}
				result.push(a[i]);
			}

			for (var i in b){
				var check = aSet.has(b[i]);
				var index = a.indexOf(b[i]);
				if (check === true){
					a.splice(index, 1);
				}
				result.push(b[i]);
			}

			return result;
		}

		return factory;
	}

	angular.module('bconnectApp')
		.factory('arrayFactory', ArrayFactory)

}())