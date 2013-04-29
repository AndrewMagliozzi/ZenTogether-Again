minutesOfPeace = new Meteor.Collection('minutesOfPeace');
var clock;
var time;

if (Meteor.isClient) {

  $(document).ready(function() {

    var timeLeft = function() {
      if (clock > 0){
        clock--;
        clock % 60 > 9 ? time = Math.floor(clock / 60) + ':' + (clock % 60) : time = Math.floor(clock / 60) + ':0' + (clock % 60)
        Session.set('count', time);
        Meteor.counting = true;
      } else {
        $('audio')[0].play();
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

    var interval = function(){
      Meteor.clearID = Meteor.setInterval(timeLeft, 1000);
    };

    Template.timer.count = function () {
      return Session.get('count');
    };

    Meteor.stopTimer = function(){
      var $el = $('.counter');
      Meteor.clearInterval(Meteor.clearID);
      var n = parseInt($el.text(), 10);
      if( !$el.data('animating') && Meteor.counting){
        Meteor.counting = false;
        $el.data('animating', true);
        $el.fadeTo('slow', 0, function (){
          $el.html('<h3>Please, restart the timer and remain still to find peace.</h3><br>').fadeTo('slow', 1);
          $el.data('animating', false);
        });
      }
    };

    Template.totalPeace.minutesOfPeace = function(){
      return minutesOfPeace.findOne();
    }

    Template.timer.events({
      'click .button' : function (e) {
        clock = parseInt($(e.target).data().time);
        Session.set('targetTime', Math.floor(clock / 60));
        interval();
      }
    });

    $(document).on('keypress', Meteor.stopTimer);

    $(document).on('mousemove', Meteor.stopTimer);

  });


}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
