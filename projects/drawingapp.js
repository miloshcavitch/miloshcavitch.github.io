var pseudoSprite = {shapes: []};

var previewPoint = function(){
  this.worldX = Math.random() * backCanvas.width;
  this.worldY = Math.random() * backCanvas.height;
}
var previewPoly = function(){
  this.color = 'black';
  this.type = 'poly';
  this.globalAlpha = Math.random() * 0.7;
  this.positions = [];
  var random = Math.floor(Math.random() * 8) + 2;
  for ( var i = 0; i < random; i++){
    this.positions.push(new previewPoint() );
  }
}
var previewCircle = function(){
  this.color = Math.floor(Math.random() * 360)
  this.type = 'circle';
  this.colorSpeed = Math.floor(Math.random() * 5) + 1;
  this.globalAlpha = Math.random() * 0.5;
  this.alphaSpeed = Math.random() * 0.05;
  this.positions = [];
  this.radius = Math.random() * 40;
  this.positions.push(new previewPoint() );
}

for (var i = 0; i < 7; i++){
  pseudoSprite.shapes.push(new previewCircle() );
}
for (var i = 0; i < 2; i++){
  pseudoSprite.shapes.push(new previewPoly() );
}
pseudoSprite.shapes[0].globalAlpha = 0.8;
console.log(pseudoSprite);
var polyEditPointRender = function(shape, color){
  backCTX.globalAlpha = 0.6;
  shape.positions.forEach(function(p){
   backCTX.beginPath();
   backCTX.arc(p.worldX, p.worldY, 10, 0, 2 * Math.PI);
   backCTX.fillStyle = color;
   backCTX.fill();
  });
 backCTX.beginPath();
 backCTX.globalAlpha = 0.4;
 backCTX.moveTo(shape.positions[0].worldX, shape.positions[0].worldY);
  shape.positions.forEach(function(p){
   backCTX.lineTo(p.worldX, p.worldY);
  });
 backCTX.lineTo(shape.positions[0].worldX, shape.positions[0].worldY);
 backCTX.strokeStyle = color;
 backCTX.lineWidth = 1;
 backCTX.stroke();
 backCTX.globalAlpha = 1;
}
var backGrid = function(){
  backCTX.beginPath();
  backCTX.fillStyle = '#555555';
  backCTX.rect(0, 0, backCanvas.width, backCanvas.height);
  backCTX.fill();
  backCTX.closePath();
  var increment = backCanvas.height/64;
  var pos = backCanvas.width/2;
  backCTX.strokeStyle = '#999999';
  backCTX.lineWidth = 0.125;
  while (pos > 0){
    backCTX.beginPath();
    backCTX.moveTo(pos, 0);
    backCTX.lineTo(pos, backCanvas.height);
    backCTX.stroke();
    backCTX.closePath();
    pos -= increment;
  }
  pos = backCanvas.width/2 + increment;
  while (pos < backCanvas.width){
    backCTX.beginPath();
    backCTX.moveTo(pos, 0);
    backCTX.lineTo(pos, backCanvas.height);
    backCTX.stroke();
    backCTX.closePath();
    pos += increment;
  }
  pos = increment;
  for (var i = 0; i < 63; i++){
    backCTX.beginPath();
    backCTX.moveTo(0, pos);
    backCTX.lineTo(backCanvas.width, pos);
    backCTX.stroke();
    backCTX.closePath();
    pos += increment;
  }
}

var gridCount = 16;
var frontGridRender = function(){
  var increment = backCanvas.height/gridCount;
 backCTX.strokeStyle = 'white';
 backCTX.lineWidth = 0.25;
  var gridPos =backCanvas.width/2;
  while(gridPos > 0){//verticals
   backCTX.beginPath();
   backCTX.moveTo(gridPos, 0);
   backCTX.lineTo(gridPos,backCanvas.height);
   backCTX.stroke();
    gridPos -= increment;
   backCTX.closePath();
  }
  gridPos =backCanvas.width/2 + increment;
  while (gridPos <backCanvas.width){
   backCTX.beginPath();
   backCTX.moveTo(gridPos, 0);
   backCTX.lineTo(gridPos,backCanvas.height);
   backCTX.stroke();
    gridPos += increment;
   backCTX.closePath();
  }
  gridPos = increment;
  for (var i = 0; i < gridCount; i++){//horizontals
   backCTX.beginPath();
   backCTX.moveTo(0, gridPos);
   backCTX.lineTo(backCanvas.width, gridPos);
   backCTX.stroke();
    gridPos += increment;
   backCTX.closePath();
  }
}

