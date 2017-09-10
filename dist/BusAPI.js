'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _connector = require('./connector');

var _Bus = require('./Bus');

var _Bus2 = _interopRequireDefault(_Bus);

var _BusLine = require('./BusLine');

var _BusLine2 = _interopRequireDefault(_BusLine);

var _BusStop = require('./BusStop');

var _BusStop2 = _interopRequireDefault(_BusStop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BusAPI = function () {
	function BusAPI() {
		(0, _classCallCheck3.default)(this, BusAPI);
	}

	(0, _createClass3.default)(BusAPI, null, [{
		key: 'getBuses',
		value: function () {
			var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
				return _regenerator2.default.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								_context.next = 2;
								return (0, _connector.getLiveBusStats)();

							case 2:
								_context.t0 = function (bus) {
									return new _Bus2.default(bus);
								};

								return _context.abrupt('return', _context.sent.map(_context.t0));

							case 4:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function getBuses() {
				return _ref.apply(this, arguments);
			}

			return getBuses;
		}()
	}, {
		key: 'getBusLines',
		value: function () {
			var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
				return _regenerator2.default.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								_context2.next = 2;
								return (0, _connector.getLines)();

							case 2:
								_context2.t0 = function (line) {
									return new _BusLine2.default(line);
								};

								return _context2.abrupt('return', _context2.sent.map(_context2.t0));

							case 4:
							case 'end':
								return _context2.stop();
						}
					}
				}, _callee2, this);
			}));

			function getBusLines() {
				return _ref2.apply(this, arguments);
			}

			return getBusLines;
		}()
	}, {
		key: 'getBusStops',
		value: function () {
			var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
				return _regenerator2.default.wrap(function _callee3$(_context3) {
					while (1) {
						switch (_context3.prev = _context3.next) {
							case 0:
								_context3.next = 2;
								return (0, _connector.getStops)();

							case 2:
								_context3.t0 = function (stop) {
									return new _BusStop2.default(stop);
								};

								return _context3.abrupt('return', _context3.sent.map(_context3.t0));

							case 4:
							case 'end':
								return _context3.stop();
						}
					}
				}, _callee3, this);
			}));

			function getBusStops() {
				return _ref3.apply(this, arguments);
			}

			return getBusStops;
		}()
	}]);
	return BusAPI;
}();

exports.default = BusAPI;