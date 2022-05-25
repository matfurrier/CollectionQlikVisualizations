define(["jquery","qvangular"],function(a,b){"use strict";b.directive("uiAce",function(){return{restrict:"AE",link:function(a,b,c,d){var e,f,g,h,i;e={},f=angular.extend({},e,a.$eval(c.uiAce)),g=window.ace.edit(b[0]),h=g.getSession(),g.setShowPrintMargin(!1),i=function(b){return function(e){var f=h.getValue();f===a.$eval(c.value)||a.$$phase||a.$root.$$phase||(angular.isDefined(d)&&a.$apply(function(){d.$setViewValue(f)}),angular.isDefined(b)&&a.$apply(function(){if(!angular.isFunction(b))throw new Error("ui-ace use a function as callback.");b(e,g)}))}},angular.isDefined(f.showGutter)&&g.renderer.setShowGutter(f.showGutter),angular.isDefined(f.useWrapMode)&&h.setUseWrapMode(f.useWrapMode),angular.isDefined(f.useAnnotations)&&h.setOption("useWorker",f.useAnnotations),angular.isFunction(f.onLoad)&&f.onLoad(g),angular.isString(f.theme)&&g.setTheme("ace/theme/"+f.theme),angular.isString(f.mode)&&h.setMode("ace/mode/"+f.mode),c.$observe("readonly",function(a){g.setReadOnly("true"===a)}),angular.isDefined(d)&&(d.$formatters.push(function(a){if(angular.isUndefined(a)||null===a)return"";if(angular.isObject(a)||angular.isArray(a))throw new Error("ui-ace cannot use an object or an array as a model");return a}),d.$render=function(){h.setValue(d.$viewValue)}),h.on("change",i(f.onChange)),b.on("$destroy",function(){g.session.$stopWorker(),g.destroy()}),a.$watch(function(){return[b[0].offsetWidth,b[0].offsetHeight]},function(){g.resize(),g.renderer.updateFull()},!0)}}})});