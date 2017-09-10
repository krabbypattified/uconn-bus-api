'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _connector = require('./connector');

var _Bus = require('./Bus');

var _Bus2 = _interopRequireDefault(_Bus);

var _BusStop = require('./BusStop');

var _BusStop2 = _interopRequireDefault(_BusStop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

class Arrival {

	constructor(args) {
		Object.assign(this, args);
	}

	bus() {
		var _this = this;

		return _asyncToGenerator(function* () {
			return new _Bus2.default((yield (0, _connector.getBusById)(_this.busId)));
		})();
	}

	stop() {
		var _this2 = this;

		return _asyncToGenerator(function* () {
			return new _BusStop2.default((yield (0, _connector.getStopByAltId)(_this2.busStopAltId)));
		})();
	}
}
exports.default = Arrival;