var behaviors = {};

module.exports = {};

module.exports.functions = behaviors;

module.exports.exported = {
	"Simple": [
		{
			name: "Just press",
			key: "arpg.nothing",
			help: "Just press the key. Use the last mouse cursor position for some abilities. Good for generic ranged attacks."
		},
		{
			name: "Center mouse and press",
			key: "ARPG.MouseNeutral",
			help: "Move the mouse to the center position and press the key. Good for melee attacks (use game client's aim bot)."
		}
	],
	"Increment": [
		{
			name: "Small increment to cursor position",
			key: "arpg.MouseLastAngleLow.KeyDown",
			help: "Use a small increment to the cursor position last angle before pressing the button. Good for totems and traps"
		},
		{
			name: "Medium increment to cursor position",
			key: "arpg.MouseLastAngleMid.KeyDown",
			help: "Use a medium increment to the cursor position last angle before pressing the button. Good for totems, traps and skills like leap slam"
		},
		{
			name: "High increment to cursor position",
			key: "arpg.MouseLastAngleHigh.KeyDown",
			help: "Use a high increment to the cursor position last angle before pressing the button. Good for totems, traps and skills like leap slam"
		}
	],
	"Holding position": [
		{
			name: "(H. Position) Small increment to cursor position",
			key: "arpg.ShiftMouseLastAngleLow.KeyDown",
			help: "Use a small increment to the cursor position last angle before pressing the button and while holding attack in place. Good for ranged attacks and spells"
		},
		{
			name: "(H. Position) Small medium increment to cursor position",
			key: "arpg.ShiftMouseLastAngleSmallMid.KeyDown",
			help: "Use a small medium increment to the cursor position last angle before pressing the button and while holding attack in place. Good for ranged attacks and spells"
		},
		{
			name: "(H. Position) Medium increment to cursor position",
			key: "arpg.ShiftMouseLastAngleMid.KeyDown",
			help: "Use a medium increment to the cursor position last angle before pressing the button and while holding attack in place. Good for ranged attacks and spells"
		},
		{
			name: "(H. Position) MediumHigh increment to cursor position",
			key: "arpg.ShiftMouseLastAngleMidHigh.KeyDown",
			help: "Use a medium high increment to the cursor position last angle before pressing the button and while holding attack in place. Good for ranged attacks and spells"
		},
		{
			name: "(H. Position) High increment to cursor position",
			key: "arpg.ShiftMouseLastAngleHigh.KeyDown",
			help: "Use a high increment to the cursor position last angle before pressing the button and while holding attack in place. Good for ranged attacks and spells"
		},
		{
			name: "(VH. Position) VeryHigh increment to cursor position",
			key: "arpg.ShiftMouseLastAngleVeryHigh.KeyDown",
			help: "Use a very high increment to the cursor position last angle before pressing the button and while holding attack in place. Good for ranged attacks and spells"
		}
	]
};

var robot = require('robotjs');
var AttackInPlace = require('./behaviors/AttackInPlace');
var KeyHandler = require('./behaviors/KeyHandler');
var Window = require('./Window');
var IncrementedCursorPosition = require('./behaviors/IncrementedCursorPosition');

behaviors['arpg.nothing'] = function (args, key) {
	KeyHandler.handle(key, "down");
};

behaviors['ARPG.MouseNeutral'] = function (args, key) {
	robot.moveMouse(Window.basePosition.x, Window.basePosition.y);
	KeyHandler.handle(key, "down");
};

behaviors['arpg.ShiftMouseLastAngleLow.KeyDown'] = function (args, key) {
	AttackInPlace.setAttackInPlace();
	behaviors['arpg.MouseLastAngleLow.KeyDown'](args, key);
};

behaviors['arpg.ShiftMouseLastAngleLow.KeyUp'] = function (args, key) {
	AttackInPlace.clearAttackInPlace();
	behaviors['arpg.MouseLastAngleLow.KeyUp'](args, key);
};

behaviors['arpg.ShiftMouseLastAngleSmallMid.KeyDown'] = function (args, key) {
	AttackInPlace.setAttackInPlace();
	behaviors['arpg.MouseLastAngleSmallMid.KeyDown'](args, key);
};

behaviors['arpg.ShiftMouseLastAngleSmallMid.KeyUp'] = function (args, key) {
	AttackInPlace.clearAttackInPlace();
	behaviors['arpg.MouseLastAngleSmallMid.KeyUp'](args, key);
};

