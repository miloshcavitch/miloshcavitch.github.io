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
}
