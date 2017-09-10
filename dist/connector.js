'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getStopByAltId = exports.getStopsByIds = exports.getStops = exports.getLineById = exports.getLines = exports.getBusById = exports.getLiveBusStats = exports.getArrivalsAtBusStop = exports.getArrivals = undefined;

var fetch = function () {
	var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(opt) {
		var res;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						res = cache.get(opt.uri);

						if (!res) {
							_context.next = 3;
							break;
						}

						return _context.abrupt('return', res);

					case 3:
						console.log('fetching ' + opt.uri);
						_context.next = 6;
						return (0, _requestPromise2.default)(opt);

					case 6:
						res = _context.sent;

						cache.set(opt.uri, res, 3000); // max age
						return _context.abrupt('return', res);

					case 9:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, this);
	}));

	return function fetch(_x) {
		return _ref.apply(this, arguments);
	};
}();

// API CALLS


// EXPORTS
var getArrivals = exports.getArrivals = function () {
	var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
		var rawArrivals, arrivals;
		return regeneratorRuntime.wrap(function _callee5$(_context5) {
			while (1) {
				switch (_context5.prev = _context5.next) {
					case 0:
						_context5.next = 2;
						return getArrivalsRAW.load('');

					case 2:
						rawArrivals = _context5.sent;
						arrivals = [];


						rawArrivals.forEach(function (aList) {
							aList['VehicleEstimates'].forEach(function (arrival) {
								arrivals.push({
									busId: arrival.VehicleID,
									busLineId: aList.RouteID,
									busStopAltId: aList.RouteStopID,
									secondsLeft: arrival.SecondsToStop,
									ETA: Date.now() - arrival.SecondsToStop * 1000
								});
							});
						});

						return _context5.abrupt('return', arrivals);

					case 6:
					case 'end':
						return _context5.stop();
				}
			}
		}, _callee5, this);
	}));

	return function getArrivals() {
		return _ref5.apply(this, arguments);
	};
}();

var getArrivalsAtBusStop = exports.getArrivalsAtBusStop = function () {
	var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(stop) {
		return regeneratorRuntime.wrap(function _callee6$(_context6) {
			while (1) {
				switch (_context6.prev = _context6.next) {
					case 0:
						_context6.next = 2;
						return getArrivals();

					case 2:
						_context6.t0 = function (arrival) {
							return stop.altIds.includes(arrival.busStopAltId);
						};

						return _context6.abrupt('return', _context6.sent.filter(_context6.t0));

					case 4:
					case 'end':
						return _context6.stop();
				}
			}
		}, _callee6, this);
	}));

	return function getArrivalsAtBusStop(_x5) {
		return _ref6.apply(this, arguments);
	};
}();

// NOTE this repeats for EVERY bus stop on EVERY bus line
/*[{
	"RouteID":31,											Which Line the Stop Belongs to (31 = Silver)
	"RouteStopID":578,										The Stop ID Specific to (Silver) Line
	"ScheduledTimes":[										YOU CAN PROBABLY IGNORE THIS
		{
			"ArrivalTimeUTC":"\/Date(1504891260000)\/",		Next (Silver) Bus Arrival Time
			"AssignedVehicleId":40,							ID for That (Silver) Bus
			"DepartureTimeUTC":"\/Date(1504891260000)\/"
		},
		...
	],
	"VehicleEstimates":[									Estimated Arrivals for (Silver) Line
		{
			"OnRoute":true,
			"SecondsToStop":658,							When That (Silver) Bus Arrives
			"VehicleID":40									ID for That (Silver) Bus
		},
		...
	]
},...]*/

var getLiveBusStats = exports.getLiveBusStats = function () {
	var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee7() {
		var rawBusStats;
		return regeneratorRuntime.wrap(function _callee7$(_context7) {
			while (1) {
				switch (_context7.prev = _context7.next) {
					case 0:
						_context7.next = 2;
						return getLiveBusStatsRAW.load('');

					case 2:
						rawBusStats = _context7.sent;
						return _context7.abrupt('return', rawBusStats.map(function (bus) {
							return {
								id: bus.VehicleID,
								latitude: bus.Latitude,
								longitude: bus.Longitude,
								heading: bus.Heading,
								speed: bus.GroundSpeed,
								busLineId: bus.RouteID
							};
						}));

					case 4:
					case 'end':
						return _context7.stop();
				}
			}
		}, _callee7, this);
	}));

	return function getLiveBusStats() {
		return _ref7.apply(this, arguments);
	};
}();

var getBusById = exports.getBusById = function () {
	var _ref8 = _asyncToGenerator(regeneratorRuntime.mark(function _callee8(id) {
		return regeneratorRuntime.wrap(function _callee8$(_context8) {
			while (1) {
				switch (_context8.prev = _context8.next) {
					case 0:
						_context8.next = 2;
						return getLiveBusStats();

					case 2:
						_context8.t0 = function (bus) {
							return id === bus.id;
						};

						return _context8.abrupt('return', _context8.sent.filter(_context8.t0)[0]);

					case 4:
					case 'end':
						return _context8.stop();
				}
			}
		}, _callee8, this);
	}));

	return function getBusById(_x6) {
		return _ref8.apply(this, arguments);
	};
}();

