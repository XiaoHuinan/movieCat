/**
 * Created by 80474 on 2016/11/17.
 */
(function(angular){
	//定义模块路由的转发规则
	angular.module('movie_detail',['ngRoute','http_service'])
		.config(['$routeProvider',function($routeProvider){
		$routeProvider.when('/subject/:id',{
			templateUrl:'/movie_detail/view.html',
			controller:'ListController'
		});
		}])
		.controller('ListController',['$scope','HttpService','$routeParams',function($scope,HttpService,$routeParams){
			var id=$routeParams.id;
			console.log(id);
			$scope.title="";
			$scope.images="";
			$scope.summary="";
			$scope.loading=true;
			HttpService.jsonP('https://api.douban.com/v2/movie/subject/'+id,{
			},function(data){
				$scope.title=data.title;
				$scope.images=data.images;
				$scope.summary=data.summary;
				$scope.loading=false;
				$scope.$apply();
			});
	}])
})(angular)
