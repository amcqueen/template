( function(){

	var app = angular.module('template', []);

	app.controller ('loginPageController', ['$scope', '$http', function($scope, $http){

		this.username=null;
		this.password=null;

		this.login = function(){
			// send ajax call
			$http.post('/login', {
				username : this.username,
				password : this.password
			})
			.success(function(data,status, headers, config){
				window.location='/';
			})
			.error(function(data,status, headers, config){
				alert('Login failed: '+status+" "+data);
			});
		}


	}]);
})();