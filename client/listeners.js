// if (Meteor.isClient) {


	document.addEventListener('headtrackrStatus', 
	  function (event) {
	    if (event.status === "getUserMedia") {
	      alert("getUserMedia is supported!");
	    }
	  }
	);


		var cstracker = new headtrackr.camshift.Tracker();
		// initialize it with a canvas, and a rectangle around the object on the canvas we'd like to track
		cstracker.initTracker('inputCanvas', new headtrackr.camshift.Rectangle(x,y,w,h));
		// find object in same or some other canvas
		cstracker.track('inputCanvas');
		// get position of found object
		var currentPos = cstracker.getTrackObj();
		currentPos.x // x-coordinate of center of object on canvas 
		currentPos.y // y-coordinate of center of object on canvas 
		currentPos.width // width of object
		currentPos.height // heigh of object
		currentPos.angle // angle of object in radians

		console.log(currentPos.x);


 // Library for detecting and tracking the position of a face in a canvas object

 // usage:
	 // create a new tracker
	 var ft = new headtrackr.facetrackr.Tracker();
	 // initialize it with a canvas
	 ft.init('#inputCanvas');
	 // track in canvas
	 ft.track();
	 // get position of found object
	 var currentPos = ft.getTrackObj();
	 currentPos.x // x-coordinate of center of object on canvas 
	 currentPos.y // y-coordinate of center of object on canvas 
	 currentPos.width // width of object
	 currentPos.height // height of object
	 currentPos.angle // angle of object in radians
	 currentPos.confidence // returns confidence (doesn't work for CS yet)
	 currentPos.detection // current detectionmethod (VJ or CS)
	 currentPos.time // time spent
 
 // @author auduno / github.com/auduno
 



 /**
 * Calculates an estimate of the position of the head of the user in relation to screen or camera
 *   based on input from facetrackrObject
 *
 * Usage:
 *	var hp = new headtrackr.headposition.Tracker(facetrackrObject, 640, 480);
 *	var currentPosition = hp.track(facetrackrObject);
 *
 * @author auduno / github.com/auduno
 */

// headtrackr.headposition = {};

/**
 *
 * Parameters to Tracker() are:
 *	facetrackrObject : a generic object with attributes x, y, width, height, angle
 *		which describe the position of center of detected face
 *	camwidth : width of canvas where the face was detected
 *	camheight : height of canvas where the face was detected
 *
 * Optional parameters can be passed along like this:
 *	 headtrackr.headposition.Tracker(facetrackrObject, 640, 480, {fov : 60})
 *
 * Optional parameters:
 *	 fov {number} : horizontal field of view of camera (default is to detect via distance to screen, any fov overrides distance_to_screen)
 *	 distance_to_screen {number} : initial distance from face to camera, in cms (default is 60 cm)
 *	 edgecorrection {boolean} : whether to use heuristic for position of head when detection is on the edge of the screen (default is true)
 *	 distance_from_camera_to_screen : distance from camera to center of screen (default is 11.5 cm, typical for laptops)
 *
 * Returns a generic object with attributes x, y, z which is estimated headposition in cm in relation to center of screen
 *
 * @constructor
 */

// }