
Template.headTrackr.rendered = function (){

  var arr = [];
  var toggleArrow = function(){
    $('.arrow').fadeToggle('slow', toggleArrow);
  };

  document.addEventListener('headtrackrStatus', 
    function (event) {
      if (event.status === 'getUserMedia') {
        welcome('Welcome to ZenTogether. <br/>Please allow use of your camera and find stillness.');
        $('<img class="svg arrow" src="./images/arrow.svg" />').appendTo('body')
          .fadeIn('slow', toggleArrow);
      }
      if (event.status === 'no camera') {
        welcome('Welcome to ZenTogether. <br/>Please, do nothing for:');
      }
      if (event.status === "camera found") {
        welcome('Select a duration below, <br/>and enjoy a moment of peace.');
        $('.arrow').remove();
      }
    }
  );

  var welcome = function(message){
    var $el = $('.counter');
    $el.html('<h3>' + message + '</h3>').fadeIn();
  };

  var videoInput = document.getElementById('inputVideo');
  var canvasInput = document.getElementById('inputCanvas');

  htracker = new headtrackr.Tracker({detectionInterval : 300});
  htracker.init(videoInput, canvasInput);
  htracker.start();

   // create a new tracker
   var ft = new headtrackr.facetrackr.Tracker();
   // initialize it with a canvas
   ft.init(canvasInput);
   // track in canvas
   ft.track();
   // get position of found object
   var currentPos = ft.getTrackingObject();
 
  document.addEventListener('headtrackrStatus', function(event){
    console.log('head status', event.status);
    // if event.status === 'found' then the face is found
  });

  document.addEventListener('facetrackingEvent', function(event){
    var difficulty = parseInt($('.difficulty').val());
    if (Meteor.counting === true) {
      var lastVal = arr[arr.length - 1];
      var temp = event.x;

      if (arr.length === 0 || temp > lastVal + 4 || temp < lastVal - 4) {
        arr.push(temp);
      } else if (arr.length > 1) {
        arr.pop();
      }
      if (arr.length > (difficulty / 2) && arr.length < difficulty) {
        welcome('"Stillness reveals the secrets of eternity.” ~ Lao Tzu<br>')
      }
      if (arr.length > 1 && temp <= lastVal + 1 && temp >= lastVal - 1) {
        arr[arr.length - 1] = temp;
      }
      if (arr.length === difficulty) {
        Meteor.stopTimer();
        arr = [];
      }
    }

  })

}