// NOTE this is the current location of all the buses
/*[{
	"GroundSpeed":16.15515388638,							Speed (mph??)
	"Heading":261,											Angle (relative to??)
	"IsDelayed":false,
	"IsOnRoute":true,
	"Latitude":41.80553,									Latitude
	"Longitude":-72.24607,									Longitude
	"Name":"232",
	"RouteID":31,											Bus Route ID (31 = Silver)
	"Seconds":1,
	"TimeStamp":"\/Date(1504911410000-0600)\/",
	"VehicleID":40											Bus ID (i.e. the first Silver bus)
},...]
`*/

var getLinesAndStops = function () {
	var _ref9 = _asyncToGenerator(regeneratorRuntime.mark(function _callee9() {
		var rawBusLinesStops, busLines, busStopsObj, busStops, key;
		return regeneratorRuntime.wrap(function _callee9$(_context9) {
			while (1) {
				switch (_context9.prev = _context9.next) {
					case 0:
						_context9.next = 2;
						return getBusLinesStopsRAW.load('');

					case 2:
						rawBusLinesStops = _context9.sent;
						busLines = rawBusLinesStops.map(function (line) {
							return {
								id: line.RouteID,
								name: line.Description,
								stopIds: line.Stops.map(function (stop) {
									return stop.AddressID;
								}),
								path: line.EncodedPolyline
							};
						});
						busStopsObj = {};

						rawBusLinesStops.forEach(function (line) {
							line.Stops.forEach(function (stop) {

								var theStop = busStopsObj[stop.AddressID];

								theStop ? theStop.altIds.push(stop.RouteStopID) : busStopsObj[stop.AddressID] = {
									id: stop.AddressID,
									altIds: [stop.RouteStopID],
									name: stop.Description,
									latitude: stop.Latitude,
									longitude: stop.Longitude
								};
							});
						});

						busStops = [];

						for (key in busStopsObj) {
							busStops.push(busStopsObj[key]);
						}

						return _context9.abrupt('return', { busLines: busLines, busStops: busStops });

					case 9:
					case 'end':
						return _context9.stop();
				}
			}
		}, _callee9, this);
	}));

	return function getLinesAndStops() {
		return _ref9.apply(this, arguments);
	};
}();

var getLines = exports.getLines = function () {
	var _ref10 = _asyncToGenerator(regeneratorRuntime.mark(function _callee10() {
		return regeneratorRuntime.wrap(function _callee10$(_context10) {
			while (1) {
				switch (_context10.prev = _context10.next) {
					case 0:
						_context10.next = 2;
						return getLinesAndStops();

					case 2:
						return _context10.abrupt('return', _context10.sent.busLines);

					case 3:
					case 'end':
						return _context10.stop();
				}
			}
		}, _callee10, this);
	}));

	return function getLines() {
		return _ref10.apply(this, arguments);
	};
}();

var getLineById = exports.getLineById = function () {
	var _ref11 = _asyncToGenerator(regeneratorRuntime.mark(function _callee11(id) {
		return regeneratorRuntime.wrap(function _callee11$(_context11) {
			while (1) {
				switch (_context11.prev = _context11.next) {
					case 0:
						_context11.next = 2;
						return getLines();

					case 2:
						_context11.t0 = function (line) {
							return id === line.id;
						};

						return _context11.abrupt('return', _context11.sent.filter(_context11.t0)[0]);

					case 4:
					case 'end':
						return _context11.stop();
				}
			}
		}, _callee11, this);
	}));

	return function getLineById(_x7) {
		return _ref11.apply(this, arguments);
	};
}();

var getStops = exports.getStops = function () {
	var _ref12 = _asyncToGenerator(regeneratorRuntime.mark(function _callee12() {
		return regeneratorRuntime.wrap(function _callee12$(_context12) {
			while (1) {
				switch (_context12.prev = _context12.next) {
					case 0:
						_context12.next = 2;
						return getLinesAndStops();

					case 2:
						return _context12.abrupt('return', _context12.sent.busStops);

					case 3:
					case 'end':
						return _context12.stop();
				}
			}
		}, _callee12, this);
	}));

	return function getStops() {
		return _ref12.apply(this, arguments);
	};
}();

var getStopsByIds = exports.getStopsByIds = function () {
	var _ref13 = _asyncToGenerator(regeneratorRuntime.mark(function _callee13(ids) {
		return regeneratorRuntime.wrap(function _callee13$(_context13) {
			while (1) {
				switch (_context13.prev = _context13.next) {
					case 0:
						_context13.next = 2;
						return getStops();

					case 2:
						_context13.t0 = function (stop) {
							return ids.includes(stop.id);
						};

						return _context13.abrupt('return', _context13.sent.filter(_context13.t0));

					case 4:
					case 'end':
						return _context13.stop();
				}
			}
		}, _callee13, this);
	}));

	return function getStopsByIds(_x8) {
		return _ref13.apply(this, arguments);
	};
}();

