define(["jquery","underscore","angular","qvangular","text!./wiAbout.ng.html","ng!$http"],function(a,b,c,d,e,f){"use strict";return{template:e,scope:!0,controller:["$scope","$element",function(a){function b(){if(!c.isObject(a.licenses)){var b="/extensions/qWidget/data/autogenerated/lics.json";f.get(b).then(function(b){a.licenses=b.data}).catch(function(a){})}}a.section="general",a.changeSection=function(b){a.section=b},a.$watch("section",function(a){"licenses"===a&&b()}),a.onButtonClose=function(){a.onClose?a.$eval(a.onClose)():a.closeView()},a.closeView=function(){a.destroyComponent()}}]}});