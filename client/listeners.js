
// Meteor's reactive templating requires we wait for the headTrackr template to render
// before we call any of the functions below.
Template.headTrackr.rendered = function (){

  var arr = [];  // an array that grows and shrinks with the frequency and amplitude of user movement

//reminder period selected by the user
var duration = $('.reminderDuration').val() * 1000 * 60;

// logic to remind users to meditate periodically
  if ( $('.reminder').is(':checked') ) {
    setInterval(function(){ 
      alert("You deserve a break.  How about a moment of zen?");
    }, duration );
  };

  var toggleArrow = function(){ // the arrow that beckons the user to permit use of their camera
    $('.arrow').fadeToggle('slow', toggleArrow);
  };

// a series of messages to appear in the main div 
  document.addEventListener('headtrackrStatus', 
    function (event) {
      if (event.status === 'getUserMedia') {
        welcome('Welcome to ZenTogether. <br/>Please allow use of your camera and find stillness.');
        $('<img class="svg arrow" src="./images/arrow.svg" />').appendTo('body')
          .animate({ top: 0 }, 2000)
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

// writes a generic welcome message to the main div
  var welcome = function(message){
    var $el = $('.counter');
    $el.html('<h3>' + message + '</h3>').fadeIn();
  };

// initiating the head tracker
  var headTrackrInit = function () {
    var videoInput = document.getElementById('inputVideo');
    var canvasInput = document.getElementById('inputCanvas');

    htracker = new headtrackr.Tracker({detectionInterval : 300});
    htracker.init(videoInput, canvasInput);
    htracker.start();

    var ft = new headtrackr.facetrackr.Tracker();
    ft.init(canvasInput);
    ft.track();
    var currentPos = ft.getTrackingObject();
  };

  headTrackrInit(); // calling the function above
 
// a series of procedures to measure the frequency and amplitude of user movement
  document.addEventListener('facetrackingEvent', function(event){
    var difficulty = parseInt($('.difficulty').val()); // a variable defined by the user
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

  });

}