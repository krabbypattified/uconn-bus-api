import {buildSchema} from 'graphql'
import BusAPI from './BusAPI'


// Schema
export const schema = buildSchema(`
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
		path: String!
		stops: [BusStop!]
		buses: [Bus!]
	}

	type BusStop {
		id: Int!
		name: String!
		latitude: Float!
		longitude: Float!
		arrivals: [Arrival!]
		busLines: [BusLine!]
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
`)


// Root resolver
export const rootValue = {
	buses: args => BusAPI.getBuses(args),
	busLines: args => BusAPI.getBusLines(args),
	busStops: args => BusAPI.getBusStops(args),
}
