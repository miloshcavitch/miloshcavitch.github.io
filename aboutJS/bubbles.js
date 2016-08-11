var canvas = document.getElementById('bubbles-canvas');
var ctx = canvas.getContext('2d');


var bubbleFrame = 0;
canvas.width = window.innerWidth + 100;
canvas.height = window.innerHeight;
var unit = canvas.width/1600;
$(document).ready(function(){
  $('body').css('background-color', 'black');
  setTimeout(function(){
    $('#about').css('opacity', '1');
  }, 1100);
  testWindowSize();
});
var shade = {sat: 0, light: 100, frame: 0};

var testWindowSize = function(){
  if (canvas.width != window.innerWidth){
    canvas.width = window.innerWidth;
    unit = canvas.width/1600
    //updateBounds();
  }
  if (canvas.height != window.innerHeight){
    canvas.height = window.innerHeight;
    //updateBounds();
  }
}

testWindowSize();
$('.links').click(function(event){
  //document.location.href = 'about.html'
  console.log(event.target.innerHTML);
  var linkBool = false;
  var link = ''
  switch (event.target.innerHTML){
    case 'ABOUT':
      link = 'about.html';
      linkBool = true;
      break;
    case 'PORTFOLIO':
      link = 'index.html';
      linkBool = true;
      break;
    case 'CONTACT':
      linkBool = true;
      break;
  }
  if (linkBool){
    window.name = JSON.stringify(bubbles);
    document.location.href = link;
  }
});


var updateBubbles = function(){
  for (var i = 0; i < bubbles.length; i++){
    //console.log(i);
    bubbles[i].update();
    if (bubbles[i].y < 0 - bubbles[i].size){
      bubbles.splice(i, 1);
      i--;
    }
  }
}
var Bubble = function(x, y, color, sinCount, size, dx){
  if (x != undefined){
    this.x = x;
    this.y = y;
    this.color = color;
    this.sinCount = sinCount;
    this.size = size;
    this.dx = dx;
  } else {
    this.size = Math.random() * 40 + 3;
    this.x = Math.random() * 1600;
    this.y = canvas.height + this.size;
    this.sinCount = 0;
    this.dx = Math.random() * 1 - 0.5;
    this.color = Math.floor(Math.random() * 360);
  }
  this.update = function(){
    this.sinCount += 0.05;
    this.x +=  this.size/6 * (Math.sin(this.sinCount) + this.dx);
    this.y -=  this.size/3 * unit;
    this.color += 2;
    this.render();
  }
  this.render = function(){
    ctx.beginPath();
    ctx.globalAlpha = 0.2 + (Math.sin(this.sinCount) * 0.2);
    ctx.fillStyle = 'gray'//"hsl(" + this.color + ", " + shade.sat + "%, " + shade.light + "%)";
    ctx.arc(this.x * unit, this.y, this.size * unit, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
}
var bubbles = [];
/*
if (window.name != ''){
  var lastBubble = JSON.parse(window.name);
  console.log(lastBubble[0]);
  for ( var i = 0; i < lastBubble.length; i++){
    bubbles.push( new Bubble(lastBubble[i].x, lastBubble[i].y, lastBubble[i].color, lastBubble[i].sinCount, lastBubble[i].size, lastBubble[i].dx) );
    console.log(bubbles[i]);
    debugger;
  }
}
*/
var update = function(){
  testWindowSize();
  if (shade.frame < 100){//2 seconds at 40 per second
    shade.frame++;
    shade.sat += 100/100;
    shade.light -= 50/100;
    if (shade.light > 49){
      shade.light = 50;
    }
  }
  bubbleFrame++;
  if (bubbleFrame % 3 === 0){
    bubbles.push(new Bubble() );
  }
  ctx.clearRect(0,0,canvas.width,canvas.height);
  updateBubbles();
}

setInterval(update, 25);
