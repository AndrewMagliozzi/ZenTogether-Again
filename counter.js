minutesOfPeace = new Meteor.Collection('minutesOfPeace'); // collection of total meditation time

var clock;
var time;

if (Meteor.isClient) {

  $(document).ready(function() {

// the primary mechanism for our meditation timer
    var timeLeft = function() {
      if ($('.waveButton').is(':checked')){
        $('.waves')[0].play();
      } 
      if (clock > 0){
        clock--;
        clock % 60 > 9 ? time = Math.floor(clock / 60) + ':' + (clock % 60) : time = Math.floor(clock / 60) + ':0' + (clock % 60)
        Session.set('count', time);
        Meteor.counting = true;
      } else {
        $('.waves')[0].pause();
        $('.bell')[0].play();
        Meteor.clearInterval(Meteor.clearID);
        Meteor.counting = false;
        $('.counter').fadeTo('slow', 0, function(){
          $('.counter').html('<h3 style="margin-bottom:25px; margin-top:-10px">Congratulations.</h3><br>').fadeTo('slow', 1);
        });
        var record = minutesOfPeace.findOne();
        if (!record){
          minutesOfPeace.insert({name: 'totalTime', minutes: Session.get('targetTime') });
        } else {
          minutesOfPeace.update({_id: record._id}, { $inc: { minutes: Session.get('targetTime') }});
        }
      }
    };

// the function that calls our meditation timer once per second until it reaches zero and the interval is cleared
    var interval = function(){
      Meteor.clearID = Meteor.setInterval(timeLeft, 1000);
    };

// renders the time to our template
    Template.timer.count = function () {
      return Session.get('count');
    };

// this is the function that stops our timer... it gets called by certain mouse, keyboard, and movement events
    Meteor.stopTimer = function(){
      var $el = $('.counter');
      Meteor.clearInterval(Meteor.clearID);
      var n = parseInt($el.text(), 10);
      $('.waves')[0].pause();
      if( !$el.data('animating') && Meteor.counting){
        Meteor.counting = false;
        $el.data('animating', true);
        $el.fadeTo('slow', 0, function (){
          $el.html('<h3>Please, restart the timer and remain still to find peace.</h3><br>').fadeTo('slow', 1);
          $el.data('animating', false);
        });
      }
    };

// renders the total meditation time to our template
    Template.totalPeace.minutesOfPeace = function(){
      return minutesOfPeace.findOne();
    }

// click listener that pulls the time value from our buttons
    Template.timer.events({
      'click .button' : function (e) {
        clock = parseInt($(e.target).data().time);
        Session.set('targetTime', Math.floor(clock / 60));
        interval();
      }
    });

// event listeners
    $(document).on('keypress', Meteor.stopTimer);

    $(document).on('mousemove', Meteor.stopTimer);

  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
