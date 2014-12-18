( function(){

	var app = angular.module('template', []);

	app.controller ('splashPageController', ['$scope', '$http', function($scope, $http){

		this.begin_login = function(){
			window.location='/login';
		}

		this.begin_signup = function(){
			window.location='/signup';
		}

	}]);
})();