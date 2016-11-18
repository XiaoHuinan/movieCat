/**
 * Created by 80474 on 2016/11/17.
 */
(function(angular){
	angular.module('movie_list', ['ngRoute','http_service'])
		.config(['$routeProvider', function($routeProvider) {
			$routeProvider.when('/:catgory/:pageSize?', {
				//:号代表路由的占位符，？代表参数是否可选
				templateUrl: './movie_list/view.html',
				controller: 'MainController'
			});
		}])
		.controller('MainController', ['$scope','$window','$route','$routeParams','HttpService',function($scope,$window,$route,$routeParams,httpservice) {
			$scope.loading=true;
			$scope.title="";
			$scope.movies="";
			//分页的实现
			//$scope.page=1;
			$scope.total="";
			$scope.page=$routeParams.pageSize || 1;
			var catgory=$routeParams.catgory;
			$scope.totalPage="";
			var start=($scope.page-1)*5;
			var count=5;
			//$scope.movies=movies.subjects;
            //暴露一个分页行为
			$scope.go=function(num){
				//if(num<=0&&num>$scope.totalPage){
				//	return
				//}
				if(num>0&&num<=$scope.totalPage){
					//updateParams更新路由后面的参数，并重新请求锚点地址
					$route.updateParams({pageSize: num });
				}
				//$route.reload();
			};
			httpservice.jsonP("https://api.douban.com/v2/movie/"+catgory,{
				//start:0,
				//count:5
				start:start,
				count:count,
				q:$routeParams.q
			},function(data){
				$scope.total=data.total;
				$scope.totalPage=Math.ceil(data.total/count);
				$scope.title=data.title;
				$scope.movies=data.subjects;
				$scope.loading=false;
				$scope.$apply();
			});

		}]);
})(angular)
