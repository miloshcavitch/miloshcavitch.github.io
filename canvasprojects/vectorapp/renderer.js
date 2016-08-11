//to render your shape, include this script, set the xCenter, yCenter, rotation and width/height values and use renderPseudoSprite(yourshape, thecontextyoureusing)
//at a point in your code you want the render to happen

var renderPseudoSprite = function(object, context){
  context.translate(object.xCenter, object.yCenter);
  context.rotate( object.rotation * Math.PI/180);
  object.shapes.forEach(function(shape){
    switch (shape.type){
      case 'curvedline':
        renderCurvedLine(object, context, shape);
        //debugRender(object, context, shape);
        break;
      case 'polygon':
      case 'polyline':
        renderPolygon(object, context, shape);
        break;
      case 'circle':
        renderCircle(object, context, shape);
        break;
      case 'curvedshape':
        renderCurvedShape(object, context, shape);
        //renderPolygon(object, context, shape);
        //debugRender(object,context,shape);
        break;
    }
  });
  context.rotate( (object.rotation * -1) * Math.PI/180);
  context.translate( (object.xCenter * -1), (object.yCenter * -1) );
}
var renderPolygon = function(object, context, shape){
  context.beginPath();
  context.moveTo( (shape.positions[0].x * object.width), (shape.positions[0].y * object.height));
  shape.positions.forEach(function(p){
    context.lineTo( (p.x * object.width), (p.y * object.height) );
  });
  context.globalAlpha = shape.globalAlpha;
  switch (shape.type){
    case 'polyline':
      context.strokeStyle = object.colorArray[shape.color];
      context.lineWidth = shape.lineWidth * object.width;
      context.stroke();
      break;
    case 'polygon':
      context.fillStyle = object.colorArray[shape.color];
      context.fill();
      if (shape.globalAlpha >= 0.9){
        context.lineWidth = 1;
        context.strokeStyle = object.colorArray[shape.color];
        context.stroke();
      }
      break;
  }
  context.closePath();
  if (shape.symmetryBool === true){
    symmetryRenderPoly(object, context, shape);
  }
}
var renderCircle = function(object, context, shape){
  context.beginPath();
  context.arc( (shape.positions[0].x * object.width), (object.height * shape.positions[0].y), (shape.radius * object.width), 0, Math.PI * 2);
  context.globalAlpha = shape.globalAlpha;
  if (shape.line === true){
    context.lineWidth = shape.lineWidth;
    context.strokeStyle = object.colorArray[shape.color];
    context.stroke();
  } else {
    context.fillStyle = object.colorArray[shape.color];
    context.fill()
  }
  context.closePath();
  if (shape.symmetryBool === true){
    var flippedX = Math.abs(shape.positions[0].x - object.symmetryLine);
    if (shape.positions[0].x > object.symmetryLine){
      flippedX = flippedX * -1;
    }
    context.beginPath();
    context.arc( (flippedX * object.width), (shape.positions[0].y * object.height), (shape.radius * object.width), 0, Math.PI * 2)
    if (shape.line === true){
      context.stroke();
    } else {
      context.fill();
    }
    context.closePath();
  }
}
var renderPolyline = function(object, context, shape){
  context.beginPath();
  context.moveTo( (shape.positions[0].x * object.width),   (shape.positions[0].y * object.height));
  shape.positions.forEach(function(p){
    context.lineTo(  (p.x * object.width),   (p.y * object.height));
  });
  context.lineWidth = shape.lineWidth * object.width;
  context.globalAlpha = shape.globalAlpha;
  context.strokeStyle = object.colorArray[shape.color];
  context.stroke();
  context.closePath();
  if (shape.symmetryBool == true){
    symmetryRenderPoly(object, context, shape);
  }
}
var renderCurvedShape = function(object, context, shape){
  context.beginPath();
  context.moveTo(  (shape.positions[0].x * object.width) ,   (shape.positions[0].y * object.height) );
  for (var i = 1; i < shape.positions.length; i+=3){
    var lastpoint = {x: undefined, y: undefined};
    if (i+3 > shape.positions.length){
      lastpoint.x = shape.positions[0].x;
      lastpoint.y = shape.positions[0].y;
    } else{
      lastpoint.x = shape.positions[i+2].x;
      lastpoint.y = shape.positions[i+2].y;
    }
    context.bezierCurveTo(  (shape.positions[i].x * object.width),   (shape.positions[i].y * object.height),   (shape.positions[i+1].x * object.width),   (shape.positions[i+1].y * object.height),   (lastpoint.x * object.width),   (lastpoint.y * object.height) );
  }

  context.fillStyle = object.colorArray[shape.color];
  context.globalAlpha = shape.globalAlpha;
  context.fill();
  if (shape.globalAlpha >= 0.9){
    context.lineWidth = 1;
    context.strokeStyle = object.colorArray[shape.color];
    context.stroke();
  }
  context.closePath();
  if (shape.symmetryBool === true){
    symmetryRenderCurvedShape(object, context, shape);
  }
}

