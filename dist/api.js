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
var schema = exports.schema = (0, _graphql.buildSchema)('\n\ttype Bus {\n\t\tid: Int!\n\t\tlatitude: Float!\n\t\tlongitude: Float!\n\t\theading: Float!\n\t\tspeed: Float!\n\t\tbusLine: BusLine!\n\t\tarrivals: [Arrival!]\n\t}\n\n\ttype BusLine {\n\t\tid: Int!\n\t\tname: String!\n\t\tpath: String # TODO [[latitude,longitude],...]\n\t\tstops: [BusStop!]\n\t}\n\n\ttype BusStop {\n\t\tid: Int!\n\t\tname: String!\n\t\tlatitude: Float!\n\t\tlongitude: Float!\n\t\tarrivals: [Arrival!]\n\t}\n\n\ttype Arrival {\n\t\tbus: Bus!\n\t\tstop: BusStop!\n\t\tETA: Float!\n\t}\n\n\ttype Query {\n\t\tbuses: [Bus!]\n\t\tbusLines: [BusLine!]\n\t\tbusStops: [BusStop!]\n\t}\n');

// Root resolver
var rootValue = exports.rootValue = {
	buses: function buses(args) {
		return _BusAPI2.default.getBuses(args);
	},
	busLines: function busLines(args) {
		return _BusAPI2.default.getBusLines(args);
	},
	busStops: function busStops(args) {
		return _BusAPI2.default.getBusStops(args);
	}
};