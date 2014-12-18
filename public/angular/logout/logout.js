( function(){

	var app = angular.module('template', []);

	app.controller ('logoutController', ['$scope', '$http', function($scope, $http){



		this.logout = function(){

			//send ajax call
			$http.get('/logout')
			.success(function(data,status, headers, config){
				window.location='/';
			})
			.error(function(data,status, headers, config){
				alert('Logout failed. Error: '+status+", "+data);
			});
		}


	}]);

	app.directive("logoutBox", function() {
	    return {
			restrict: 'E',
			templateUrl: "/angular/logout/logoutBox.html",
	    };
	});
})();