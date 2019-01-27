var Window = require('../Window');
var robot = require('robotjs');

var globalMoveAngle = 0;
var globalMoveRadius = null;

function move(cb, is_loot_pickup = false) {
	var R;
	var aspectFix;

	if (globalMoveRadius === null && is_loot_pickup == false) {
		R = Window.height * 0.1250;
		aspectFix = 1;
	} else {
		R = globalMoveRadius;
		aspectFix = Window.aspect;
	}

	if (is_loot_pickup == true){
		// Hard coded loot pickup radius.
		// Allows for easier/quicker time of snagging up loot
		R = 15;
	}
	
	robot.moveMouse(Window.basePosition.x + R * Math.cos(globalMoveAngle) * aspectFix, Window.basePosition.y + R * Math.sin(globalMoveAngle));
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
	setAngle: function (a) {
		globalMoveAngle = a;
	},
	getAngle: function () {
		return globalMoveAngle;
	},
	setRadius: function (r) {
		globalMoveRadius = r;
	},
	getRadius: function () {
		return globalMoveRadius;
	},
	move: move,
	stop: stop
};