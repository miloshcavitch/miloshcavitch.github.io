//init
for (var i = 0; i < projectsRay.length; i++){
  $('#carousel-selector').append("<div class='circle' id='" + i + "'></div>");
}

updateProject();
repopulateWindowCircles();
var update = function(){
  testWindowSize();
  updateBackCanvas();
  updateTopCanvas();
}

setInterval(update, 25);
