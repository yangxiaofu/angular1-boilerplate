(function(){
	var AdminController = function($scope, $http, user){
		$scope.email = null;
		$scope.users = [];
		$scope.emailsArray = [];
		$scope.names = [];
		var emailUserIdCombo = {};

		init();

		function init(){
			getUsers();
		}

		function getUsers(){
			user.getAdmin()
				.then(function(usersObject){

					for (x in usersObject){
						emailUserIdCombo = {
							email: usersObject[x].email,
							userId: usersObject[x].userId
						}

						$scope.emailsArray.push(emailUserIdCombo);
					}
					console.log($scope.emailsArray);
				})
				.catch(function(error){
					console.log(error);
				})
		}
		$scope.getUsers = function(){
			$scope.email = null;
			$scope.emailsArray = [];
			getUsers();	
		}

		$scope.makeAdmin = function(){
			
			if ($scope.email === null){
				//ERROR HANDLING HERE.
				
			}else{
				var data = {
					email: $scope.email
				}

				$http.put('user/makeAdmin', data)
					.success(function(userId){
						var data = {
							userId: userId, 
							email: $scope.email
						}
						$scope.emailsArray.push(data);
						$scope.email = null;
					})
					.error(function(err){
						console.log(err);
						console.log('There was an error');
					})
			}	
		}

		$scope.removeAdmin = function(index){
			user.removeAdmin($scope.emailsArray[index].userId)
				.success(function(response){
					$scope.emailsArray.splice(index, 1);
				})
				.error(function(err){

				})
		}



	}

	AdminController.$inject = ['$scope', '$http', 'loginFactory'];

	angular.module('bconnectApp')
		.controller('adminController', AdminController);
}())