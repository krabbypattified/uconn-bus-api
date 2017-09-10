'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _connector = require('./connector');

var _Bus = require('./Bus');

var _Bus2 = _interopRequireDefault(_Bus);

var _BusLine = require('./BusLine');

var _BusLine2 = _interopRequireDefault(_BusLine);

var _BusStop = require('./BusStop');

var _BusStop2 = _interopRequireDefault(_BusStop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BusAPI = function () {
	function BusAPI() {
		_classCallCheck(this, BusAPI);
	}

	_createClass(BusAPI, null, [{
		key: 'getBuses',
		value: function () {
			var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
				return regeneratorRuntime.wrap(function _callee$(_context) {
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
			var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
				return regeneratorRuntime.wrap(function _callee2$(_context2) {
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
			var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
				return regeneratorRuntime.wrap(function _callee3$(_context3) {
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