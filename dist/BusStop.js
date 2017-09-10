'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _connector = require('./connector');

var _Arrival = require('./Arrival');

var _Arrival2 = _interopRequireDefault(_Arrival);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BusStop = function () {
	function BusStop(args) {
		_classCallCheck(this, BusStop);

		Object.assign(this, args);
	}

	_createClass(BusStop, [{
		key: 'arrivals',
		value: function () {
			var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								_context.next = 2;
								return (0, _connector.getArrivalsAtBusStop)(this);

							case 2:
								_context.t0 = function (arrivals) {
									return new _Arrival2.default(arrivals);
								};

								return _context.abrupt('return', _context.sent.map(_context.t0));

							case 4:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function arrivals() {
				return _ref.apply(this, arguments);
			}

			return arrivals;
		}()
	}]);

	return BusStop;
}();

exports.default = BusStop;