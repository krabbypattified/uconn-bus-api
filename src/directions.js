import BusAPI from './BusAPI'


let startLocation, endLocation, bestOption

export default async ({from, to}) => {
  startLocation = from
  endLocation = to
  bestOption = null

  // Get {from,to} nearest stops
  let stops = await getNearestStops({from, to, min:12, distance:.25})
  let startStops = []
  let endStops = []

  // Calculate the best route
  await forEach(stops, async stop => {
      if (stop.group) { // stop is an endStop
          endStops.push(stop)
          await forEach(startStops, async s2 => checkOptions(s2.val, stop.val))
      }
      else { // stop is a startStop
          startStops.push(stop)
          await forEach(endStops, async s2 => checkOptions(stop.val, s2.val))
      }
  })

  return bestOption
}









// Helpers

// Check our best options!
async function checkOptions(startStop, endStop) {

  // Find busLines that go to both stops
  let {arr1:busLines} = intersection((await startStop.busLines()), (await endStop.busLines()), 'id')
  let arrivals = await startStop.arrivals()

  await forEach(busLines, async busLine => {

      // Get next compatible start arrival
      let arrivalsForLine = await filter(arrivals, async arrival => (await arrival.bus()).busLineId === busLine.id)
      for (var i = 0; i < arrivalsForLine.length; i++) {
        if (arrivalsForLine[i].time > arrivalTime(startLocation, startStop)) break
      }
      let nextCompatibleArrival = arrivalsForLine[i]
      if (!nextCompatibleArrival) return

      // Get its respective end arrival
      let endStopArrivals = await endStop.arrivals()
      for (var i = 0; i < endStopArrivals.length; i++) {
        if (endStopArrivals[i].busId === nextCompatibleArrival.busId &&
            endStopArrivals[i].time > nextCompatibleArrival.time) break
      }
      let endArrival = endStopArrivals[i]
      if (!endArrival) return

      // Compare both destinationETA's
      let destinationETA = endArrival.time + walkTime(endStop, endLocation)
      let weHaveAWinner = destinationETA < (bestOption && bestOption.destinationETA || Infinity)

      // Update the bestOption
      if (weHaveAWinner) bestOption = {
        destinationETA,
        hopOn: nextCompatibleArrival,
        hopOff: endArrival,
        walkETA: arrivalTime(startLocation, endLocation)
      }
  })
}


async function filter(arr, callback) {
	return (await Promise.all(arr.map(async item => {
		 return (await callback(item)) ? item : undefined
	}))).filter(i=>i!==undefined)
}

async function getNearestStops({from, to, min, distance}) {
  let startStops = await sortStopsByDistanceFrom(from, 0)
  let endStops = await sortStopsByDistanceFrom(to, 1)

  let closeStart = startStops.splice(0,1)[0]
  let closeEnd = endStops.splice(0,1)[0]

  let sortedStops = [...startStops, ...endStops].sort((a,b) => a.distance - b.distance)
  sortedStops = [closeStart, closeEnd, ...sortedStops]

  // Where to break
  let includedStopIds = []
  for (var i = 0; i < sortedStops.length; i++) {
    if (includedStopIds.includes(sortedStops[i].val.id)) break // no doubles allowed
    if (sortedStops[i].distance > .25 && i+1 > min) break
    includedStopIds.push(sortedStops[i].val.id)
  }

  return sortedStops.slice(0,i)
}


async function sortStopsByDistanceFrom(lngLat, group) {
  let stops = (await BusAPI.getBusStops()).map(stop => ({
    val: stop,
    group,
    distance: distance(lngLat, stop)
  }))

  return stops.sort((a,b) => a.distance - b.distance)
}


async function forEach(items, fn) {
  if (items && items.length) {
    await Promise.all(
      items.map(async item => await fn(item))
    )
  }
}


function distance(from, to) {
  let d2 = Math.pow(from.latitude - to.latitude, 2) + Math.pow(from.longitude - to.longitude, 2)
  return Math.sqrt(d2) * 60.7053 // for miles (hacky)
}


function walkTime(from, to, mph=4) {
	let speed = mph / 60*60*1000
	return distance(from, to) / speed
}


function arrivalTime(from, to, mph=4) {
	return Date.now() + walkTime(from, to, mph)
}


function intersection(arr1_, arr2_, path) {
	let intersect1 = []
	let intersect2 = []
	let arr1 = arr1_.slice(0)
	let arr2 = arr2_.slice(0)

	for (let i = arr1.length; i--;) {
		for (let j = arr2.length; j--;) {
			if ( find(arr1[i], path) === find(arr2[j], path) ) {
				intersect1.push(arr1.splice(i, 1)[0])
				intersect2.push(arr2.splice(j, 1)[0])
				break
			}
		}
	}

	return {arr1:intersect1,arr2:intersect2}
}


// https://stackoverflow.com/questions/8817394
function find(obj, path) {
  var paths = path.split('.')
    , current = obj
    , i;

  for (var i = 0; i < paths.length; ++i) {
    if (current[paths[i]] === undefined) {
      return undefined;
    } else {
      current = current[paths[i]];
    }
  }
  return current;
}
