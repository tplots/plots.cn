$(function(){
	function addEvent(el, type, callback, useCapture  ){
      if(el.dispatchEvent){//w3c方式优先
          el.addEventListener( type, callback, !!useCapture  );
      }else {
          el.attachEvent( "on"+type, callback );
      }
      return callback;//返回callback方便卸载时用
    }
	  var wheel = function(obj,callback){
	      var wheelType = "mousewheel"
	      try{
	          document.createEvent("MouseScrollEvents")
	          wheelType = "DOMMouseScroll"
	      }catch(e){}
	      addEvent(obj, wheelType,function(event){
	          if ("wheelDelta" in event){//统一为±120，其中正数表示为向上滚动，负数表示向下滚动
	              var delta = event.wheelDelta
	              //opera 9x系列的滚动方向与IE保持一致，10后修正
	              if( window.opera && opera.version() < 10 )
	                  delta = -delta;
	              //由于事件对象的原有属性是只读，我们只能通过添加一个私有属性delta来解决兼容问题
	              event.delta = Math.round(delta) /120; //修正safari的浮点 bug
	          }else if( "detail" in event ){
	              event.wheelDelta = -event.detail * 40//为FF添加更大众化的wheelDelta
	              event.delta = event.wheelDelta /120  //添加私有的delta
	          }
	          callback.call(obj,event);//修正IE的this指向
	      });
	  }
	  	wheel(document,function(e){
	  		var srtop=parseInt(window.scrollY)
		 if(srtop>800&&srtop<1900){
		 	$('.section2 .page').addClass('down_up');
		 	$('.section2 .toAnima').addClass('up_down');
		 }else if(srtop>1960&&srtop<3040){
		 	$('.section3 .page').addClass('down_up')
		 	$('.section3 .toAnima').addClass('up_down')
		 }else if(srtop>3040&&srtop<4120){
		 	$('.section4 .page').addClass('down_up')
		 	$('.section4 .toAnima').addClass('up_down')
		 }else if(srtop>3920&&srtop<4980){
		 	$('.section5 .img_warp').addClass('left_right')
		 	$('.section5 .info_intr').addClass('right_left')
		 }else if(srtop>5080&&srtop<6140){
		 	$('.section6 .img_warp').addClass('left_right')
		 	$('.section6 .info_intr').addClass('right_left')
		 }
	  })
})