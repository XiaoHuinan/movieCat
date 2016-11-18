/**
 * Created by 80474 on 2016/11/17.
 */
(function(angular){
	angular.module("http_service",[]).service("HttpService",['$window',function(w){
		//var $={};
		this.jsonP=function(url,params,fn){
//            w.callback={};
//            处理回调函数的挂载问题，不能够重复回调
			var random="jsonp"+Math.random().toString().substr(2);
//            挂载函数
//            暴露给全局的
//            w.callback[random]=function(data){
//                fn(data);
//            }
			w[random]=function (data){
				fn(data);
				//document.body.removeChild(script);
			};
//            1解析url参数，并进行动态拼接
			var getUrl="";
			getUrl+=url+"?";
//            解析params参数
			for(var k in params){
				getUrl+=k+"="+params[k]+"&"
			};
			getUrl+='callback='+random;
			var script=document.createElement("script");
			script.src=getUrl;
			document.body.appendChild(script);
		};
		//w.$=$;
	}]);
})(angular);
