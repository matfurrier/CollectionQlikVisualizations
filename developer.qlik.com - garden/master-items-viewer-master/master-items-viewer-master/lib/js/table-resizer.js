$(function(){var e,i,s,t,n=!1;$(document).on({mousemove:function(t){n&&s.width(i+(t.pageX-e))},mouseup:function(){n&&(t.removeClass("resizing"),n=!1)}}).on("mousedown",".table-resizable th",function(o){s=$(this),n=!0,e=o.pageX,i=s.width(),t=s.closest(".table-resizable").addClass("resizing")}).on("dblclick",".table-resizable thead",function(){$(this).find("th[style]").css("width","")})});