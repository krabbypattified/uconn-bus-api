import {buildSchema} from 'graphql'
import BusAPI from './BusAPI'
import bestRoute from './bestRoute'

// Schema
export const schema = buildSchema(`
  input LngLat {
    latitude: Float!
    longitude: Float!
  }

  type Route {
    arrival: Arrival
    end: BusStop
  }

  type Bus {
    id: Int!
    latitude: Float
    longitude: Float
    heading: Float
    speed: Float
    busLine: BusLine!
    arrivals: [Arrival!]
  }

  type BusLine {
    id: Int!
    name: String!
    path: String!
    stops: [BusStop!]
    buses: [Bus!]
    color: String!
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
    time: Float!
  }

  type Query {
    bus(id: Int!): Bus
    buses: [Bus!]
    busLine(id: Int!): BusLine
    busLines: [BusLine!]
    busStop(id: Int!): BusStop
    busStops: [BusStop!]
    bestRoute(start:LngLat!, end: LngLat!): Route
  }
`)


// Root resolver
export const rootValue = {
  bus: args => BusAPI.getBus(args),
  buses: args => BusAPI.getBuses(args),
  busLine: args => BusAPI.getBusLine(args),
  busLines: args => BusAPI.getBusLines(args),
  busStop: args => BusAPI.getBusStop(args),
  busStops: args => BusAPI.getBusStops(args),
  bestRoute: args => bestRoute(args),
}