var getStopByAltId = exports.getStopByAltId = function () {
	var _ref14 = _asyncToGenerator(regeneratorRuntime.mark(function _callee14(altId) {
		return regeneratorRuntime.wrap(function _callee14$(_context14) {
			while (1) {
				switch (_context14.prev = _context14.next) {
					case 0:
						_context14.next = 2;
						return getStops();

					case 2:
						_context14.t0 = function (stop) {
							return stop.altIds.includes(altId);
						};

						return _context14.abrupt('return', _context14.sent.filter(_context14.t0)[0]);

					case 4:
					case 'end':
						return _context14.stop();
				}
			}
		}, _callee14, this);
	}));

	return function getStopByAltId(_x9) {
		return _ref14.apply(this, arguments);
	};
}();

// NOTE this got called once per page load. it returns 1 result for each color bus.
/*[{
	"Description":"Purple",									Bus Line
	"ETATypeID":3,
	"EncodedPolyline":"RnCFt@@PBRDZBL.............",		Bus Line Route Coords
	"IsVisibleOnMap":true,
	"Landmarks":[],
	"MapLatitude":41.810087,
	"MapLineColor":"#8000FF",
	"MapLongitude":-72.26602,
	"Order":1,
	"RouteID":33,											Purple Line's ID
	"Stops":[												All Stops for Purple Line
		{
		"AddressID":163,									Bus Stop ID :)
		"City":"Storrs",
		"Latitude":41.809269,								Stop Latitude
		"Line1":"Visitor Center Outbound",
		"Line2":"",
		"Longitude":-72.261484,								Stop Longitude
		"State":"CT",
		"Zip":"06269",
		"Description":"Visitor Center Outbound",			Stop Name
		"Heading":0,
		"MapPoints":[],
		"MaxZoomLevel":1,
		"Order":1,
		"RouteDescription":"",
		"RouteID":33,										Purple Line's ID
		"RouteStopID":627,									Bus Stop ID for this Route, in order [627,631,632,633,634,...]
		"SecondsAtStop":10,
		"SecondsToNextStop":170,
		"ShowDefaultedOnMap":true,
		"ShowEstimatesOnMap":true,
		"SignVerbiage":"Visitor Center Outbound",
		"TextingKey":""
		},
		...
	]
},...]
*/


var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _dataloader = require('dataloader');

var _dataloader2 = _interopRequireDefault(_dataloader);

var _lruCache = require('lru-cache');

var _lruCache2 = _interopRequireDefault(_lruCache);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// TODO frontend caching is Apollo's debounce, backend caching is fetch-cached https://www.npmjs.com/package/fetch-cached


// CACHE
var cache = (0, _lruCache2.default)();
var rootURL = 'http://www.uconnshuttle.com/Services/JSONPRelay.svc';

var getArrivalsRAW = new _dataloader2.default(function () {
	var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(keys) {
		var res;
		return regeneratorRuntime.wrap(function _callee2$(_context2) {
			while (1) {
				switch (_context2.prev = _context2.next) {
					case 0:
						_context2.next = 2;
						return fetch({
							uri: rootURL + '/GetRouteStopArrivals',
							qs: { TimesPerStopString: 4 }, // Number of estimated arrivals to show per bus stop
							json: true
						});

					case 2:
						res = _context2.sent;
						return _context2.abrupt('return', keys.map(function (_) {
							return res;
						}));

					case 4:
					case 'end':
						return _context2.stop();
				}
			}
		}, _callee2, undefined);
	}));

	return function (_x2) {
		return _ref2.apply(this, arguments);
	};
}(), { cache: false });

var getLiveBusStatsRAW = new _dataloader2.default(function () {
	var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(keys) {
		var res;
		return regeneratorRuntime.wrap(function _callee3$(_context3) {
			while (1) {
				switch (_context3.prev = _context3.next) {
					case 0:
						_context3.next = 2;
						return fetch({
							uri: rootURL + '/GetMapVehiclePoints',
							json: true
						});

					case 2:
						res = _context3.sent;
						return _context3.abrupt('return', keys.map(function (_) {
							return res;
						}));

					case 4:
					case 'end':
						return _context3.stop();
				}
			}
		}, _callee3, undefined);
	}));

	return function (_x3) {
		return _ref3.apply(this, arguments);
	};
}(), { cache: false });

var getBusLinesStopsRAW = new _dataloader2.default(function () {
	var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(keys) {
		var res;
		return regeneratorRuntime.wrap(function _callee4$(_context4) {
			while (1) {
				switch (_context4.prev = _context4.next) {
					case 0:
						_context4.next = 2;
						return fetch({
							uri: rootURL + '/GetRoutesForMapWithScheduleWithEncodedLine',
							json: true
						});

					case 2:
						res = _context4.sent;
						return _context4.abrupt('return', keys.map(function (_) {
							return res;
						}));

					case 4:
					case 'end':
						return _context4.stop();
				}
			}
		}, _callee4, undefined);
	}));

	return function (_x4) {
		return _ref4.apply(this, arguments);
	};
}(), { cache: false });