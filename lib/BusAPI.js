import {getLiveBusStats, getLines, getStops} from './connector'
import Bus from './Bus'
import BusLine from './BusLine'
import BusStop from './BusStop'

export default class BusAPI {

	static async getBuses() {
		return (await getLiveBusStats()).map(bus => new Bus(bus))
	}

	static async getBusLines() {
		return (await getLines()).map(line => new BusLine(line))
	}

	static async getBusStops() {
		return (await getStops()).map(stop => new BusStop(stop))
	}
}
