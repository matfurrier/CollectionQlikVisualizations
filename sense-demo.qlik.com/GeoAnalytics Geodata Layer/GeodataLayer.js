define(["./properties","../IdevioMap/common/Utils","../IdevioMap/common/LegendManager","../IdevioMap/common/Extension","../IdevioMap/common/MathUtils"],function(extensionProperties,Utils,LegendManager,Extension,MathUtils){function _parseUrl(url,x,y,z){var varDefs="var x="+x+",y="+y+",z="+z+",level="+z+";";function evalFunc(_,exp){var result=MathUtils.eval(exp,varDefs,/x|y|z|level/i);if(result===false){throw new Error("Invalid expression: "+exp)}return result}return url.replace(/{([^}]*)}/gi,evalFunc)}function GeodataLayer(extension,layout,$element){Extension.call(this,"Geodata Layer",extension,layout,$element,{isStatic:true})}Extension.extend(GeodataLayer);GeodataLayer.prototype.init=function(map){Extension.prototype.init.call(this,map);this.controlSelect=false};GeodataLayer.prototype.paintExtension=function(layout){this.layout=layout;this.isTiles=extensionProperties.isTiles(this.layout);if(this.map&&Utils.getValue(this.layout,"qInfo.qType")!=="masterobject"){this.dirty=false;var newURL=Utils.getValue(this.layout,(this.isTiles?"geodata.tileurl":"geodata.sourceurl"),"");if(this.oldURL!==newURL){this.dirty=true;this.oldURL=newURL}this.layerInit()}Extension.prototype.paintExtension.call(this,layout)};GeodataLayer.prototype.layerInit=function(){if(this.dirty&&this.isTiles){this.clearLayer(true)}if(this.layer){return}var logger=this.logger;var _this=this;var map=this.map.map;if(this.isTiles){var url=Utils.getValue(this.layout,"geodata.tileurl","");if(this.layout.geodata.sourceformat!=="TILES_WMS"){var mapName=map.getBaseMap();var auto=Utils.getValue(this.layout,"geodata.auto",true);var tileSize=Utils.getValue(this.layout,"geodata.tilesize",256);var isIdevioTile=Utils.getValue(this.layout,"geodata.sourceformat")==="TILES_IDEVIO";var deg2m=111319.4907932;var isMeters=mapName==="emptymeters";var isDegrees=/^empty(|degreemercator)$/i.test(mapName)||/_adaptive$/i.test(mapName);var twidth,theight,ox,oy;if(auto||isIdevioTile){twidth=40075016/(isDegrees?deg2m:1);theight=40075016/(isDegrees?deg2m:1);ox=isDegrees?-180:-20037508;oy=isDegrees?180:20037508}else{ox=Utils.getValue(this.layout,"geodata.originX",-20037508);oy=Utils.getValue(this.layout,"geodata.originY",20037508);twidth=Utils.getValue(this.layout,"geodata.tileWidth",40075016);theight=Utils.getValue(this.layout,"geodata.tileHeight",40075016)}var tileOptions={url:url,crs:!isMeters&&!isDegrees?"EPSG:3857":"undefined",originX:isIdevioTile?0:ox,originY:isIdevioTile?0:oy,tileWidth:twidth,tileHeight:theight,tileSize:tileSize,levels:20};this.oldURL=tileOptions.url;var urlFormatter=function(path,tx,ty,level){try{if(!isIdevioTile){ty=-(ty+1)}return _parseUrl(path,tx,ty,level)}catch(e){logger.addError(this.id,"geodataUrlFormatter","Error formatting url",undefined,e);return null}};if(isIdevioTile){tileOptions.tilePathFunction=urlFormatter}else{tileOptions.urlFunction=urlFormatter}this.layer=new idevio.map.TiledImageLayer(map,{name:extensionProperties.SOURCEFORMATS[this.layout.geodata.sourceformat],minRes:this.layout.inResolutionLimit.value,maxRes:this.layout.outResolutionLimit.value,drawOrder:Utils.getDrawOrder(this.layout),dataset:new idevio.map.TiledImageDataset(tileOptions),meta:{qvlayer:_this}})}else{if(this.layout.geodata.sourceformat==="TILES_WMS"){var wmsOptions={url:url,version:Utils.getValue(this.layout,"geodata.wms.version","1.3.0"),crs:Utils.getValue(this.layout,"geodata.wms.crs","EPSG:4326"),viaServer:Utils.getValue(this.layout,"geodata.loadviaserver",false),onerror:function(e){var type="wmsImageLoadError";logger.clearErrorTypes(_this.id,[type]);_this.addError(type,e.message);logger.showErrors()}};if(wmsOptions.viaServer&&!/^(i:\/\/|data:)/.test(wmsOptions.url)){wmsOptions.url=window.decodeURIComponent(wmsOptions.url)}this.oldURL=wmsOptions.url;this.layer=new idevio.map.WmsLayer(map,{name:extensionProperties.SOURCEFORMATS[this.layout.geodata.sourceformat],minRes:this.layout.inResolutionLimit.value,maxRes:this.layout.outResolutionLimit.value,drawOrder:Utils.getDrawOrder(this.layout),dataset:new idevio.map.WmsDataset(wmsOptions),buffer:Utils.getValue(this.layout,"geodata.wms.buffer",100),meta:{qvlayer:_this}})}}}else{if(this.layout.geodata.sourceurl){this.layer=new idevio.map.FeatureLayer(map,{name:this.layerTitle,dataset:new idevio.map.MemoryDataset({crs:map.getBaseMap()==="emptymeters"?"emptymeters":null,name:this.id}),styles:[],drawOrder:Utils.getDrawOrder(this.layout),meta:{qvlayer:_this}});this.dirty=true;this.oldStyles=null}}};GeodataLayer.prototype.paint=function(){if(!this.isTiles&&this.dirty){this.loadNewData()}else{this.map.doneWorkViewBounds(this.id,null)}var styles=this.layout.geodata.styles;if(!this.isTiles&&styles!==this.oldStyles){this.oldStyles=styles;if(styles){this.layer.setStyles(Utils.parseStyles(styles))}else{this.layer.setStyles([{type:"polygon",color:"#FFFFFF",outline:"blue"},{type:"line",color:"green",width:"1"},{type:"symbol",icon:{url:"i://osm/images/dropgreen.png"}}])}}};GeodataLayer.prototype.loadNewData=function(){this.dsType="LocationIds";var viaServer=Utils.getValue(this.layout,"geodata.loadviaserver",false);var url=this.layout.geodata.sourceurl;if(viaServer&&!/^(i:\/\/|data:)/.test(url)){url=window.encodeURIComponent(url)}var options={viaServer:viaServer,onload:function(){this.map.doneWorkViewBounds(this.id,null)}.bind(this)};var format=Utils.getValue(this.layout,"geodata.sourceformat","geojson");if(/geojson$/i.test(format)){options.format="geojson"}else{if(/gml$/i.test(format)){var geoName=Utils.getValue(this.layout,"geodata.gml.geoName");options.format="gml";options.reverseCoordinates=Utils.getValue(this.layout,"geodata.gml.reverse",false);options.extractAttributes=false;if(geoName){options.geometryName=geoName}}}this.clearLayer(false);this.layer.getDataset().load(url,options)};GeodataLayer.prototype.paintLegend=function(){var showUrl=Utils.getValue(this.layout,"legend.showUrl",true);var showIcon=Utils.getValue(this.layout,"legend.showIcon",true);var customTitle=Utils.getValue(this.layout,"legend.customTitle","");var isFile=/^file/i.test(Utils.getValue(this.layout,"geodata.sourceformat"));var url=isFile?this.layout.geodata.sourceurl:this.layout.geodata.tileurl;var $content=$("#legend-info-"+this.id).empty();var $dataLegend;if(showUrl){if(customTitle&&customTitle!==""){$dataLegend=$("<span>").addClass("legend-title").html(customTitle).appendTo($content)}else{$dataLegend=$("<span>").addClass("legend-title").html(url||"Geodata Layer").appendTo($content)}$dataLegend.css("line-height",$content[0].clientHeight+"px");$dataLegend.css("left",40)}LegendManager.dimLegend(this.id,!this.isVisible());LegendManager.fixSizeForIcon(this.id);LegendManager.fixWidthForTitle(this.id);if(!showIcon){$content.css("background-size","0");if($dataLegend){$dataLegend.css("left",0)}}};return GeodataLayer});