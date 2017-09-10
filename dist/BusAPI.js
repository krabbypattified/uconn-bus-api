'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _connector = require('./connector');

var _Bus = require('./Bus');

var _Bus2 = _interopRequireDefault(_Bus);

var _BusLine = require('./BusLine');

var _BusLine2 = _interopRequireDefault(_BusLine);

var _BusStop = require('./BusStop');

var _BusStop2 = _interopRequireDefault(_BusStop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

class BusAPI {

	static getBuses() {
		return _asyncToGenerator(function* () {
			return (yield (0, _connector.getLiveBusStats)()).map(function (bus) {
				return new _Bus2.default(bus);
			});
		})();
	}

	static getBusLines() {
		return _asyncToGenerator(function* () {
			return (yield (0, _connector.getLines)()).map(function (line) {
				return new _BusLine2.default(line);
			});
		})();
	}

	static getBusStops() {
		return _asyncToGenerator(function* () {
			return (yield (0, _connector.getStops)()).map(function (stop) {
				return new _BusStop2.default(stop);
			});
		})();
	}
}
exports.default = BusAPI;