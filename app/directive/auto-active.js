/**
 * Created by 80474 on 2016/11/17.
 */
(function(angular){
	angular.module("addActive",[]).directive("autoActive",['$location',function($location){
		return {
			link:function(scope,element,attributes){
				//监视location的url的变化
				scope.$location=$location;
				scope.$watch('$location.url()',function(now,old){
					//得到指令作用元素的url的href地址，与改变的location进行比对
					var alink=element.children().attr("href").substr(1);
					//console.log(alink);
					if(now.startsWith(alink)){
						//console.log(1);
						//console.log(attributes);
						//element.parent().children().removeClass(attributes.autoActive);
						//干掉兄弟节点的所有class属性
						element.parent().children().removeClass(attributes.autoActive);
						element.addClass(attributes.autoActive);
					}
				})
			}
		}
	}])
})(angular)
