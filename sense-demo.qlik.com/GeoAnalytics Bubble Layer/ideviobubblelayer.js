define(["./BubbleLayer","../IdevioMap/common/Utils","./properties","css!./style.css"],function(c,b,a){return{initialProperties:{qHyperCubeDef:{qDimensions:[],qMeasures:[],qInitialDataFetch:[{qWidth:6,qHeight:b.MAX_OBJECTS}]},title:"Bubble Layer",showTitles:false,legendValues:{min:1,max:10,maxradius:1,minradius:10,title:""}},snapshot:{canTakeSnapshot:true},selections:{swipe:false,dataArea:{captureInput:false}},definition:a,paint:function(d,e){if(!this.bubbleLayer){this.bubbleLayer=new c(this,e,d)}this.bubbleLayer.paintExtension(e,false,false)}}});