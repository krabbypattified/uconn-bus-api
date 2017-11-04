import rp from 'request-promise'
import DataLoader from 'dataloader'
import LRU from 'lru-cache'


// CACHE
let cache = LRU()
async function fetch(opt) {
	let res = cache.get(opt.uri)
	if (res) return res
	console.log(`fetching ${opt.uri}`)
	res = await rp(opt)
	cache.set(opt.uri, res, opt.maxAge || 0) // max age
	return res
}

// TODO pick better endpoints

// API CALLS
const rootURL = 'http://www.uconnshuttle.com/Services/JSONPRelay.svc'

let getArrivalsRAW = new DataLoader(async keys => {
	let res = await fetch({
		uri: `${rootURL}/GetRouteStopArrivals`,
		qs: {TimesPerStopString: 20}, // Number of estimated arrivals to show per bus stop
		json: true,
		maxAge: 30*1000
	})
	return keys.map(_=>res)
}, { cache: false })

let getLiveBusStatsRAW = new DataLoader(async keys => {
	let res = await fetch({
		uri: `${rootURL}/GetMapVehiclePoints`,
		json: true,
		maxAge: 100
	})
	return keys.map(_=>res)
}, { cache: false })

let getBusLinesStopsRAW = new DataLoader(async keys => {
	let res = await fetch({
		uri: `${rootURL}/GetRoutesForMapWithScheduleWithEncodedLine`,
		json: true,
		maxAge: 24*60*60*1000 // 1 day
	})
	return keys.map(_=>res)
}, { cache: false })

let getVehicleRoutesRAW = new DataLoader(async keys => {
	let res = await fetch({
		uri: `${rootURL}/GetVehicleRoutes`,
		json: true,
		maxAge: 24*60*60*1000 // 1 day
	})
	return keys.map(_=>res)
}, { cache: false })

let ROUTESTOPIDSET = new Set()
getBusLinesStopsRAW.load('').then(raw => {
  raw.forEach(line => {
    line.Stops.forEach(stop => ROUTESTOPIDSET.add(stop.RouteStopID))
  })
})




// TODO use VehicleEstimates ONLY
export async function getArrivals() {
	let rawArrivals = await getArrivalsRAW.load('')
	let arrivals = []

	rawArrivals.forEach(aList => {
    // Bugfix
    if (!ROUTESTOPIDSET.has(aList.RouteStopID)) return

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

// TODO use ScheduledTimes ONLY
export async function getTimetables() {

}

export async function getArrivalsAtBusStop(stop) {
	return (await getArrivals()).filter(arrival => stop.altIds.includes(arrival.busStopAltId))
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
  debugger
	return {
		id,
		busLineId: bus.RouteID
	}
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


// Color Helper
function color(line) {
  switch(line.RouteID) {
    case 39: return '#a566ff' // Purple
    case 35: return '#4c53e4' // Blue
    case 31: return '#42c65f' // Green
    case 32: return '#ff962d' // Orange
    case 34: return '#acacac' // Silver
    case 36: return '#333333' // Late Night
    case 30: return '#ff86b9' // UCONN Health
    case 20: return '#ac7d51' // Charters & Specials
    case 37: return '#7adde0' // Weekend
    case 38: return '#ff4141' // Red
    default: {
      console.log('color bug', line.RouteID)
      return '#cd0000'
    }
  }
}
