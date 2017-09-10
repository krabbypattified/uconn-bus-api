'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getStopByAltId = exports.getStopsByIds = exports.getStops = exports.getLineById = exports.getLines = exports.getBusById = exports.getLiveBusStats = exports.getArrivalsAtBusStop = exports.getArrivals = undefined;

let fetch = (() => {
	var _ref = _asyncToGenerator(function* (opt) {
		let res = cache.get(opt.uri);
		if (res) return res;
		console.log(`fetching ${opt.uri}`);
		res = yield (0, _requestPromise2.default)(opt);
		cache.set(opt.uri, res, 3000); // max age
		return res;
	});

	return function fetch(_x) {
		return _ref.apply(this, arguments);
	};
})();

// API CALLS


// EXPORTS
let getArrivals = exports.getArrivals = (() => {
	var _ref5 = _asyncToGenerator(function* () {
		let rawArrivals = yield getArrivalsRAW.load('');

		let arrivals = [];

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

		return arrivals;
	});

	return function getArrivals() {
		return _ref5.apply(this, arguments);
	};
})();

let getArrivalsAtBusStop = exports.getArrivalsAtBusStop = (() => {
	var _ref6 = _asyncToGenerator(function* (stop) {
		return (yield getArrivals()).filter(function (arrival) {
			return stop.altIds.includes(arrival.busStopAltId);
		});
	});

	return function getArrivalsAtBusStop(_x5) {
		return _ref6.apply(this, arguments);
	};
})();

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

let getLiveBusStats = exports.getLiveBusStats = (() => {
	var _ref7 = _asyncToGenerator(function* () {
		let rawBusStats = yield getLiveBusStatsRAW.load('');

		return rawBusStats.map(function (bus) {
			return {
				id: bus.VehicleID,
				latitude: bus.Latitude,
				longitude: bus.Longitude,
				heading: bus.Heading,
				speed: bus.GroundSpeed,
				busLineId: bus.RouteID
			};
		});
	});

	return function getLiveBusStats() {
		return _ref7.apply(this, arguments);
	};
})();

let getBusById = exports.getBusById = (() => {
	var _ref8 = _asyncToGenerator(function* (id) {
		return (yield getLiveBusStats()).filter(function (bus) {
			return id === bus.id;
		})[0];
	});

	return function getBusById(_x6) {
		return _ref8.apply(this, arguments);
	};
})();

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

let getLinesAndStops = (() => {
	var _ref9 = _asyncToGenerator(function* () {
		let rawBusLinesStops = yield getBusLinesStopsRAW.load('');

		let busLines = rawBusLinesStops.map(function (line) {
			return {
				id: line.RouteID,
				name: line.Description,
				stopIds: line.Stops.map(function (stop) {
					return stop.AddressID;
				}),
				path: line.EncodedPolyline
			};
		});

		let busStopsObj = {};
		rawBusLinesStops.forEach(function (line) {
			line.Stops.forEach(function (stop) {

				let theStop = busStopsObj[stop.AddressID];

				theStop ? theStop.altIds.push(stop.RouteStopID) : busStopsObj[stop.AddressID] = {
					id: stop.AddressID,
					altIds: [stop.RouteStopID],
					name: stop.Description,
					latitude: stop.Latitude,
					longitude: stop.Longitude
				};
			});
		});

		let busStops = [];
		for (let key in busStopsObj) {
			busStops.push(busStopsObj[key]);
		}

		return { busLines, busStops };
	});

	return function getLinesAndStops() {
		return _ref9.apply(this, arguments);
	};
})();

let getLines = exports.getLines = (() => {
	var _ref10 = _asyncToGenerator(function* () {
		return (yield getLinesAndStops()).busLines;
	});

	return function getLines() {
		return _ref10.apply(this, arguments);
	};
})();

let getLineById = exports.getLineById = (() => {
	var _ref11 = _asyncToGenerator(function* (id) {
		return (yield getLines()).filter(function (line) {
			return id === line.id;
		})[0];
	});

	return function getLineById(_x7) {
		return _ref11.apply(this, arguments);
	};
})();

let getStops = exports.getStops = (() => {
	var _ref12 = _asyncToGenerator(function* () {
		return (yield getLinesAndStops()).busStops;
	});

	return function getStops() {
		return _ref12.apply(this, arguments);
	};
})();

let getStopsByIds = exports.getStopsByIds = (() => {
	var _ref13 = _asyncToGenerator(function* (ids) {
		return (yield getStops()).filter(function (stop) {
			return ids.includes(stop.id);
		});
	});

	return function getStopsByIds(_x8) {
		return _ref13.apply(this, arguments);
	};
})();

let getStopByAltId = exports.getStopByAltId = (() => {
	var _ref14 = _asyncToGenerator(function* (altId) {
		return (yield getStops()).filter(function (stop) {
			return stop.altIds.includes(altId);
		})[0];
	});

	return function getStopByAltId(_x9) {
		return _ref14.apply(this, arguments);
	};
})();

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
let cache = (0, _lruCache2.default)();
const rootURL = 'http://www.uconnshuttle.com/Services/JSONPRelay.svc';

let getArrivalsRAW = new _dataloader2.default((() => {
	var _ref2 = _asyncToGenerator(function* (keys) {
		let res = yield fetch({
			uri: `${rootURL}/GetRouteStopArrivals`,
			qs: { TimesPerStopString: 4 }, // Number of estimated arrivals to show per bus stop
			json: true
		});
		return keys.map(function (_) {
			return res;
		});
	});

	return function (_x2) {
		return _ref2.apply(this, arguments);
	};
})(), { cache: false });

let getLiveBusStatsRAW = new _dataloader2.default((() => {
	var _ref3 = _asyncToGenerator(function* (keys) {
		let res = yield fetch({
			uri: `${rootURL}/GetMapVehiclePoints`,
			json: true
		});
		return keys.map(function (_) {
			return res;
		});
	});

	return function (_x3) {
		return _ref3.apply(this, arguments);
	};
})(), { cache: false });

let getBusLinesStopsRAW = new _dataloader2.default((() => {
	var _ref4 = _asyncToGenerator(function* (keys) {
		let res = yield fetch({
			uri: `${rootURL}/GetRoutesForMapWithScheduleWithEncodedLine`,
			json: true
		});
		return keys.map(function (_) {
			return res;
		});
	});

	return function (_x4) {
		return _ref4.apply(this, arguments);
	};
})(), { cache: false });