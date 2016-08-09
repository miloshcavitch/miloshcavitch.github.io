var updateFetti = function(){
  backCTX.fillStyle = 'black';
  backCTX.fillRect(0,0,backCanvas.width,backCanvas.height);
  mouseSpeed.x = Math.abs(lastMouse.x - mouse.x);
  mouseSpeed.y = Math.abs(lastMouse.y - mouse.y);
  if (lastMouse.x > mouse.x){
    mouseSpeed.x = mouseSpeed.x * -1;
  }
  if (lastMouse.y > mouse.x){
    mouseSpeed.y = mouseSpeed.y * -1;
  }

  pRay.push(new Particle);
  for (var i = 0; i < pRay.length; i++){
    pRay[i].draw();
    if (pRay[i].brightness <= 0){
      pRay.splice(i, 1);
    }
  }
  lastMouse.x = mouse.x;
  lastMouse.y = mouse.y;
}
var mouseSpeed = {x: undefined, y: undefined};
var lastMouse = {x: undefined, y: undefined};
var gravity = 0.6;
var gravitySwitch = true;
var pRay = [];
var Particle = function(){
  this.x = mouse.x;
  this.y = mouse.y;
  this.dx = ((Math.random() * 30) - 8);
  this.dy = 8 - Math.abs(this.dx);
  if (Math.random() >= 0.5){
    this.dy = this.dy * -1;
  }
  if (mouseSpeed.x > 8 || mouseSpeed.x < -8 || mouseSpeed.y > 8 || mouseSpeed.y < -8){
    this.dx = mouseSpeed.x/3.5;
    this.dy = mouseSpeed.y/3.5;
  }
  this.color = Math.floor(Math.random() * 360);
  this.size = (Math.random() * 10) + 2;
  this.brightness = 50;

  this.draw = function(){
    backCTX.beginPath();
    backCTX.arc(this.x, this.y, this.size, 0, Math.PI*2);
    backCTX.fillStyle = "hsl(" + this.color + ", 100%, " + this.brightness + "%)";
    backCTX.fill();
    backCTX.closePath();

    if (this.size <= 30){
      this.size += 0.5;
    }
    this.x += this.dx;
    this.y += this.dy;
    this.dy += gravity;
    if ((this.y >= backCanvas.height - this.size && this.dy > 0) || (this.y <= this.size && this.dy < 0) ){
      this.dy = this.dy * -0.7;
    }
    if ((this.x >= backCanvas.width - this.size && this.dx > 0) || (this.x <= this.size && this.dx < 0)){
      this.dx = this.dx * -1;
    }
    this.brightness -= 1.2;
    if (this.brightness <= 0){
      delete this;
    }
    this.color += 12;
    if (this.color >= 360){
      this.color = this.color - 360;
    }
  }
}
$('#myCanvas').click(function(){
  gravitySwitch = !gravitySwitch;
  if (gravitySwitch === true){
    gravity = 0.4;
  } else {
    gravity = 0;
  }
});
