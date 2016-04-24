(function(){
	angular.module('bconnectApp')
		.value('appSettings', {
			title: 'BConnect',
			version: '1.0.0',
			baseUrl: 'http://bconnect:8888'
		})
}());