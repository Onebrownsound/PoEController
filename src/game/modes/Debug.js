module.exports = {};

var behaviors = require('../Behaviors').functions;

behaviors["Debug.PrintCursorData"] = function () {
	var c = robot.getMousePos();
	console.log(c);
};

behaviors["Debug.DetectPixelSignature"] = function () {
	if (SIGNATURE_CAPTURE_STATE !== null) {

		var groupIndex = SIGNATURE_CAPTURE_STATE.group;
		var modeIndex = SIGNATURE_CAPTURE_STATE.mode;

		var group = SIGNATURE_CAPTURE_ORDER[groupIndex];

		var captureFrame = group.mode[modeIndex];

		var name = FunctionLibrary.indexOf(GAME_MODE, captureFrame);

		console.log("Capturing " + name);

		var coords = GetCaptureCoordinates(captureFrame);

		var sig = CaptureSignatureAt(coords.x, coords.y);

		sig.gameMode = captureFrame;
		sig.name = name;

		LastCapturedSignatures.push(sig);

		SIGNATURE_CAPTURE_STATE.mode++;

		var nextMode = group.mode[SIGNATURE_CAPTURE_STATE.mode];

		if (nextMode) {
			name = FunctionLibrary.indexOf(GAME_MODE, nextMode);
			console.log('open ' + name + ' screen');
		} else /* Go to another group */ {
			SignatureDetection.persist(Window.width + 'x' + Window.height + group.filename, LastCapturedSignatures);

			LastCapturedSignatures = [];
			SIGNATURE_CAPTURE_STATE.mode = 0;
			SIGNATURE_CAPTURE_STATE.group++;

			var nextGroup = SIGNATURE_CAPTURE_ORDER[SIGNATURE_CAPTURE_STATE.group];

			if (!nextGroup) /* finished capturing */ {
				SIGNATURE_CAPTURE_STATE = null;
				console.log('finished capturing');
			} else {
				nextMode = nextGroup.mode[SIGNATURE_CAPTURE_STATE.mode];
				name = FunctionLibrary.indexOf(GAME_MODE, nextMode);
				console.log('open ' + name + ' screen');
			}
		}

	} else /* start capturing */ {
		SIGNATURE_CAPTURE_STATE = {group: 0, mode: 0};

		var captureFrame = SIGNATURE_CAPTURE_ORDER[0].mode[0];
		var name = FunctionLibrary.indexOf(GAME_MODE, captureFrame);

		console.log('open ' + name + ' screen');
	}
};

var Enums = require('../Enums');
var KEYS = Enums.KEYS;
var GAME_MODE = Enums.GAME_MODE;
var robot = require('robotjs');
var Window = require('../Window');
var Input = require('../Input');
var FunctionLibrary = require('../FunctionLibrary');
var SignatureDetection = require('../SignatureDetection');

var InputKeys = {};

var KeysOfExile = {};

KeysOfExile[KEYS.KEY_START] = 'Debug.DetectPixelSignature';

var BehaviorOfExile = {
	'Debug.DetectPixelSignature': [null, "Debug.DetectPixelSignature"],
	'Debug.PrintCursorData': [null, "Debug.PrintCursorData"]
};

var SIGNATURE_CAPTURE_ORDER = [{
		filename: 'signatures.json',
		mode: [
			GAME_MODE.INVENTORY,
			GAME_MODE.PASSIVE_SKILL_TREE,
			GAME_MODE.WORLD_MAP
		]
	},
	{
		filename: 'inventory-signatures.json',
		mode: [
			GAME_MODE.STASH,
			GAME_MODE.SELL,
			GAME_MODE.CRAFT_SCREEN,
			GAME_MODE.REWARD_SCREEN
		]
	}];

var SIGNATURE_CAPTURE_STATE = null;

var supportedAspects = [
	{
		aspect: 16 / 9,
		coords: {}
	}
];

supportedAspects[0].coords[GAME_MODE.INVENTORY] = {x: 0.978125, y: 0.7944444444444444};
supportedAspects[0].coords[GAME_MODE.PASSIVE_SKILL_TREE] = {x: 0.5036458333333333, y: 0.027777777777777776};
supportedAspects[0].coords[GAME_MODE.WORLD_MAP] = {x: 0.1734375, y: 0.024074074074074074};
supportedAspects[0].coords[GAME_MODE.STASH] = {x: 0.029166666666666667, y: 0.7453703703703703};
supportedAspects[0].coords[GAME_MODE.SELL] = {x: 0.31875, y: 0.08796296296296297};
supportedAspects[0].coords[GAME_MODE.CRAFT_SCREEN] = {x: 0.32447916666666665, y: 0.09907407407407408};
supportedAspects[0].coords[GAME_MODE.REWARD_SCREEN] = {x: 0.4484375, y: 0.6259259259259259};

var LastCapturedSignatures = [];

function FindAspectRatio(aspect) {
	var ret = -1;

	for (var i = 0; i < supportedAspects.length && ret === -1; i++) {
		if (supportedAspects[i].aspect === aspect) {
			ret = i;
		}
	}

	return ret;
}

function GetCaptureCoordinates(mode) {
	var aspectRatioIndex = FindAspectRatio(Window.width / Window.height);

	if (aspectRatioIndex === -1) {
		console.warn('aspect ratio ' + (Window.width / Window.height) + ' not mapped. using ' + supportedAspects[0].aspect + ' as default');
		aspectRatioIndex = 0;
	}

	var coords = supportedAspects[aspectRatioIndex].coords[mode];

	coords.x *= Math.round(Window.width);
	coords.y *= Math.round(Window.height);

	return coords;
}

function CaptureSignatureAt(x, y) {
	var sigWidth = parseInt(Window.width * 0.04);
	var sigMax = parseInt(x + sigWidth / 2);
	var sigMin = parseInt(x - sigWidth / 2);

	var sig = {};

	sig.y = y;
	sig.x = [];

	var sigPart = parseInt(sigWidth / 10);

	for (var i = sigMin; i < sigMax; i = i + sigPart) {
		var c = robot.getPixelColor(i, y);
		var sigComponent = {};
		sigComponent.x = i;
		sigComponent.color = parseInt(c, 16);
		sig.x.push(sigComponent);
	}

	return sig;
}

function ResolveInput(data) {

	var buttons = data[10];

	for (var i = 128; i >= 1; i = i / 2) {
		var pressed = buttons - i >= 0;
		Input.activateKey(KeysOfExile, InputKeys, BehaviorOfExile, i, pressed);
		buttons = buttons >= i ? buttons - i : buttons;
	}

}

module.exports.resolveInput = ResolveInput;
module.exports.id = GAME_MODE.DEBUG;