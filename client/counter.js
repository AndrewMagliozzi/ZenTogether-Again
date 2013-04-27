var clock;
// consider this for a cool clock animation: https://code.google.com/p/jquery-countdown/source/checkout

if (Meteor.isClient) {

  $(document).ready(function() {

    var timeLeft = function() {
      if (clock > 0){
        clock--;
        Session.set('count', clock);
        console.log(clock);
      } else {
        $('audio')[0].play();
        console.log("that's all folks");
        Meteor.clearInterval(Meteor.clearID);
      }
    };

    var interval = function(){
      Meteor.clearID = Meteor.setInterval(timeLeft, 950);
    };

    Template.timer.count = function () {
      return Session.get('count');
    };

    var stopTimer = function(){
      var $el = $('.counter');
      Meteor.clearInterval(Meteor.clearID);
      var n = parseInt($el.text(), 10);
      if( !$el.data('animating') && !isNaN(n) ){
        $el.data('animating', true);
        $el.fadeTo('slow', 0, function (){
          $el.html('<h3>Please, start the timer and remain still to find peace.</h3>').fadeTo('slow', 1);
          $el.data('animating', false);
        });
      }
    };

    Template.timer.events({
      'click .button' : function (e) {
        clock = parseInt($(e.target).data().time);
        console.log(clock);
        interval();
      }
    });

    $(document).on('keypress', stopTimer);

    $(document).on('mousemove', stopTimer);

  });


}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
