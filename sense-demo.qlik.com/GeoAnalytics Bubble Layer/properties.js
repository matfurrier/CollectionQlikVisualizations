define(["../IdevioMap/common/SenseProperties"],function(b){var a=[{value:"auto",label:"Auto"},{value:"coordinates",label:"Latitude, Longitude"},{value:"dimension",label:"Dimension"},{value:"measure",label:"Measure"}];var c={outlineColor:true};return{type:"items",component:"accordion",items:{dimensions:{uses:"dimensions",translation:"ID",min:1,max:1},measures:{uses:"measures",translation:"Location, Size",min:0,max:4},layersettings:b.getLayerProperties("ideviobubblelayer"),locationsettings:b.getLocationProperties(true,a),settings:{uses:"settings",items:{general:b.getLegendProperties({hasColors:true,hasSizes:true}),size:b.getSizeProperties("Radius",5,20,true),color:b.getColorProperties(c),label:b.getLabelProperties(true),infoBubbleSettings:b.getInfoBubbleProperties()}}}}});