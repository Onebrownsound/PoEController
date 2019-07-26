var Window = require('../Window');
var robot = require('robotjs');

var lastAngle = 0;
var lastMoveRadius = null;
var defaultLootRadius = 40;
var defaultMoveRadius = Window.height * 0.1550;

function move(cb, radius = null, angle = 0, is_loot_pickup = false) {
	// The `aspectFix` exists to modify the `x_offset` component of the movement.
	// Monitors vary in aspect ratio, and as such the game allows for "larger movements" in the `X` coordinate direction.
	var aspectFix = Window.aspect;
	
	 if (radius === null && lastMoveRadius === null) {
		radius = defaultMoveRadius;
	} else if ( radius === null) {
		radius = lastMoveRadius;
	}

	// Cache the various last params.
	lastAngle = angle;
	lastMoveRadius = radius;

	if (is_loot_pickup == true){
		// Hard coded loot pickup radius.
		// Allows for easier/quicker time of snagging up loot
		// Loot pickup overrides the aspect fix to create a "perfect" circle.
		radius = defaultLootRadius;;
		aspectFix = 1;
	}
	
	x_offset = radius * Math.cos(angle) * aspectFix;
	y_offset = radius * Math.sin(angle);
	robot.moveMouse(Window.basePosition.x + x_offset, Window.basePosition.y + y_offset);

	// If an accompanying callback was provided execute it.
	// This could be a custom behavior such as hold a modifier to attack in place.
	if(typeof cb === "function") {
		cb();
	}
}

function stop(cb) {
	robot.mouseToggle("up");
	if(typeof cb === "function") {
		cb();
	}
}

module.exports = {
	getLastAngle: function () {
		return lastAngle;
	},
	setLastRadius: function (r) {
		lastMoveRadius = r;
	},
	getRadius: function () {
		return lastMoveRadius;
	},
	move: move,
	stop: stop
};