import rp from 'request-promise'
import DataLoader from 'dataloader'
import LRU from 'lru-cache'
import join from 'url-join'


// API CALLS
const rootURL = 'http://www.uconnshuttle.com/Services/JSONPRelay.svc/'

let getAllArrivalsRAW = CustomDataLoader({
  path: `GetRouteStopArrivals`,
  qs: {TimesPerStopString: 250},
  maxAge: 100
})

let getArrivalsRAW = CustomDataLoader({
  path: `GetRouteStopArrivals`,
  qs: {TimesPerStopString: 20}, // Number of estimated arrivals to show per bus stop
  maxAge: 30*1000
})

let getLiveBusStatsRAW = CustomDataLoader({
  path: `GetMapVehiclePoints`,
  maxAge: 100
})

let getBusLinesStopsRAW = CustomDataLoader({
  path: `GetRoutesForMapWithScheduleWithEncodedLine`,
  maxAge: 24*60*60*1000 // 1 day
})

let getVehicleRoutesRAW = CustomDataLoader({
  path: `GetVehicleRoutes`,
  maxAge: 24*60*60*1000 // 1 day
})

let ROUTESTOPIDSET = new Set()
getBusLinesStopsRAW.load('').then(raw => {
  raw.forEach(line => {
    line.Stops.forEach(stop => ROUTESTOPIDSET.add(stop.RouteStopID))
  })
})




// TODO ETAs??
export async function getArrivals() {
	let rawArrivals = await getArrivalsRAW.load('')
	let arrivals = []

	rawArrivals.forEach(aList => {
    if (!ROUTESTOPIDSET.has(aList.RouteStopID)) return // Bugfix

		aList['ScheduledTimes'].forEach(arrival => {
      if (arrival.AssignedVehicleId === 0) return // Bugfix
			arrivals.push({
				busId: arrival.AssignedVehicleId,
				busLineId: aList.RouteID,
				busStopAltId: aList.RouteStopID,
				time: arrival.ArrivalTimeUTC.match(/\d+/)[0],
			})
		})
	})

	return arrivals
}

// TODO Every morning, count buses every 5 minutes, until they don't change for 1hr.
// If the buses change, get ALL 250 arrivals.
// Overwrite the permanent timetable with a KEY of RouteID:RouteStopID:TimeOfDay
let timeTable = {}
async function getTimetable() {

}
// getTimetableForBusStop
// getTimetableForBus

export async function getArrivalsAtBusStop(stop) {
	return (await getArrivals()).filter(arrival => stop.altIds&&stop.altIds.includes(arrival.busStopAltId))
}

export async function getArrivalsForBus(bus) {
	return (await getArrivals()).filter(arrival => bus.id===arrival.busId)
}

export async function getLiveBusStats() {
	let rawBusStats = await getLiveBusStatsRAW.load('')

	return rawBusStats.map(bus => ({
		id: bus.VehicleID,
		latitude: bus.Latitude,
		longitude: bus.Longitude,
		heading: bus.Heading,
		speed: bus.GroundSpeed,
		busLineId: bus.RouteID,
	}))
}

export async function getBusById(id) {
	let busStats = await getLiveBusStats()
	let bus = busStats.filter(bus => id === bus.id)[0]
	if (bus) return bus
	// if bus not found among active buses for some WEIRD reason
	bus = (await getVehicleRoutesRAW.load('')).filter(bus => bus.VehicleID === id)[0]
  return bus
  ? {
		id,
		busLineId: bus.RouteID
	}
  : {}
}

async function getLinesAndStops() {
	let rawBusLinesStops = await getBusLinesStopsRAW.load('')

	let busLines = rawBusLinesStops.map(line => ({
		id: line.RouteID,
		name: line.Description,
		stopIds: line.Stops.map(stop => stop.AddressID),
		path: line.EncodedPolyline,
		color: color(line),
	}))

	let busStopsObj = {}
	rawBusLinesStops.forEach(line => {
		line.Stops.forEach(stop => {

			let theStop = busStopsObj[stop.AddressID]

			if (theStop) {
				theStop.altIds.push(stop.RouteStopID)
				theStop.busLineIds.push(stop.RouteID)
			}
			else {
				busStopsObj[stop.AddressID] = {
					id: stop.AddressID,
					busLineIds: [stop.RouteID],
					altIds: [stop.RouteStopID],
					name: stop.Description,
					latitude: stop.Latitude,
					longitude: stop.Longitude,
				}
			}
		})
	})

	let busStops = []
	for (let key in busStopsObj) {
		busStops.push(busStopsObj[key])
	}

	return {busLines, busStops}
}

export async function getLines() {
	return (await getLinesAndStops()).busLines
}

export async function getLinesByIds(ids) {
	return (await getLines()).filter(line => ids.includes(line.id))
}

export async function getLineById(id) {
	return (await getLines()).filter(line => id === line.id)[0]
}

export async function getStops() {
	return (await getLinesAndStops()).busStops
}

export async function getStopsByIds(ids) {
	return (await getStops()).filter(stop => ids.includes(stop.id))
}

export async function getStopById(id) {
	return (await getStops()).filter(stop => id === stop.id)[0]
}

export async function getStopByAltId(altId) {
	return (await getStops()).filter(stop => stop.altIds.includes(altId))[0]
}




// CACHE
let cache = LRU()
async function fetch(opt) {
  let url = join(rootURL, opt.path)
	let res = cache.get(url)
	if (res) return res
	console.log(`fetching ${opt.path}`)
	res = await rp({
    qs: opt.qs,
    json: true,
    uri: url,
  })
	cache.set(url, res, opt.maxAge || 0) // max age
	return res
}


// Dataloader
function CustomDataLoader(opts) {
  return new DataLoader(async keys => {
  	let res = await fetch(opts)
  	return keys.map(_=>res)
  }, { cache: false })
}


// Color Helper
function color(line) {
  switch(line.RouteID) {
    case 39: return '#9669d7' // Purple
    case 35: return '#4975d5' // Blue
    case 31: return '#60c175' // Green
    case 32: return '#ed9a47' // Orange
    case 34: return '#acacac' // Silver
    case 36: return '#333333' // Late Night
    case 30: return '#f28db7' // UCONN Health
    case 20: return '#ac7d51' // Charters & Specials
    case 37: return '#85d6d9' // Weekend
    case 38: return '#ee4646' // Red
    default: {
      console.log('color bug', line.RouteID)
      return '#cd0000'
    }
  }
}
