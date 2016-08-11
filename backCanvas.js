var mouse = {x: undefined, y: undefined};
$(document).mousemove(function(event){//mouse input
  mouse.x = event.pageX - windowBounds.xLeft + maxWindowBubbleSize;
  mouse.y = event.pageY - windowBounds.yTop + maxWindowBubbleSize;
  //console.log(mouse.x + ", " + mouse.y);
});

backCanvas.width = window.innerWidth;
backCanvas.height = window.innerHeight;
backCTX.fillStyle = 'black';
backCTX.fillRect(0,0,backCanvas.width,backCanvas.height);
var updateBackCanvas = function(){
  backCTX.clearRect(0,0,backCanvas.width,backCanvas.height);
  activeBack();//run active background project;
}

updateBounds();
