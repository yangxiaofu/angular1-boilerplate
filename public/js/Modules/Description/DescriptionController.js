(function(){
	var DescriptionController = function($scope, cardFactory){
		$scope.description = null;

		$scope.submitDescription = function(description){
			cardFactory.addDescription(description)
				.then(function(){
					console.log('Success Saving the description');
				})
				.catch(function(err){
					console.log('Error ' + err);
				})
		}

		function init(){
			
		}

		init();

	}

	DescriptionController.$inject = ['$scope', 'cardFactory'];

	angular.module('bconnectApp')
		.controller('descriptionController', DescriptionController);
}())