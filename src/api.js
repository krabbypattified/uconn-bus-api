import {buildSchema} from 'graphql'
import buildings from './buildings'
import BusAPI from './BusAPI'
import directions from './directions'
import geocode from './geocode'


// Schema
export const schema = buildSchema(`
  input LngLat {
    latitude: Float!
    longitude: Float!
  }

  type Route {
    hopOn: Arrival!
    hopOff: Arrival!
    walkETA: Float!
    path: String!
  }

  type Bus {
    id: Int!
    latitude: Float
    longitude: Float
    heading: Float
    speed: Float
    busLine: BusLine!
    arrivals(before: Float, limit: Int): [Arrival]!
  }

  type BusLine {
    id: Int!
    name: String!
    path: String!
    stops: [BusStop]!
    buses: [Bus]!
    color: String!
  }

  type BusStop {
    id: Int!
    name: String!
    latitude: Float!
    longitude: Float!
    arrivals(before: Float, limit: Int): [Arrival]!
    busLines: [BusLine]!
  }

  type Arrival {
    bus: Bus!
    stop: BusStop!
    time: Float!
  }

  type Place {
    name: String! # i.e. Bishop Center or 100 Horsebarn Hill Rd, Storrs, CT
    latitude: Float!
    longitude: Float!
    abbreviation: String
  }

  type Query {
    buildings: [Place]!
    bus(id: Int!): Bus
    buses: [Bus]!
    busLine(id: Int!): BusLine
    busLines: [BusLine]!
    busStop(id: Int!): BusStop
    busStops: [BusStop]!
    directions(from:LngLat!, to: LngLat!): Route
    geocode(lngLat:LngLat!): Place
  }
`)


// Root resolver
export const rootValue = {
  buildings: args => buildings(args),
  bus: args => BusAPI.getBus(args),
  buses: args => BusAPI.getBuses(args),
  busLine: args => BusAPI.getBusLine(args),
  busLines: args => BusAPI.getBusLines(args),
  busStop: args => BusAPI.getBusStop(args),
  busStops: args => BusAPI.getBusStops(args),
  directions: args => directions(args),
  geocode: args => geocode(args),
}
