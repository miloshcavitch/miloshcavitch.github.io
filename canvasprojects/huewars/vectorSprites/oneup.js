var oneUp = {colorArray: ['#000000', '#000000'], symmetryLine: 0, xCenter: 677.5, yCenter: 250, width: 60, height: 60, rotation: 0, shapes: [
{symmetryBool: false, color: 1, globalAlpha: 1, type: 'polygon',positions: [

{x: 0.1875, y: -0.4666666666666667},
{x: -0.1875, y: -0.4666666666666667},
{x: -0.1875, y: -0.4},
{x: -0.3125, y: -0.4},
{x: -0.3125, y: -0.3333333333333333},
{x: -0.375, y: -0.3333333333333333},
{x: -0.375, y: -0.26666666666666666},
{x: -0.4375, y: -0.26666666666666666},
{x: -0.4375, y: -0.06666666666666667},
{x: -0.5, y: -0.06666666666666667},
{x: -0.5, y: 0.26666666666666666},
{x: -0.4375, y: 0.26666666666666666},
{x: -0.4375, y: 0.4},
{x: -0.375, y: 0.4},
{x: -0.375, y: 0.4666666666666667},
{x: -0.3125, y: 0.4666666666666667},
{x: -0.3125, y: 0.5333333333333333},
{x: 0.3125, y: 0.5333333333333333},
{x: 0.3125, y: 0.4666666666666667},
{x: 0.375, y: 0.4666666666666667},
{x: 0.375, y: 0.4},
{x: 0.4375, y: 0.4},
{x: 0.4375, y: 0.26666666666666666},
{x: 0.5, y: 0.26666666666666666},
{x: 0.5, y: -0.06666666666666667},
{x: 0.4375, y: -0.06666666666666667},
{x: 0.4375, y: -0.26666666666666666},
{x: 0.375, y: -0.26666666666666666},
{x: 0.375, y: -0.3333333333333333},
{x: 0.3125, y: -0.3333333333333333},
{x: 0.3125, y: -0.4},
{x: 0.1875, y: -0.4},
]},
{symmetryBool: true, color: 0, globalAlpha: 1, type: 'polyline',lineWidth: 0.0332, positions: [

{x: 0, y: -0.4666666666666667},
{x: -0.1875, y: -0.4666666666666667},
{x: -0.1875, y: -0.4},
{x: -0.3125, y: -0.4},
{x: -0.3125, y: -0.3333333333333333},
{x: -0.375, y: -0.3333333333333333},
{x: -0.375, y: -0.26666666666666666},
{x: -0.4375, y: -0.26666666666666666},
{x: -0.4375, y: -0.2},
{x: -0.4375, y: -0.06666666666666667},
{x: -0.5, y: -0.06666666666666667},
{x: -0.5, y: 0.26666666666666666},
{x: -0.4375, y: 0.26666666666666666},
{x: -0.4375, y: 0.4},
{x: -0.375, y: 0.4},
{x: -0.375, y: 0.4666666666666667},
{x: -0.3125, y: 0.4666666666666667},
{x: -0.3125, y: 0.5333333333333333},
{x: 0, y: 0.5333333333333333},
]},
{symmetryBool: true, color: 0, globalAlpha: 1, type: 'polyline',lineWidth: 0.034, positions: [

{x: -0.4375, y: 0.26666666666666666},
{x: -0.375, y: 0.26666666666666666},
{x: -0.375, y: 0.2},
{x: 0, y: 0.2},
]},
{symmetryBool: true, color: 0, globalAlpha: 1, type: 'polygon',positions: [

{x: -0.125, y: 0.2},
{x: -0.125, y: 0.3333333333333333},
{x: -0.0625, y: 0.3333333333333333},
{x: -0.0625, y: 0.2},
]},
{symmetryBool: true, color: 0, globalAlpha: 1, type: 'polyline',lineWidth: 0.0268, positions: [

{x: -0.125, y: 0.2},
{x: -0.125, y: 0.13333333333333333},
{x: -0.1875, y: 0.13333333333333333},
{x: -0.1875, y: -0.06666666666666667},
{x: -0.125, y: -0.06666666666666667},
{x: -0.125, y: -0.13333333333333333},
{x: 0, y: -0.13333333333333333},
]},
{symmetryBool: true, color: 0, globalAlpha: 1, type: 'polyline',lineWidth: 0.028, positions: [

{x: -0.5, y: 0.06666666666666667},
{x: -0.3125, y: 0.06666666666666667},
{x: -0.3125, y: 0},
{x: -0.25, y: 0},
{x: -0.25, y: -0.13333333333333333},
{x: -0.25, y: -0.2},
{x: -0.375, y: -0.2},
{x: -0.4375, y: -0.2},
]},
{symmetryBool: true, color: 0, globalAlpha: 1, type: 'polyline',lineWidth: 0.0204, positions: [

{x: -0.25, y: -0.4},
{x: -0.25, y: -0.26666666666666666},
{x: -0.125, y: -0.26666666666666666},
{x: -0.125, y: -0.3333333333333333},
{x: -0.0625, y: -0.3333333333333333},
{x: -0.0625, y: -0.4666666666666667},
]}
]}


var OneUp = function(x, y, color){
  this.x = x;
  this.y = y;
  this.dx = Math.random() * 2 - 1;
  this.dy = Math.random() * 2 - 1;
  this.ddx = Math.random() * 0.05 - 0.025;
  this.ddy = Math.random() * 0.05 - 0.025;
  this.color = color;
  this.update = function(){
    this.color += 10;
    this.x += this.dx;
    this.y += this.dy;
    this.dx += this.ddx;
    this.dy += this.ddy;
    this.render();
  }
  this.render = function(){
    oneUp.xCenter = this.x;
    oneUp.yCenter = this.y;
    oneUp.colorArray[0] = "hsl(" + this.color + ", 100%, " + saturationVal + "%)";
    oneUp.colorArray[1] = spaceColor;
    renderPseudoSprite(oneUp, ctx);
  }
  this.use = function(){
    game.lives++;
  }
}