var renderCurvedLine = function(object, context, shape){
  context.beginPath();
  context.moveTo( (shape.positions[0].x * object.width), (shape.positions[0].y * object.height) );
  for ( var i = 1; i < shape.positions.length; i+=3){
    context.bezierCurveTo( (shape.positions[i].x * object.width), (shape.positions[i].y * object.height), (shape.positions[i+1].x * object.width), (shape.positions[i+1].y * object.height), (shape.positions[i+2].x * object.width), (shape.positions[i+2].y * object.height))
  }
  context.strokeStyle = object.colorArray[shape.color];
  context.globalAlpha = shape.globalAlpha;
  context.lineWidth = shape.lineWidth * object.width;
  context.stroke();
  context.closePath();
  if (shape.symmetryBool === true){
    symmetryRenderCurvedLine(object, context, shape);
  }

}
var symmetryRenderCurvedLine = function(object, context, shape){
  context.beginPath();
  var initFlippedX = Math.abs(shape.positions[0].x - object.symmetryLine);
  if (shape.positions[0].x > object.symmetryLine){
    initFlippedX = initFlippedX * -1;
  }
  context.moveTo( (initFlippedX * object.width), (shape.positions[0].y * object.height) );
  for ( var i = 1; i < shape.positions.length; i+=3){
    var flippedXOne = Math.abs(shape.positions[i].x - object.symmetryLine);
    if (shape.positions[i].x > object.symmetryLine){
      flippedXOne *= -1;
    }
    var flippedXTwo = Math.abs(shape.positions[i+1].x - object.symmetryLine);
    if (shape.positions[i+1].x > object.symmetryLine){
      flippedXTwo *= -1;
    }
    var flippedXThree = Math.abs(shape.positions[i+2].x - object.symmetryLine);
    if (shape.positions[i+2].x > object.symmetryLine){
      flippedXThree *= -1;
    }
    context.bezierCurveTo( (flippedXOne * object.width), (shape.positions[i].y * object.height), (flippedXTwo * object.width), (shape.positions[i+1].y * object.height), (flippedXThree * object.width), (shape.positions[i+2].y * object.height))
  }
  context.stroke();
  context.closePath();
}
var symmetryRenderPoly = function(object, context, shape){
  context.beginPath();
  var initFlippedX = Math.abs(shape.positions[0].x - object.symmetryLine);
  if (shape.positions[0].x > object.symmetryLine){
    initFlippedX = initFlippedX * -1;
  }
  context.moveTo(  (initFlippedX * object.width),   (shape.positions[0].y * object.height))
  shape.positions.forEach(function(p){
    var flippedX = Math.abs(p.x - object.symmetryLine);
    if (p.x > object.symmetryLine){
      flippedX = flippedX * -1;
    }
    context.lineTo(  (flippedX * object.width),   (p.y * object.height) );
  });
  switch (shape.type){
    //no need to set alpha or linewidth etc. already set
    case 'polyline':
      context.stroke();
      break;
    case 'polygon':
      context.fill();
      if (shape.globalAlpha >= 0.9){
        context.lineTo(  (initFlippedX * object.width),   (shape.positions[0].y * object.height));
        context.stroke();
      }
      break;
  }
  context.closePath();
}
var symmetryRenderCurvedShape = function(object, context, shape){
  context.beginPath();
  var initFlippedX = Math.abs(shape.positions[0].x - object.symmetryLine);
  if (shape.positions[0].x > object.symmetryLine){
    initFlippedX = initFlippedX * -1;
  }
  context.moveTo(  (initFlippedX * object.width) ,   (shape.positions[0].y * object.height) );
  for (var i = 1; i < shape.positions.length; i+=3){
    var lastpoint = {x: undefined, y: undefined};
    if (i+3 > shape.positions.length){
      lastpoint.x = Math.abs(shape.positions[0].x - object.symmetryLine);
      if (shape.positions[0].x > object.symmetryLine){
        lastpoint.x = lastpoint.x * -1;
      }
      lastpoint.y = shape.positions[0].y;
    } else{
      lastpoint.x = Math.abs(shape.positions[i+2].x - object.symmetryLine);
      if (shape.positions[i+2].x > object.symmetryLine){
        lastpoint.x = lastpoint.x * -1;
      }
      lastpoint.y = shape.positions[i+2].y;
    }
    var oneX = Math.abs(shape.positions[i].x - object.symmetryLine);
    if (shape.positions[i].x > object.symmetryLine){
      oneX = oneX * -1;
    }
    var twoX = Math.abs(shape.positions[i+1].x - object.symmetryLine);
    if (shape.positions[i+1].x > object.symmetryLine){
      twoX = twoX * -1;
    }
    context.bezierCurveTo(  (oneX * object.width),   (shape.positions[i].y * object.height),   (twoX * object.width),   (shape.positions[i+1].y * object.height),   (lastpoint.x * object.width),   (lastpoint.y * object.height) );
  }
  context.fill();
  if (shape.globalAlpha >= 0.9){
    context.stroke();
  }
  context.closePath();
}
var debugRender = function(object, context, shape){
  shape.positions.forEach(function(p){
    context.beginPath();
    context.arc(  (p.x * object.width),   (p.y * object.height), 10, 0, Math.PI * 2);
    context.globalAlpha = 0.5;
    context.fillStyle = 'black';
    context.fill();
    context.closePath();
  });
}
var debugPoint = function(x, y){
  ctx.beginPath();
  ctx.arc(x,y,10,0,Math.PI * 2);
  ctx.globalAlpha = 0.5;
  ctx.fillStyle = 'red';
  ctx.fill();
  ctx.closePath();
  console.log(x + ", " + y);
}
