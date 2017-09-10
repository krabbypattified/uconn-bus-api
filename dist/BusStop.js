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

var _Arrival = require('./Arrival');

var _Arrival2 = _interopRequireDefault(_Arrival);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BusStop = function () {
	function BusStop(args) {
		(0, _classCallCheck3.default)(this, BusStop);

		(0, _assign2.default)(this, args);
	}

	(0, _createClass3.default)(BusStop, [{
		key: 'arrivals',
		value: function () {
			var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
				return _regenerator2.default.wrap(function _callee$(_context) {
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