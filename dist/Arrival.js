'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _connector = require('./connector');

var _Bus = require('./Bus');

var _Bus2 = _interopRequireDefault(_Bus);

var _BusStop = require('./BusStop');

var _BusStop2 = _interopRequireDefault(_BusStop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Arrival = function () {
	function Arrival(args) {
		(0, _classCallCheck3.default)(this, Arrival);

		(0, _assign2.default)(this, args);
	}

	(0, _createClass3.default)(Arrival, [{
		key: 'bus',
		value: function () {
			var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
				return _regenerator2.default.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								_context.t0 = _Bus2.default;
								_context.next = 3;
								return (0, _connector.getBusById)(this.busId);

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

			function bus() {
				return _ref.apply(this, arguments);
			}

			return bus;
		}()
	}, {
		key: 'stop',
		value: function () {
			var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
				return _regenerator2.default.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								_context2.t0 = _BusStop2.default;
								_context2.next = 3;
								return (0, _connector.getStopByAltId)(this.busStopAltId);

							case 3:
								_context2.t1 = _context2.sent;
								return _context2.abrupt('return', new _context2.t0(_context2.t1));

							case 5:
							case 'end':
								return _context2.stop();
						}
					}
				}, _callee2, this);
			}));

			function stop() {
				return _ref2.apply(this, arguments);
			}

			return stop;
		}()
	}]);
	return Arrival;
}();

exports.default = Arrival;