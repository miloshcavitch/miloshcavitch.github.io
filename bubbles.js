var elTiempo = new Date();
var topCanvas = document.getElementById('bubbles-canvas');
var topctx = topCanvas.getContext('2d');
var backCanvas = document.getElementById('back-canvas');
var backCTX = backCanvas.getContext('2d');

var screenWidth;
var screenHeight;
if (window.screen.availWidth <= 414){
  screenWidth = window.screen.availWidth;
} else {
  screenWidth = window.innerHeight;
}
if (window.screen.availHeight <= 736){
  screenHeight = window.screen.availHeight;
} else {
  screenHeight = window.innerHeight;
}

topCanvas.width = screenWidth;
topCanvas.height = screenHeight;
var transitionTime = 30;
var oppositeCornerDX = -0.2;
var oppositeCornerDY = -0.2;
var topEmitter = {x: topCanvas.width +100, y: topCanvas.height+ 30};//before it was -100, 30
var particles = [];
var topParticle = function(){
  this.x = topEmitter.x;
  this.y = topEmitter.y;
  this.dx = 4 - Math.random() * 8;
  this.dy = 4 - Math.abs(this.dx);
  if (Math.random() <= 0.5){
    this.dy *= -1;
  }
  this.ddx = 0.45 - Math.random() * 0.9;
  this.ddy = 0.45 - Math.random() * 0.9;
  this.size = 1 + Math.random() * 1.5;
  this.dSize = 0.5 + Math.random() * 0.3;
  this.alpha = 0.45;
  this.draw = function(){
    this.dx += this.ddx;

    this.x += this.dx;
    this.dy += this.ddy + oppositeCornerDY;
    this.y += this.dy;
    if (this.maxSize === false){
      this.size += this.dSize;
    }
    if (this.minAlpha === false){
      this.alpha -= 0.005;
    }
    topctx.beginPath();
    topctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    topctx.fillStyle = 'white'
    topctx.globalAlpha = this.alpha;
    topctx.fill();
  }
  this.maxSize = false;
  this.minAlpha = false;
}
var unit = screenWidth/1600;

var Bubble = function(){
  this.size = Math.random() * 40 + 3;
  this.x = Math.random() * 1600;
  this.y = topCanvas.height + this.size;

  this.sinCount = 0;
  this.dx = Math.random() * 1 - 0.5;
  this.color = Math.floor(Math.random() * 360);
  this.update = function(){
    this.sinCount += 0.05;
    this.x +=  this.size/6 * (Math.sin(this.sinCount) + this.dx);
    this.y -=  this.size/3 * unit;
    this.color += 2;
    this.render();
  }
  this.render = function(){
    topctx.beginPath();
    topctx.globalAlpha = 0.2 + (Math.sin(this.sinCount) * 0.2);
    topctx.fillStyle = '#eee';
    topctx.arc(this.x * unit, this.y, this.size * unit, 0, Math.PI * 2);
    topctx.fill();
    topctx.closePath();
  }
}
var bubbles = [];

/*
if (window.name != ''){
  var lastBubble = JSON.parse(window.name);
  for ( var i = 0; i < lastBubble.length; i++){
    bubbles.push( new Bubble(lastBubble[i].x, lastBubble[i].y, lastBubble[i].color, lastBubble[i].sinCount, lastBubble[i].size, lastBubble[i].dx) );
    console.log(bubbles[i]);
  }
}
*/
var bubblesFrame = 0;
var newParticleUpdate = function(){
  bubblesFrame++;
  if (bubblesFrame % 3 === 0){
    bubbles.push(new Bubble() );
  }
  for (var i = 0; i < bubbles.length; i++){
    //console.log(i);
    bubbles[i].update();
    if (bubbles[i].y < 0 - bubbles[i].size){
      bubbles.splice(i, 1);
      i--;
    }
  }
  topctx.globalAlpha = 1;
}
var originalParticleUpdate = function(){
  particles.push(new topParticle);
  for (var i = 0; i < particles.length; i++){
    particles[i].draw();
    if (particles[i].alpha <= 0.05){
      particles[i].minAlpha = true;
    }
    if (particles[i].size > 350){
      particles[i].maxSize = true;
    }

    if (particles[i].x >= topCanvas.width +1000 || particles[i].x <= -1000){
      particles.splice(i, 1);
      if (i != 0){
        i -= 1;
      }
    }
    if (particles[i].y >= topCanvas.height + 1000 || particles[i].y <= -1000){
      particles.splice(i, 1);
      if (i != 0){
        i -=1;
      }
    }

  }
  topctx.globalAlpha = 1;
}
var updateTopParticles = function(){
  originalParticleUpdate();
}

