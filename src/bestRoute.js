let startLocation
let endLocation
let bestOption


export default ({start, end}) => {
  startLocation = start
  endLocation = end
  bestOption = null
  // add one nearest stop at a time, start, end, start, end, start, etc...
  // forEach(start.stop), check all the end.stops (& vice versa)
  // stop checking when you've checked at least 6 stops each and all stops within 1/4 mile
  let stops = getNearestStops({start, end, min:12, distance:.25})
  let startStops = []
  let endStops = []

  stops.forEach(stop => {
    if (stop.group) { // stop is an endStop
      endStops.push(stop)
      startStops.forEach(s2 => checkOptions(s2, stop))
    }
    else { // stop is a startStop
      startStops.push(stop)
      endStops.forEach(s2 => checkOptions(stop, s2))
    }
  })
}


// Check our best options!
function checkOptions(startStop, endStop) {

  // Find busLines that go to both stops
  let {arr1:busLines} = intersection(startStop.getBusLines, endStop.getBusLines, 'id') // TODO get the busLines

  busLines.forEach(busLine => {

      // Get next compatible start arrival for a busLine and its respective endArrival
      let arrivals = startStop.arrivals.filterBy(busLine) // TODO
      for (let i = 0; i < arrivals.length; i++) {
        if (arrivals[i].ETA > walkETA(startLocation, startStop)) break // TODO
      }
      let nextCompatibleArrival = arrivals[i]
      let endArrival = endStop.arrivals.filter(nextCompatibleArrival.bus.id, afterNextCompatibleArrival.ETA) // TODO

      // Compare both destinationETA's
      let destinationETA = endArrival.ETA + walkTime(endStop, startStop) // TODO
      let weHaveAWinner = destinationETA < (bestRoute.destinationETA || Infinity)

      // Update the bestRoute
      if (weHaveAWinner) bestRoute = {
        destinationETA,
        arrival: nextCompatibleArrival,
        end: endStop,
      }
  })

}


// Helpers
function getNearestStops({start, end, min, distance}) {
  let startStops = sortStopsByDistanceFrom(start, 0)
  let endStops = sortStopsByDistanceFrom(end, 1)

  let sortedStops = [...startStops, ...endStops].sort((a,b) => a.distance - b.distance)

  // Where to break
  let includedStopIds = []
  for (var i = 0; i < sortedStops.length; i++) {
    if (includedStopIds.contains(sortedStops[i].val.id)) break // no doubles allowed
    if (sortedStops[i].distance > .25 && i+1 > min) break
    includedStopIds.push(sortedStops[i].val.id)
  }

  return sortedStops.slice(0,i)
}

function sortStopsByDistanceFrom(lngLat, group) {
  let stops = allBusStops.map(stop => ({ // TODO get all bus stops
    val: stop,
    group,
    distance: distance(lngLat, stop)
  }))

  return stops.sort((a,b) => a.distance - b.distance)
}

function distance(from, to) {
  let d2 = (from.latitude - to.latitude)^2 + (from.longitude - to.longitude)^2
  return Math.sqrt(d2) * 60.7053 // for miles (hacky)
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

  for (i = 0; i < paths.length; ++i) {
    if (current[paths[i]] === undefined) {
      return undefined;
    } else {
      current = current[paths[i]];
    }
  }
  return current;
}
