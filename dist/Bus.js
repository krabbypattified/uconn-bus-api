'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _connector = require('./connector');

var _BusLine = require('./BusLine');

var _BusLine2 = _interopRequireDefault(_BusLine);

var _Arrival = require('./Arrival');

var _Arrival2 = _interopRequireDefault(_Arrival);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bus = function () {
	function Bus(args) {
		_classCallCheck(this, Bus);

		Object.assign(this, args);
	}

	_createClass(Bus, [{
		key: 'busLine',
		value: function () {
			var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								_context.t0 = _BusLine2.default;
								_context.next = 3;
								return (0, _connector.getLineById)(this.busLineId);

							case 3:
								_context.t1 = _context.sent;
								return _context.abrupt('return', new _context.t0(_context.t1));

							case 5:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function busLine() {
				return _ref.apply(this, arguments);
			}

			return busLine;
		}()
	}, {
		key: 'arrivals',
		value: function () {
			var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
				return regeneratorRuntime.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								_context2.next = 2;
								return (0, _connector.getArrivals)();

							case 2:
								_context2.t0 = function (arrival) {
									return new _Arrival2.default(arrival);
								};

								return _context2.abrupt('return', _context2.sent.map(_context2.t0));

							case 4:
							case 'end':
								return _context2.stop();
						}
					}
				}, _callee2, this);
			}));

			function arrivals() {
				return _ref2.apply(this, arguments);
			}

			return arrivals;
		}()
	}]);

	return Bus;
}();

exports.default = Bus;