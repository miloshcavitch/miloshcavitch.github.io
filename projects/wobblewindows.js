var rects = [];
var RECT = function(){
  this.x = Math.random() * backCanvas.width;
  this.y = Math.random() * backCanvas.height;
  this.size = Math.random() * 100
  this.oscillation = Math.random();
  var color = "hsl(" + Math.floor(Math.random() * 360) + ", 90%, 50%)";
  this.color = color;
  this.dx = 1 - Math.random() * 2;
  this.dy = 1 - Math.random() * 2;
  this.testBoundaries = function(){
    if ( (this.x +  this.size + (Math.sin(this.oscillation) * this.size/4) )>= backCanvas.width || this.x <= 0){
      this.dx *= -1;
    }
    if ( (this.y +  this.size + (Math.sin(this.oscillation) * this.size/4) )>= backCanvas.height || this.y <= 0){
      this.dy *= -1;
    }
  }
}
for (var i = 0; i < 500; i++){
  rects.push(new RECT());
}

var bubble = new SmoothPath(backCTX);
for (var i = 0; i < wobbleFrames[0].length; i++){
  bubble.addPoint(new SmoothPoint(100 + wobbleFrames[0][i].pos.x, 100 + wobbleFrames[0][i].pos.y));
}
var bubbleFrame = 0;
var bubbleRunning = false;
var bubbleSize = 0.8;
var updateBubble = function(){
  bubbleSize = window.innerWidth / 2000;
  //console.log(bubbleSize);
  if (!bubbleRunning){
    if (Math.random() > 0.1){
      bubbleRunning = true;
    }
  } else {
    bubbleFrame++;
    if (bubbleFrame >= wobbleFrames.length - 100){
      bubbleRunning = false;
      bubbleFrame = 0;
    }
  }
  for ( var i = 0; i < wobbleFrames[0].length; i++){
    bubble.positions[i].handleIn.x = (bubbleSize * (wobbleFrames[bubbleFrame][i].handleIn.x)) + backCanvas.width/2;
    bubble.positions[i].handleIn.y = (bubbleSize * (wobbleFrames[bubbleFrame][i].handleIn.y)) + backCanvas.height/2;
    bubble.positions[i].x = (bubbleSize * (wobbleFrames[bubbleFrame][i].pos.x)) + backCanvas.width/2;
    bubble.positions[i].y = (bubbleSize * (wobbleFrames[bubbleFrame][i].pos.y)) + backCanvas.height/2;
    bubble.positions[i].handleOut.x = (bubbleSize * (wobbleFrames[bubbleFrame][i].handleOut.x)) + backCanvas.width/2;
    bubble.positions[i].handleOut.y = (bubbleSize * (wobbleFrames[bubbleFrame][i].handleOut.y)) + backCanvas.height/2;
  }
}

var updateWobble = function(){
  backCTX.fillRect(0,0,backCanvas.width,backCanvas.height);
  for (var i = 0; i < rects.length; i++){
    rects[i].x += rects[i].dx;
    rects[i].y += rects[i].dy;
    rects[i].testBoundaries();
    backCTX.beginPath();
    backCTX.fillStyle = rects[i].color;
    //console.log(backCTX.fillStyle);
    var tempSize = rects[i].size + (Math.sin(rects[i].oscillation) * rects[i].size/4)
    backCTX.rect( (rects[i].x - tempSize/2),(rects[i].y - tempSize/2), tempSize,tempSize);
    backCTX.fill();
    backCTX.closePath();
  }
  backCTX.globalCompositeOperation = 'destination-in';
  updateBubble();
  //bubble.updateHandles();
  bubble.draw();
  backCTX.fillStyle = 'red';
  backCTX.globalCompositeOperation = 'source-over';
}
