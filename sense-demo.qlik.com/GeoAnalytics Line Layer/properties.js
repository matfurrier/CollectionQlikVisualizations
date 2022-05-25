define(["../IdevioMap/common/SenseProperties"],function(b){var a=[{value:"auto",label:"Auto"},{value:"dimensionLocationId",label:"Dimension"},{value:"coordinates",label:"Latitude, Longitude"},{value:"measureStartEnd",label:"Measure Start, End"},{value:"measureLocationId",label:"Measure Location ID"}];return{type:"items",component:"accordion",items:{dimensions:{uses:"dimensions",translation:"ID",min:1,max:1},measures:{uses:"measures",translation:"From, To, Width",min:0,max:6},layersettings:b.getLayerProperties("ideviolinelayer"),locationsettings:b.getLocationProperties(true,a),settings:{uses:"settings",items:{general:b.getLegendProperties({hasColors:true,hasSizes:true}),size:b.getSizeProperties("Width",1,10),color:b.getColorProperties(),label:b.getLabelProperties(),line:{type:"items",label:"Line",items:{arrowSwitch:{ref:"arrow.style",label:"Arrow Style",component:"dropdown",type:"string",defaultValue:"none",options:[{value:"none",label:"None"},{value:"forward",label:"Forward"},{value:"backward",label:"Backward"},{value:"both",label:"Both"}],show:true},arrowPosition:{ref:"arrow.position",label:"Arrow Position",type:"number",min:0,max:100,component:"slider",defaultValue:80,show:function(c){return c.arrow&&c.arrow.style&&c.arrow.style!=="none"}},lineCurviness:{ref:"curviness",label:"Line Curviness",type:"number",min:0,max:100,component:"slider",defaultValue:0}}},infoBubbleSettings:b.getInfoBubbleProperties()}}}}});