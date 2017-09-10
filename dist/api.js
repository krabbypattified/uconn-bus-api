'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.rootValue = exports.schema = undefined;

var _graphql = require('graphql');

var _BusAPI = require('./BusAPI');

var _BusAPI2 = _interopRequireDefault(_BusAPI);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Schema
const schema = exports.schema = (0, _graphql.buildSchema)(`
	type Bus {
		id: Int!
		latitude: Float!
		longitude: Float!
		heading: Float!
		speed: Float!
		busLine: BusLine!
		arrivals: [Arrival!]
	}

	type BusLine {
		id: Int!
		name: String!
		path: String # TODO [[latitude,longitude],...]
		stops: [BusStop!]
	}

	type BusStop {
		id: Int!
		name: String!
		latitude: Float!
		longitude: Float!
		arrivals: [Arrival!]
	}

	type Arrival {
		bus: Bus!
		stop: BusStop!
		ETA: Float!
	}

	type Query {
		buses: [Bus!]
		busLines: [BusLine!]
		busStops: [BusStop!]
	}
`);

// Root resolver
const rootValue = exports.rootValue = {
	buses: args => _BusAPI2.default.getBuses(args),
	busLines: args => _BusAPI2.default.getBusLines(args),
	busStops: args => _BusAPI2.default.getBusStops(args)
};