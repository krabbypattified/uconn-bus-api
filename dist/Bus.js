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

var _BusLine = require('./BusLine');

var _BusLine2 = _interopRequireDefault(_BusLine);

var _Arrival = require('./Arrival');

var _Arrival2 = _interopRequireDefault(_Arrival);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Bus = function () {
	function Bus(args) {
		(0, _classCallCheck3.default)(this, Bus);

		(0, _assign2.default)(this, args);
	}

	(0, _createClass3.default)(Bus, [{
		key: 'busLine',
		value: function () {
			var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
				return _regenerator2.default.wrap(function _callee$(_context) {
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
			var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
				return _regenerator2.default.wrap(function _callee2$(_context2) {
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