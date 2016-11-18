'use strict';
// Declare app level module which depends on views, and components
(function(angular){
	angular.module('movieCat', [
		'ngRoute',
		'movie_detail',
		'movie_list',
		//'in_theaters',
		//'coming_soon',
		'addActive'
		//'top250'
	]).config(['$routeProvider', function($routeProvider) {
			$routeProvider.otherwise({redirectTo: '/in_theaters'});
		}]).controller("search",['$route','$scope',function($route,$scope){
		$scope.input="";
		$scope.query=function(){
             $route.updateParams({catgory:"search",q:$scope.input})
		}
	}]);
})(angular)

