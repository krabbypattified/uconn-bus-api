import {getLiveBusStats, getLines, getStops, getBusById, getLineById, getStopById} from './connector'
import Bus from './Bus'
import BusLine from './BusLine'
import BusStop from './BusStop'

export default class BusAPI {

	static async getBuses({id}) {
		return new Bus(await getBusById(id))
	}

	static async getBuses() {
		return (await getLiveBusStats()).map(bus => new Bus(bus))
	}

	static async getBusLines({id}) {
		return new BusLine(await getLineById(id))
	}

	static async getBusLines() {
		return (await getLines()).map(line => new BusLine(line))
	}

	static async getBusStop({id}) {
		return new BusStop(await getStopById(id))
	}

	static async getBusStops() {
		return (await getStops()).map(stop => new BusStop(stop))
	}
}
