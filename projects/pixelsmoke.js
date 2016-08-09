var smoke = [];
var smokeEmitter = function(){
  this.x = backCanvas.width/2;
  this.y = backCanvas.height/2;
  this.dx = 30;
  this.dy = 15;
  this.ddx = ( Math.random() * 2 ) - 1;
  this.ddy = ( Math.random() * 2 ) - 1;
  this.update = function(){
    this.x += this.dx;
    this.dx += this.ddx;
    this.y += this.dy;
    this.dy += this.ddy;
    if (this.x >= backCanvas.width/2){
      this.dx -= 3;
    } else {
      this.dx += 3;
    }
    if (this.y >= backCanvas.height/2){
      this.dy -= 3;
    } else {
      this.dy += 3;
    }
  }
}
var smokeEmitter = new smokeEmitter();
var thisFramePos = {x: undefined, y: undefined};
var lastFramePos = {x: undefined, y: undefined};
var riseRun = {x: undefined, y:undefined};
var updateDirection = function(){
  lastFramePos.x = thisFramePos.x;
  lastFramePos.y = thisFramePos.y;
  thisFramePos.x = smokeEmitter.x;
  thisFramePos.y = smokeEmitter.y;
  riseRun.x = thisFramePos.x - lastFramePos.x;
  riseRun.y = thisFramePos.y - lastFramePos.y;
}
var WASDBool = {w:false, a:false, s:false, d:false};
$(document).on('keydown', function(event){
  console.log(event);
  switch (event.keyCode){
    case 87:
      WASDBool.w = true;
      break;
    case 65:
      WASDBool.a = true;
      break;
    case 83:
      WASDBool.s = true;
      break;
    case 68:
      WASDBool.d = true;
      break;
  }
  console.log(WASDBool);
});
$(document).on('keyup', function(event){
  switch (event.keyCode){
    case 87:
      WASDBool.w = false;
      break;
    case 65:
      WASDBool.a = false;
      break;
    case 83:
      WASDBool.s = false;
      break;
    case 68:
      WASDBool.d = false;
      break;
  }
});
var testKeys = function(){
  if (WASDBool.w){
    smokeEmitter.dy -= 0.3;
  }
  if (WASDBool.a){
    smokeEmitter.dx -= 0.3;
  }
  if (WASDBool.s){
    smokeEmitter.dy += 0.3;
  }
  if (WASDBool.d){
    smokeEmitter.dx += 0.3;
  }
}
$(document).on('mousedown', function(){
  mouseDown = true;
})
$(document).on('mouseup', function(){
  mouseDown = false;
})
var currentColor = 0;
var rectSmoke = function(){
  this.width = 10;
  this.height = 10;

  this.x = smokeEmitter.x - this.width/2;
  this.y = smokeEmitter.y;
  this.dx = ((Math.random() * 5 - 2.5) + riseRun.x ) * -1;
  this.dy = ((Math.random() * 5 - 2.5) + riseRun.y ) * -1;
  this.ddx = Math.random() * 0.4 - 0.2;
  this.ddy = Math.random() * 0.4 - 0.2;
  this.color = currentColor;
  if (Math.hypot(riseRun.x,riseRun.y) <= 0.5){
    this.speed = 0.005;
  } else {
    this.speed = 0.02;
  }

  //console.log(this.speed);
  this.opacity = 0.7;
  this.draw = function(){
    this.x += this.dx;
    this.dx += this.ddx;
    this.y += this.dy;
    this.dy += this.ddy;
    this.width *= 1.09;
    this.height *= 1.09;
    this.opacity -= this.speed;
    if (this.opacity <= 0){
      this.opacity = 0.01;
    }
    backCTX.fillStyle = "hsl(" + this.color + ", 100%, 50%)";
    backCTX.globalAlpha = this.opacity;
    backCTX.fillRect(this.x,this.y,this.width,this.height);

    backCTX.strokeStyle = "hsl(" + this.color + ", 100%, 60%)";
    backCTX.globalAlpha = this.opacity;
    backCTX.lineWidth = this.width/12;
    backCTX.strokeRect(this.x,this.y,this.width,this.height);

  }
}
var updateSmoke = function(){
  backCTX.clearRect(0,0,backCanvas.width,backCanvas.height);
  backCTX.fillStyle = 'black';
  backCTX.fillRect(0,0,backCanvas.width,backCanvas.height);
  currentColor += 7;
  testKeys();
  smokeEmitter.update();
  updateDirection();
  smoke.push(new rectSmoke());
  smoke.push(new rectSmoke());
  smoke.push(new rectSmoke());
  for (var i = 0; i < smoke.length; i++){
    smoke[i].draw();
    if (smoke[i].opacity <= 0.02){
      smoke.splice(i,1);
      i -= 1;
    }
  }
  backCTX.globalAlpha = 1;
}
