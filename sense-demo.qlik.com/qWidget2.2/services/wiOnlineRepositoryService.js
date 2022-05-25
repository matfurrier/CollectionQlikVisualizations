define(["underscore","angular","qvangular","./wiRepositoryService"],function(a,b,c){"use strict";c.service("wiOnlineRepositoryService",["$q","$http","wiRepositoryService",function(c,d,e){var f=[],g=function(a){this.repository=a,this.initialized=!1,this.isOnline=void 0,this.authentication={isAuthenticated:!1,authenticationUrl:void 0,roles:[],userId:void 0,isVerified:!1},this.widgetsInitialized=!1,this.widgets=[],this.categories=void 0,this.categoriesInitialized=!1},h=function(b,d){var e=c.defer(),h=a.find(f,function(a){return a.repository.repUrl===b.repUrl});if(h&&!d)e.resolve(h);else{var i=new g(b);f.push(i),i.init().then(function(){e.resolve(i)}).catch(function(a){e.reject({errorDesc:a.errorDesc,error:a.error,errorStatus:a.errorStatus})})}return e.promise};return g.prototype.init=function(){var a=this,b=c.defer();return a.initialized&&a.authentication.isOnline?b.resolve(!0):e.ping(a.repository).then(function(c){a.isOnline=!0,a.checkAuthentication().then(function(){b.resolve({pingResult:!0,data:c.data})}).catch(function(a){b.reject({error:a.error,errorStatus:a.errorStatus})}).finally(function(){a.initialized=!0})}).catch(function(c){a.isOnline=!1,b.reject({errorDesc:"Repository is not available ("+a.repository.repUrl+")",pingResult:!1,error:c.error,errorStatus:c.status})}),b.promise},g.prototype.checkAuthentication=function(){var a=c.defer(),b=this;return e.checkAuthentication(this.repository).then(function(c){b.authentication.isAuthenticated=c.isAuthenticated||!1,b.authentication.authenticationUrl=c.authenticationUrl,b.authentication.roles=c.roles||[],b.authentication.userId=c.userId,b.authentication.isVerified=c.isVerified||!1,a.resolve(b.authentication.isAuthenticated)}).catch(function(b,c){a.reject({error:b,errorStatus:c})}),a.promise},g.prototype.logOut=function(){var a=c.defer(),b=this;return e.logOut(this.repository).then(function(){b.authentication.isAuthenticated=!1,a.resolve(!0)}).catch(function(b){a.reject(b)}),a.promise},g.prototype.initWidgets=function(a){var d=c.defer(),f=this;return!a&&this.widgetsInitialized&&b.isObject(this.widgets)?d.resolve(!0):e.loadWidgetsMeta(this.repository).then(function(a){f.widgets=a,f.widgetsInitialized=!0,d.resolve(!0)}).catch(function(a){d.reject({error:a.data,errorStatus:a.status})}).finally(function(){b.noop()}),d.promise},g.prototype.postWidget=function(a){var b=this,d=c.defer();return e.postWidget(this.repository,a).then(function(a){b.widgets.push(a),d.resolve(a)}).catch(function(a){d.reject(a)}).finally(function(){}),d.promise},g.prototype.useWidget=function(a){var b=c.defer();return e.useWidget(this.repository,a).then(function(a){b.resolve(a)}).catch(function(a,c){b.reject({error:a,errorStatus:c})}).finally(function(){}),b.promise},g.prototype.getWidgetDetails=function(b){var d=this,f=c.defer();return e.getWidgetDetails(this.repository,b).then(function(b){a.each(d.widgets,function(c,e){c._id===b._id&&(a.extend(d.widgets[e],b),d.widgets[e].fetch_timestamp=Date.now())}),f.resolve(b)}).catch(function(a,b){f.reject({error:a,errorStatus:b})}).finally(function(){}),f.promise},g.prototype.deleteWidget=function(a){var b=c.defer(),d=a._id,f=this;return e.deleteWidget(this.repository,d).then(function(a){for(var c=f.widgets.length-1;c>=0;c--)f.widgets[c]._id===d&&f.widgets.splice(c,1);b.resolve(a)}).catch(function(a){b.reject(a)}),b.promise},g.prototype.trackPreview=function(a){e.trackPreview(this.repository,a).then(function(){b.noop()}).catch(function(a){b.noop()})},g.prototype.initCategories=function(){var a=c.defer(),b=this;return this.categoriesInitialized?a.resolve(this.categories):b.getCategories().then(function(c){b.categories=c,b.categoriesInitialized=!0,a.resolve(c)}).catch(function(){a.resolve(null)}),a.promise},g.prototype.getCategories=function(){var a=c.defer();return e.getCategories(this.repository).then(function(b){a.resolve(b)}).catch(function(b,c){a.reject({errorDesc:"Cannot get categories from online repository.",error:b,errorStatus:c})}).finally(function(){}),a.promise},{getInstance:h}}])});