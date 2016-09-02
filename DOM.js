$(document).ready(function(){
  $('#bubbles-canvas').css('opacity', '1');
  setTimeout(function(){
    $('#back-canvas').css('opacity', '1');
  }, 100);
});
$('.contact-cross').click(function(){
  isContactShowing = false;
  $('#contact-form').css('top', '110%');
});
var isContactShowing = false;
$('.links').click(function(event){
  //document.location.href = 'about.html'
  console.log(event.target.innerHTML);
  var linkBool = false;
  var link = '';
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
      console.log(linkBool);
      isContactShowing = !isContactShowing;
      if (isContactShowing){
        $('#contact-form').css('top', '60%');
      } else {
        $('#contact-form').css('top', '110%');
      }
      break;
  }
  if (linkBool){
    //window.name = JSON.stringify(bubbles);
    document.location.href = link;
  }
});
$('.project-title').click(function(event){
  window.name = titleIndex;
  titleIndex--;
  console.log(titleIndex);
  if (titleIndex < 0){
    titleIndex = 0;
  }
  if ( event.target.innerHTML === 'VECTOR DRAWING APP'){
    titleIndex = 4;
  }
  document.location.href = projectsRay[titleIndex].link;
});
var projectsRay = [
              {name: "WOBBLE WINDOW", description: "An interactive see-through circle that has physics applied to it to create a wobbly water balloon effect.", link: 'canvasprojects/wobblewindow/index.html', func: function(){updateWobble()}},
              {name: "PIXEL TRAIL", description: "If the early 90's had particle physics, this is what it would look like. Move the trail by using the arrow keys or WASD", link: "canvasprojects/pixelsmoke/index.html", func: function(){updateSmoke()}},
              {name: "HUE WARS", description: "A space-shooter where you have to match the color of your ship/gun (done by scrolling) to the color of your target in order to kill it. WIP", link: "canvasprojects/huewars/index.html", func: function(){updateStars()}},
              {name: "FUNFETTI", description: "Particle system test using color changing circles, gravity and wall and floor collisions.", link: "canvasprojects/funfetti/index.html", func: function(){updateFetti()}},
              {name: "VECTOR DRAWING APP", description: "A vector drawing program that turns drawings into code, that can be used in an HTML canvas.", link: 'canvasprojects/vectorapp/index.html', func: function(){updateDrawingApp()}}];


var updateFunc = function(){
  activeBack = projectsRay[projectIndex].func;
}

var titleIndex = 0;
if (window.name.length < 5 && window.name != ''){
  titleIndex = parseInt(window.name);
  projectIndex = titleIndex;
  updateFunc();
}
var projectsRay = [
              {name: "WOBBLE WINDOW", description: "An interactive see-through circle that has physics applied to it to create a wobbly water balloon effect.", link: 'canvasprojects/wobblewindow/index.html', func: function(){updateWobble()}},
              {name: "PIXEL TRAIL", description: "If the early 90's had particle physics, this is what it would look like.", link: "canvasprojects/pixelsmoke/index.html", func: function(){updateSmoke()}},
              {name: "HUE WARS", description: "A space-shooter where you have to match the color of your ship/gun to the color of your target in order to kill it. WIP", link: "canvasprojects/huewars/index.html", func: function(){updateStars()}},
              {name: "FUNFETTI", description: "Particle system test using color changing circles, gravity and wall and floor collisions.", link: "canvasprojects/funfetti/index.html", func: function(){updateFetti()}},
              {name: "VECTOR DRAWING APP", description: "A vector drawing program that turns drawings into code, that can be used in an HTML canvas.", link: 'canvasprojects/vectorapp/index.html', func: function(){updateDrawingApp()}}];
if (titleIndex === NaN){
  titleIndex = 0;
}
var projectIndex = titleIndex;
var titleSwitch = true;
$('#ta').css('left', '-125%');
$('#ta').css('display', 'none');
$('#da').css('left', '225%');
$('#da').css('display', 'none');
var updateLink = function(){
  var inToT, outOfT, inToD, outOfD;
  if (titleSwitch === true){
    inToT = '#ta';
    outOfT = '#tb';
    inToD = '#da';
    outOfD = '#db';
  } else {
    inToT = '#tb';
    outOfT = '#ta';
    inToD = '#db';
    outOfD = '#da';
  }
  $(inToT).css('display', 'block');
  $(inToD).css('display', 'block');
  $(inToT).empty();
  $(inToD).empty();
  $(inToT).append("<p href='" + projectsRay[titleIndex].link + "' <h2>" + projectsRay[titleIndex].name + "</h2></p>");
  //console.log("updateProject: " + titleIndex);
  $(inToD).append("<p>" + projectsRay[titleIndex].description + "</p>");
  $(outOfT).css('left', '150%');
  $(outOfD).css('left', '-150%');
  setTimeout(function(){
    $(outOfT).css('display', 'none');
    $(outOfD).css('display', 'none');
    $(outOfT).css('left', '-150%');
    $(outOfD).css('left', '225%');
  }, 750);
  setTimeout(function(){
    $(inToT).css('left', '25%');
    $(inToD).css('left', '50%');
  }, 10)
  titleSwitch = !titleSwitch;
  setActiveCarousel();
  projectIndex = titleIndex;
  titleIndex++;
  if (titleIndex === projectsRay.length){
    titleIndex = 0;
  }
}
var setActiveCarousel = function(){
  $('#carousel-selector').children().css('width', '7px');
  $('#carousel-selector').children().css('height', '7px');
  $('#carousel-selector').children().eq(titleIndex).css('width', '10px');
  $('#carousel-selector').children().eq(titleIndex).css('height', '10px');
}

var updateProject = function(){
  updateColor();
  updateLink();
}
var nextPossibleSwitch = false;
$('#carousel-selector').on('click', function(event){
  var index = titleIndex -1;
  if (index < 0){
    index = projectsRay.length -1;
  }
  if (index != parseInt(event.target.id) && event.target.id != 'carousel-selector'){
    titleIndex = parseInt(event.target.id);
    nextPossibleSwitch = true;
    setActiveCarousel();
    console.log('id: ' + event.target.id);
  }
});
/*
$(document).on('click', function(){
  //commented out for testing
  updateProject();
  tweenCount = 0;
  windowState = 'shrink';
});
*/
$(document).on('swipeleft', function(){
  updateProject();
  tweenCount = 0;
  windowState = 'shrink';
});

$(document).on('tap', function(){
  console.log('bruh');
})

$('#Mmenu').on('click', function(){
  console.log('this is it what');
  $('#Mmenu').css('display', 'none');
  $('#Mnav').css({transform: 'translateX(-100%)'});

});
$('.cross').on('click', function(){
  $('#Mmenu').css('display', 'block');
  $('#Mnav').css({transform: 'translateX(100%)'});
})
