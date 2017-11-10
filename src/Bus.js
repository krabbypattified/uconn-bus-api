import {getArrivalsForBus, getLineById} from './connector'
import BusLine from './BusLine'
import Arrival from './Arrival'

export default class Bus {

	constructor(args) {
		Object.assign(this, args)
	}

	async busLine() {
		return new BusLine(await getLineById(this.busLineId))
	}

  async arrivals({before, limit}) {
		let arrivals = await getArrivalsAtBusStop(this)
    if (before) arrivals = arrivals.filter(a => a.time < before)
    if (limit) arrivals = arrivals.slice(0, limit)
    return arrivals.map(arrivals => new Arrival(arrivals))
	}
}
