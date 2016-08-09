var s = 1;
function star(x){
  switch(x){
    case 16:
      this.thesize = Math.random()*0.7 + 0.25;
      this.speed = this.thesize * s;
      break;
    case 8:
      this.thesize = Math.random()*0.9 + 0.9;
      this.speed = this.thesize * s;
      break;
    case 4:
      this.thesize = Math.random() * 1.8 + 1.8;
      this.speed = this.thesize * s;
      break;
    case 2:
      this.thesize = Math.random() * 3.6 + 3.6;
      this.speed = this.thesize * s;
      break;
    case 1:
      this.thesize = Math.random() * 7.2 + 7.2;
      this.speed = this.thesize * s;
      break;
    default:
      this.thesize = Math.random() * 4.8;
      this.speed = this.thesize * s;
  }
  this.posY = -20;
  this.posX = Math.round(Math.random() * backCanvas.width);
  this.updateStar = function(){
    backCTX.beginPath();
   backCTX.rect(this.posX, this.posY, this.thesize, this.thesize * 1.5);
   backCTX.fillStyle = 'white';//colorRay[Math.round(Math.random() * 764)];// or colorRay[charColorIndex]; colorRay[charColorIndex];
   backCTX.fill();
   backCTX.closePath();
    this.posY += this.speed;
  }
}
var starLayers = [];
var starSpawnTimer = {spawnTimer: 0, then: 0};

//new one

function spacedSpawner(){
    var spaceStat = Math.random() * 31;
    var x;
    if (spaceStat > 15){
      x = 16;
    }
    if (spaceStat <= 15 && spaceStat > 7){
      x = 8;
    }
    if (spaceStat <= 7 && spaceStat > 3){
      x = 4;
    }
    if (spaceStat <= 3 && spaceStat > 1){
      x = 2;
    }
    if (spaceStat <= 1){
      x = 1;
    }
    starLayers.push(new star(x))
}

function LayerTraverse(el){//runs updateStar for all the stars
    el.updateStar();
    if (el.posY > backCanvas.height + el.thesize){
      starLayers.splice(starLayers.indexOf(el), 1);
    }
}
var fpsCounter = 0;
var lastSecond = 0;
var fpsString = '';

function updateStars(){
  spacedSpawner();
  backCTX.fillStyle = 'black';
  backCTX.fillRect(0,0,backCanvas.width,backCanvas.height);
  backCTX.fillStyle = 'white';
  starLayers.forEach(LayerTraverse);
}
var activeBack = function(){
  updateStars();
}

for (var i = 0; i < 600; i++){
  updateStars();
}
