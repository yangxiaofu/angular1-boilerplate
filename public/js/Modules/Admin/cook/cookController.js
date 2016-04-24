(function(){
	var CookController = function($scope, $http, user){
		$scope.emailsArray = [];

		init();

		function init(){
			getUsers();
		}

		function getUsers(){
			user.getAdmin()
				.then(function(usersObject){
					var user = new Map();
					for (var x in usersObject){
						user.set(usersObject[x].userId, usersObject[x].email);
					}
					$scope.emailsArray = [...user];
					$scope.$apply();
					
				})
				.catch(function(err){
					console.log(err);
				})
		}
		$scope.getUsers = function(){
			$scope.email = null;
			$scope.emailsArray = [];
			getUsers();
		}

		$scope.makeAdmin = function(){
			user.makeAdmin($scope.email)
			user.getUserIdFromEmail($scope.email)
				.then(function(userId){
					var user = new Map();
					user.set(userId, $scope.email);
					$scope.emailsArray.push(...user);
					$scope.$apply();
				})
				.catch(function(err){
					console.log(err);
				})
		}

		$scope.removeAdmin = function(_user){
			var userId = _user[0];
			var index = $scope.emailsArray.indexOf(_user);
			$scope.emailsArray.splice(index,1);
			user.removeAdmin(userId);
		}
	}

	AdminController.$inject = ['$scope', '$http', 'userFactory'];

	angular.module('bconnectApp')
		.controller('cookController', CookController);
}())