var testWindowSize = function(){
  if (window.screen.availWidth <= 414){
    screenWidth = window.screen.availWidth;
  } else {
    screenWidth = window.innerWidth;
  }
  if (window.screen.availHeight <= 736){
    screenHeight = window.screen.availHeight;
  } else {
    screenHeight = window.innerHeight;
  }
  if (topCanvas.width != screenWidth){
    topCanvas.width = screenWidth;
    topEmitter.x = topCanvas.width + 100;
    unit = screenWidth/1600
    updateBounds();
  }
  if (topCanvas.height != screenHeight){
    topCanvas.height = screenHeight;
    topEmitter.y = topCanvas.height + 30;
    updateBounds();
  }
}
/////////////////////////////////
////////////////////////////////
//Window Circles
var windowCircles = [];
var windowBounds = {xLeft: screenWidth/4, xRight: screenWidth - screenWidth/4,
                    yTop: screenHeight/4, yBottom: screenHeight- screenHeight/4};
var desiredCircleArea;
var updateBounds = function(){
  var lastWidth = windowBounds.xRight - windowBounds.xLeft;
  var lastHeight = windowBounds.yBottom - windowBounds.yTop;
  windowBounds.xRight = topCanvas.width - topCanvas.width/4;
  windowBounds.xLeft = topCanvas.width/4;
  windowBounds.yTop = topCanvas.height/4;
  windowBounds.yBottom = topCanvas.height - topCanvas.height/4;
  var newWidth = windowBounds.xRight - windowBounds.xLeft;
  var newHeight = windowBounds.yBottom - windowBounds.yTop;
  desiredCircleArea = (newWidth * newHeight)/ 400;
  if (newWidth * newHeight <= 85000){
    maxWindowBubbleSize = 50;
  } else {
    maxWindowBubbleSize = 75;
  }
  windowCircles.forEach(function(c){
    c.x = c.x * (newWidth/lastWidth);
    c.y = c.y * (newHeight/lastHeight);
  });

  backCanvas.width = (windowBounds.xRight - windowBounds.xLeft) + maxWindowBubbleSize * 2;
  backCanvas.height = (windowBounds.yBottom - windowBounds.yTop) + maxWindowBubbleSize * 2;
  var leftPX = (windowBounds.xLeft - maxWindowBubbleSize) + 'px';
  var topPX = (windowBounds.yTop - maxWindowBubbleSize) + 'px';
  $('#back-canvas').css('left', leftPX);
  $('#back-canvas').css('top', topPX);

}
var maxWindowBubbleSize = 75;
updateBounds()//init setting;
var WindowCircle = function(){
  this.x = (Math.random() * (windowBounds.xRight -windowBounds.xLeft)) + windowBounds.xLeft;
  this.y = (Math.random() * (windowBounds.yBottom - windowBounds.yTop)) + windowBounds.yTop;
  var maxSize = desiredCircleArea/10;
  this.finalSizeX =  Math.random() * maxWindowBubbleSize;
  if (this.x + this.finalSizeX > windowBounds.xRight - this.finalSizeX){
    this.x = windowBounds.xRight - this.finalSizeX;
  }
  this.finalSizeY = Math.random() * maxWindowBubbleSize;
  if (this.y + this.finalSizeY > windowBounds.yBottom - this.finalSizeY){
    this.y = windowBounds.yBottom - this.finalSizeY;
  }
  this.currentSizeX = 0;
  this.currentSizeY = 0;
  this.growthSpeedX = this.finalSizeX / transitionTime;
  this.growthSpeedY = this.finalSizeY / transitionTime;
  this.currentHover = 1;
  this.dx = (Math.random() * 3) - 1.5;
  this.dy = (Math.random() * 3) - 1.5;
  this.left = false;
  this.down = false;
  if (this.dx < 0){
    this.left = true;
  }
  if (this.dy > 0){
    this.down = true;
  }
  this.draw = function(){
    this.x += this.dx;
    this.y += this.dy;
    if (this.x + this.finalSizeX >= windowBounds.xRight){
      if (this.left === false){
        this.dx *= -1;
        this.left = true;
      }
    }
    if (this.x  - this.finalSizeX <= windowBounds.xLeft){
      if (this.left === true){
        this.dx *= -1;
        this.left = false;
      }
    }
    if (this.y + this.finalSizeX >= windowBounds.yBottom){
      if (this.down === true){
        this.dy *= -1;
        this.down = false;
      }
    }
    if (this.y - this.finalSizeX <= windowBounds.yTop ){
      if (this.down === false){
        this.dy *= -1;
        this.down = true;
      }
    }
    topctx.beginPath();
    topctx.fillStyle = 'black';
    topctx.arc(this.x,this.y,(this.currentSizeX * this.currentHover),0,Math.PI * 2);
    topctx.fill();
    //topctx.fillRect(this.x,this.y,this.currentSizeX,this.currentSizeY);
    topctx.closePath();
  }
}
var updateWindowCircles = function(){
}
var windowState = 'grow';
var updateWindowCircles = function(){
  checkFrame();
  switch (windowState){
    case 'grow':
      //console.log('grow');
      windowCircles.forEach(function(wC){
        wC.draw();
        wC.currentSizeX += wC.growthSpeedX;
        if (titleHover === true && wC.currentHover < 1.1){
          wC.currentHover += 0.01;
        }
        if (titleHover === false && wC.currentHover > 1){
          wC.currentHover -= 0.01;
        }
      });
      break;

    case 'mid':
      //console.log('mid');
      windowCircles.forEach(function(wC){
        wC.draw();
        if (titleHover === true && wC.currentHover < 1.1){
          wC.currentHover += 0.01;
        }
        if (titleHover === false && wC.currentHover > 1){
          wC.currentHover -= 0.01;
        }
      });
      break;
    case 'shrink':
      //console.log('shrink')
      windowCircles.forEach(function(wC){
        wC.draw();
        wC.currentSizeX -= wC.growthSpeedX;
        if (wC.currentSizeX < 0){
          wC.currentSizeX = 0;
        }
      });
      break;
  }
}
var repopulateWindowCircles = function(){
  windowCircles = [];
  var circleArea = 0;
  var i = 0;
  while (circleArea < desiredCircleArea){
    windowCircles.push(new WindowCircle());
    circleArea += windowCircles[i].finalSizeX;
    i++;
  }
}
var tweenCount = 0;
var checkFrame = function(){
  tweenCount++;
  if (nextPossibleSwitch && windowState === 'mid'){// && choice isn't already selected
    windowState = 'shrink';
    tweenCount = 0;
    nextPossibleSwitch = false;
    updateProject();
  }
  if (windowState === 'grow' && tweenCount === transitionTime){
    //console.log('MID!');
    windowState = 'mid';
    tweenCount = 0;
    //color alpha switch-over;
  }
  if (windowState === 'mid' && tweenCount >= 200){
    //console.log('SHRINK!');
    windowState = 'shrink';
    tweenCount = 0;
    updateProject();
  }
  if (windowState === 'shrink' && tweenCount >= transitionTime){
    updateFunc();
    mouse.x = screenWidth/2;
    mouse.y = screenHeight/2;
    //console.log('grow!')
    windowState = 'grow';
    tweenCount = 0;
    repopulateWindowCircles();
  }
}
var titleHover = false;
$('.project-title').hover(function(){
  titleHover = !titleHover;
});
////////////////////////////////
///////////////////////////////
var updateColor = function(){
  //$('body').css('background-color', colorShader((colorRay[Math.floor(Math.random() * 765)]), 170));
}
var shade = 0;
var shadeBool = true;
var updateTopCanvas = function(){
  topctx.globalCompositeOperation = 'source-over';
  topctx.clearRect(0,0,topCanvas.width,topCanvas.height);
  if (shadeBool){
    shade++;
    if (shade >= 50){
      shadeBool = false;
    }
  }
  topctx.fillStyle = "hsl(0, 0%, " + shade + "%)"//'gray';
  topctx.fillRect(0,0,screenWidth,screenHeight);
  updateTopParticles();


  topctx.globalCompositeOperation = 'destination-out';
  updateWindowCircles();
  //below is for testing
}

var render = function(){
  updateTopCanvas();
  topctx.fillStyle = 'black';
}
