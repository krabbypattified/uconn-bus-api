'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _connector = require('./connector');

var _Arrival = require('./Arrival');

var _Arrival2 = _interopRequireDefault(_Arrival);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

class BusStop {

	constructor(args) {
		Object.assign(this, args);
	}

	arrivals() {
		var _this = this;

		return _asyncToGenerator(function* () {
			return (yield (0, _connector.getArrivalsAtBusStop)(_this)).map(function (arrivals) {
				return new _Arrival2.default(arrivals);
			});
		})();
	}
}
exports.default = BusStop;