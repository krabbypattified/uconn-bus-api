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



// API CALLS
const rootURL = 'http://www.uconnshuttle.com/Services/JSONPRelay.svc'

let getArrivalsRAW = new DataLoader(async keys => {
	let res = await fetch({
		uri: `${rootURL}/GetRouteStopArrivals`,
		qs: {TimesPerStopString: 20}, // Number of estimated arrivals to show per bus stop
		json: true,
		maxAge: 15*1000
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
/*[{
	UniqueID: "fb6e056e-e9b1-43ea-9974-0b25e2f1f202",
	DelayedStartTime: "/Date(-62135571600000-0700)/",
	FromAdmin: false,
	GpsGateUserName: "uconn25",
	IsDelayed: false,
	PersonID: 6,
	RouteID: 0,								Bus Line ID
	VehicleID: 54,							Bus ID
	VehicleName: "1701"
}...]*/


let ROUTESTOPIDSET = new Set()
getBusLinesStopsRAW.load('').then(raw => {
  raw.forEach(line => {
    line.Stops.forEach(stop => ROUTESTOPIDSET.add(stop.RouteStopID))
  })
})



// EXPORTS

export async function getArrivals() {
	let rawArrivals = await getArrivalsRAW.load('')
	let arrivals = []

	rawArrivals.forEach(aList => {
    // Bugfix
    if (!ROUTESTOPIDSET.has(aList.RouteStopID)) return

		aList['ScheduledTimes'].forEach(arrival => {
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
// export async function getArrivals() {
// 	let rawArrivals = await getArrivalsRAW.load('')
// 	let arrivals = []
//
// 	rawArrivals.forEach(aList => {
// 		let aModList = {}
//
// 		aList['ScheduledTimes'].forEach(arrival => {
// 			if (arrival.AssignedVehicleId in aModList) return
// 			aModList[arrival.AssignedVehicleId] = {
// 				busId: arrival.AssignedVehicleId,
// 				busLineId: aList.RouteID,
// 				busStopAltId: aList.RouteStopID,
// 				time: arrival.ArrivalTimeUTC.match(/\d+/)[0],
// 			}
// 		})
//
// 		// aList['VehicleEstimates'].forEach(arrival => {
// 		// 	if (!arrival.VehicleID in aModList) return
// 		// 	let ETA = Date.now() - arrival.SecondsToStop * 1000
// 		// 	if (ETA < 0) return
// 		// 	aModList[arrival.VehicleID].time = ETA
// 		// })
//
// 		aModList = Object.values(aModList)
// 		arrivals.push(...aModList)
// 	})
//
// 	return arrivals
// }

export async function getArrivalsAtBusStop(stop) {
	return (await getArrivals()).filter(arrival => stop.altIds.includes(arrival.busStopAltId))
}

export async function getArrivalsForBus(bus) {
	return (await getArrivals()).filter(arrival => bus.id===arrival.busId)
}

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
	return {
		id,
		busLineId: bus.RouteID
	}
}

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
