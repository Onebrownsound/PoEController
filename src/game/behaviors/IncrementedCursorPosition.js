var Enums = require('../Enums');
var Window = require('../Window');
var Movement = require('./Movement');
var KeyHandler = require('./KeyHandler');
var robot = require('robotjs');
		
var LastIncrementActionTimeout = null;

function MouseWithIncrementKeyDown(R, key) {
	if (LastIncrementActionTimeout === null) {
		var angle = Movement.getLastAngle();
		Movement.move('', R, angle, false);

		LastIncrementActionTimeout = setTimeout(function () {
			KeyHandler.handle(key, "down");
			LastIncrementActionTimeout = null;
		}, Enums.GLOBAL_INTERVAL * 1.5);
	}
}

function MouseWithIncrementKeyUp(key) {
	KeyHandler.handle(key, "up");
	Movement.setLastRadius(null);
}

module.exports = {
	mouseWithIncrementKeyDown: MouseWithIncrementKeyDown,
	mouseWithIncrementKeyUp: MouseWithIncrementKeyUp
};