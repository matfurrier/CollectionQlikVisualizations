define(["jquery","underscore","./properties","./initialproperties","./lib/js/extensionUtils","text!./lib/css/style.css","./lib/js/contents","./lib/js/Chart","./lib/js/chartjsUtils"],function(t,e,r,i,s,n,c,a){"use strict";s.addStyleToHeader(n);var o=requirejs.s.contexts._.config.baseUrl+requirejs.s.contexts._.config.paths.extensions;return{definition:r,initialProperties:i,support:{snapshot:!0,"export":!0,exportData:!0},controller:["$scope",function(t){}],paint:function(t,e){var r=this,i=e.qHyperCube.qDimensionInfo.length,s=e.qHyperCube.qMeasureInfo.length;if(i<chartjs.filter(function(t){return t.id===e.chart})[0].min_dims||i>chartjs.filter(function(t){return t.id===e.chart})[0].max_dims||s<chartjs.filter(function(t){return t.id===e.chart})[0].measures)t.html("This chart requires "+chartjs.filter(function(t){return t.id===e.chart})[0].min_dims+" dimensions and "+chartjs.filter(function(t){return t.id===e.chart})[0].measures+" measures.");else{var n=chartjs.filter(function(t){return t.id===e.chart})[0].src,c=o+"/qlik-sense-chartjs/lib/js/"+n;jQuery.getScript(c,function(){visualize(t,e,r,chartjsUtils)})}}}});