behaviors['arpg.ShiftMouseLastAngleMid.KeyDown'] = function (args, key) {
	AttackInPlace.setAttackInPlace();
	behaviors['arpg.MouseLastAngleMid.KeyDown'](args, key);
};

behaviors['arpg.ShiftMouseLastAngleMid.KeyUp'] = function (args, key) {
	AttackInPlace.clearAttackInPlace();
	behaviors['arpg.MouseLastAngleMid.KeyUp'](args, key);
};

behaviors['arpg.ShiftMouseLastAngleMidHigh.KeyDown'] = function (args, key) {
	AttackInPlace.setAttackInPlace();
	behaviors['arpg.MouseLastAngleMidHigh.KeyDown'](args, key);
};

behaviors['arpg.ShiftMouseLastAngleMidHigh.KeyUp'] = function (args, key) {
	AttackInPlace.clearAttackInPlace();
	behaviors['arpg.MouseLastAngleMidHigh.KeyUp'](args, key);
};

behaviors['arpg.ShiftMouseLastAngleHigh.KeyDown'] = function (args, key) {
	AttackInPlace.setAttackInPlace();
	behaviors['arpg.MouseLastAngleHigh.KeyDown'](args, key);
};

behaviors['arpg.ShiftMouseLastAngleHigh.KeyUp'] = function (args, key) {
	AttackInPlace.clearAttackInPlace();
	behaviors['arpg.MouseLastAngleHigh.KeyUp'](args, key);
};

behaviors['arpg.ShiftMouseLastAngleVeryHigh.KeyDown'] = function (args, key) {
	AttackInPlace.setAttackInPlace();
	behaviors['arpg.MouseLastAngleVeryHigh.KeyDown'](args, key);
};

behaviors['arpg.ShiftMouseLastAngleVeryHigh.KeyUp'] = function (args, key) {
	AttackInPlace.clearAttackInPlace();
	behaviors['arpg.MouseLastAngleVeryHigh.KeyUp'](args, key);
};

behaviors['arpg.MouseLastAngleLow.KeyDown'] = function (args, key) {
	IncrementedCursorPosition.mouseWithIncrementKeyDown(Window.height * 0.0825, key);
};

behaviors['arpg.MouseLastAngleLow.KeyUp'] = function (args, key) {
	IncrementedCursorPosition.mouseWithIncrementKeyUp(key);
};

behaviors['arpg.MouseLastAngleSmallMid.KeyDown'] = function (args, key) {
	IncrementedCursorPosition.mouseWithIncrementKeyDown(Window.height * 0.15375, key);
};

behaviors['arpg.MouseLastAngleSmallMid.KeyUp'] = function (args, key) {
	IncrementedCursorPosition.mouseWithIncrementKeyUp(key);
};

behaviors['arpg.MouseLastAngleMid.KeyDown'] = function (args, key) {
	IncrementedCursorPosition.mouseWithIncrementKeyDown(Window.height * 0.225, key);
};

behaviors['arpg.MouseLastAngleMid.KeyUp'] = function (args, key) {
	IncrementedCursorPosition.mouseWithIncrementKeyUp(key);
};

behaviors['arpg.MouseLastAngleMidHigh.KeyDown'] = function (args, key) {
	IncrementedCursorPosition.mouseWithIncrementKeyDown(Window.height * 0.3, key);
};

behaviors['arpg.MouseLastAngleMidHigh.KeyUp'] = function (args, key) {
	IncrementedCursorPosition.mouseWithIncrementKeyUp(key);
};

behaviors['arpg.MouseLastAngleHigh.KeyDown'] = function (args, key) {
	IncrementedCursorPosition.mouseWithIncrementKeyDown(Window.height * 0.35, key);
};

behaviors['arpg.MouseLastAngleHigh.KeyUp'] = function (args, key) {
	IncrementedCursorPosition.mouseWithIncrementKeyUp(key);
};

behaviors['arpg.MouseLastAngleVeryHigh.KeyDown'] = function (args, key) {
	IncrementedCursorPosition.mouseWithIncrementKeyDown(Window.height * 0.4, key);
};

behaviors['arpg.MouseLastAngleVeryHigh.KeyUp'] = function (args, key) {
	IncrementedCursorPosition.mouseWithIncrementKeyUp(key);
};