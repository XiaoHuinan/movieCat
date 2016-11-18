'use strict';
(function(angular){
	angular.module('top250', ['ngRoute','http_service'])
		.config(['$routeProvider', function($routeProvider) {
			$routeProvider.when('/top250/:pageSize?', {
				templateUrl: '/top250/view.html',
				controller: 'Top250'
			});
		}])
		.controller('Top250', ['$scope','$window','$routeParams','HttpService',function($scope,$window,$routeParams,httpservice) {
			$scope.loading=true;
			$scope.title="";
			$scope.movies="";
			//分页的实现
			//$scope.page=1;
			$scope.total="";
			$scope.page=$routeParams.pageSize || 1;
			$scope.totalPage="";
			var start=($scope.page-1)*5;
			var count=5;
			//$scope.movies=movies.subjects;

			httpservice.jsonP("https://api.douban.com/v2/movie/top250",{
             //start:0,
			//count:5
			start:start,
			count:count
			},function(data){
				$scope.total=data.total;
				$scope.totalPage=Math.ceil(data.total/count);
				$scope.title=data.title;
				$scope.movies=data.subjects;
				$scope.loading=false;
				$scope.$apply();
			})
		}]);
})(angular)

