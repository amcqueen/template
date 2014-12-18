( function(){

	var app = angular.module('template', []);

	app.controller ('signupPageController', ['$scope', '$http', function($scope, $http){

		this.username=null;
		this.password=null;

		this.signup = function(){

			// send ajax call
			$http.post('/signup', {
				username : this.username,
				password : this.password
			})
			.success(function(data,status, headers, config){
				console.log('done');
				window.location='/';
			})
			.error(function(data,status, headers, config){
				alert('Signup failed: '+status+" "+data);
			});
		}


	}]);
})();