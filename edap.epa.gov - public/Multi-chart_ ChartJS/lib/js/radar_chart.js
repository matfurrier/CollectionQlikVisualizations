var visualize=function(t,o,a,e){var r=o.qInfo.qId+"_chartjs_bar",l=e.calculateMargin(t,o),c=l[0],i=l[1];t.html('<canvas id="'+r+'" width="'+c+'" height="'+i+'"></canvas>');var n=[],s=0;"auto"==o.colors?(n=e.defineColorPalette("palette"),s=o.color):n=o.custom_colors.split("-");var u="rgba("+n[s]+","+o.opacity+")",d="",b=[];"auto"==o.colors&&o.background_color_switch?d="rgba("+n[o.background_color]+","+o.opacity+")":"auto"==o.colors?d="rgba("+n[o.color]+","+o.opacity+")":"custom"==o.colors&&o.background_color_switch?(b=o.custom_background_color.split("-"),d="rgba("+b[0]+","+o.opacity+")"):"custom"==o.colors&&(d="rgba("+n[s]+","+o.opacity+")");var p=o.qHyperCube.qDataPages[0].qMatrix;o.cumulative&&(p=e.addCumulativeValues(p));var g=document.getElementById(r);new Chart(g,{type:"radar",data:{labels:p.map(function(t){return t[0].qText}),datasets:[{label:o.qHyperCube.qMeasureInfo[0].qFallbackTitle,fill:o.background_color_switch,data:p.map(function(t){return t[1].qNum}),backgroundColor:d,borderColor:u,pointBackgroundColor:u,pointRadius:o.point_radius_size,borderWidth:1}]},options:{title:{display:o.title_switch,text:o.title},legend:{display:"hide"!=o.legend_position,position:o.legend_position,onClick:function(t,o){}},scale:{ticks:{beginAtZero:o.begin_at_zero_switch,callback:function(t,a,r){return e.formatMeasure(t,o,0)}}},tooltips:{mode:"label",callbacks:{label:function(t,a){return a.datasets[t.datasetIndex].label+": "+e.formatMeasure(t.yLabel,o,0)}}},responsive:!0,events:["mousemove","mouseout","click","touchstart","touchmove","touchend"],onClick:function(t){var o=this.getElementsAtEvent(t);o.length>0&&e.makeSelectionsOnDataPoints(p[o[0]._index][0].qElemNumber,a)}}})};