function colorToHex(midcolor, highcolor){
  midcolor = Math.round(midcolor/highcolor * 255);
  var string;
  if (midcolor < 16){
    string = '0' + midcolor.toString(16);
  } else {
    string = midcolor.toString(16);
  }
  return string;
}


function rgbToHex(red, green, blue){//converts 3 color values into a color ratio to maximize brightness and that into a hex value to be used with html and css
  var hexR, hexG, hexB;
  var cRay = [red, green, blue];

  var maxI = cRay.indexOf(Math.max.apply(Math, cRay));

  var minI = cRay.indexOf(Math.min.apply(Math, cRay));


  var switcheroo;
  if (maxI == 0){
    if (minI == 1){
      switcheroo = 1;//red high, green low
    }
    if (minI == 2){
      switcheroo = 2;//red high, blue low
    }
  }
  if (maxI == 1){
    if (minI == 0){//green high, red low
      switcheroo = 3;
    }
    if (minI == 2){//green high, blue low
      switcheroo = 4;
    }
  }
  if (maxI == 2){
    if (minI == 0){//blue high, red low
      switcheroo = 5;
    }
    if (minI == 1){//blue high, green low
      switcheroo = 6;
    }
  }

  switch(switcheroo){
    case 1://red high, green low
      hexR = 'FF';
      hexG = '00';
      hexB = colorToHex(blue, red);
      break;
    case 2://red high, blue low
      hexR = 'FF';
      hexG = colorToHex(green, red);
      hexB = '00';
      break;
    case 3://green high, red low
      hexR = '00';
      hexG = 'FF';
      hexB = colorToHex(blue, green);
      break;
    case 4://green high, blue low
      hexR = colorToHex(red, green);
      hexG = 'FF';
      hexB = '00';
      break;
    case 5://blue high, red low
      hexR = '00';
      hexG = colorToHex(green, blue);
      hexB = 'FF';
      break;
    case 6://blue high, green low
      hexR = colorToHex(red, blue);
      hexG = '00';
      hexB = 'FF';
      break;
  }
  var hexString = '#' + hexR + hexG + hexB;
  return hexString;
}
var rojo = 255;
var verde = 0;
var azul = 0;
var colorRay = [];


for (var i = 0; i < 255; i++){
  colorRay[i] = rgbToHex(rojo, verde, azul);
  rojo--;
  verde++;
}
for (var i = 255; i < 510; i++){
  colorRay[i] = rgbToHex(rojo, verde, azul);
  verde--;
  azul++;
}
for (var i = 510; i < 765; i++){
  colorRay[i] = rgbToHex(rojo, verde, azul);
  rojo++;
  azul--;
}


function shadeToHex(color){
  if (color < 16){
    color = "0" + color.toString(16);
  } else{
    color = color.toString(16);
  }
  return color;
}

function colorShader(colorString, newShade){
  var rString, gString, bString;
  var shadeMultiplier = newShade/255;
  rString = colorString.slice(1,3);
  rString = parseInt(rString, 16);
  rString = Math.round(rString * shadeMultiplier);
  rString = shadeToHex(rString);

  gString = colorString.slice(3,5);
  gString = parseInt(gString, 16);
  gString = Math.round(gString * shadeMultiplier);
  gString = shadeToHex(gString);

  bString = colorString.slice(5,7);
  bString = parseInt(bString, 16);
  bString = Math.round(bString * shadeMultiplier);
  bString = shadeToHex(bString);

  var newString = '#' + rString + gString + bString;
  return newString;

}
var hexToRGB = function(hexColor){
  var colors = {red: parseInt(hexColor.slice(1,3), 16),
                green: parseInt(hexColor.slice(3,5), 16),
                blue: parseInt(hexColor.slice(5,7), 16)};
  return colors;
}