var gridSnap = function(){
  var candidate = {worldX: undefined, worldY: undefined, type: 'grid'};
  var pointX, pointY;
  var pointSwitch = true;
  var xCount = 0;
  var yCount = 0;
  while(pointSwitch === true){
    if (Math.abs(mouse.y - yCount * backCanvas.height/gridCount) <= 5){
      pointSwitch = false;
      pointY = yCount * backCanvas.height/gridCount;
    }
    if (yCount * backCanvas.height/gridCount >= backCanvas.width){
      pointSwitch = false;
    }
    yCount++;
  }
  pointSwitch = true;
  if (pointY != undefined){
    while(pointSwitch === true){
      if (mouse.x >= backCanvas.width/2){
        if (Math.abs(mouse.x-backCanvas.width/2 - xCount * backCanvas.height/gridCount) <= 5){
          pointSwitch = false;
          pointX = (xCount * backCanvas.height/gridCount) + backCanvas.width/2;
        }
        if (xCount * backCanvas.height/gridCount >= backCanvas.width){
          pointSwitch = false;
        }
        xCount++;
      } else {
        if (Math.abs((backCanvas.width/2 - xCount * backCanvas.height/gridCount) - mouse.x) <= 5){
          pointSwitch = false;
          pointX = backCanvas.width/2 - (xCount * backCanvas.height/gridCount);
        }
        if ((backCanvas.width/2 - xCount * backCanvas.height/gridCount) < 0){
          pointSwitch = false;
        }
        xCount++;
      }
    }
    if (pointX != undefined && pointY != undefined){
      pseudoSprite.shapes[7].positions[0].worldX = pointX;
      pseudoSprite.shapes[7].positions[0].worldY = pointY;
      //console.log('snap!');
    } else {
      pseudoSprite.shapes[7].positions[0].worldX = mouse.x;
      pseudoSprite.shapes[7].positions[0].worldY = mouse.y;
    }
  }
  //return candidate;
}

var renderPoly = function(shape){
  backCTX.beginPath();
  backCTX.moveTo(shape.positions[0].worldX, shape.positions[0].worldY);
  shape.positions.forEach(function(p){
    backCTX.lineTo(p.worldX, p.worldY);
  });
  backCTX.globalAlpha = shape.globalAlpha;
  /*
  shape.globalAlpha += shape.alphaSpeed;
  if (shape.globalAlpha >= 0.6 || shape.globalAlpha <= 0.1){
    shape.alphaSpeed *= -1;
  }
  */
  backCTX.fillStyle = shape.color;
  shape.color += shape.colorSpeed;
  backCTX.fill();
  backCTX.closePath()
}
var renderCircle = function(shape){
  backCTX.beginPath();
  backCTX.globalAlpha = shape.globalAlpha;
  /*
  shape.globalAlpha += shape.alphaSpeed;
  if (shape.globalAlpha >= 0.6 || shape.globalAlpha <= 0.1){
    shape.alphaSpeed *= -1;
  }
  */
  backCTX.fillStyle = 'black';
  backCTX.arc(shape.positions[0].worldX, shape.positions[0].worldY, shape.radius, 0, Math.PI * 2);
  backCTX.fill();
  backCTX.closePath();
}
var renderSprite = function(sprite){
  sprite.shapes.forEach(function(shape){
    switch (shape.type){
      case 'poly':
        renderPoly(shape);
        break;
      case 'circle':
        renderCircle(shape);
        break;
    }
  });
  backCTX.fillStyle = 'black';
  backCTX.globalAlpha = 1;
}
var color = 0;
var updateShapeColor = function(){
  color += 1;
  pseudoSprite.shapes[7].color = "hsl(" + color + ", 100%, 50%)";
}
var updateDrawingApp = function(){
  backCTX.clearRect(0,0,backCanvas.width,backCanvas.height);
  backGrid();
  pseudoSprite.shapes[7].positions[0].worldX = mouse.x;
  pseudoSprite.shapes[7].positions[0].worldY = mouse.y;
  //updateShapeColor();
  renderSprite(pseudoSprite);

  polyEditPointRender(pseudoSprite.shapes[7], '#aaa');
  //frontGridRender();
  //gridSnap();
  //include vector shapes and drawings
}
