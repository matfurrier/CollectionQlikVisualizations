define(["jquery","underscore","angular","qvangular"],function(a,b,c,d){"use strict";d.directive("wiDelayedKeyup",function(){return{link:function(a,b,c){var d;b.on("keyup",function(){clearTimeout(d),d=setTimeout(function(){c.wiDelayedKeyupEvent&&a.WidgetEditor.PopupSnippets.trackSearch(b)},c.wiDelayedKeyupDelay||500)})}}})});