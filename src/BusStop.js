import {getArrivalsAtBusStop, getLinesByIds} from './connector'
import Arrival from './Arrival'
import BusLine from './BusLine'

export default class BusStop {

	constructor(args) {
		Object.assign(this, args)
	}

	async arrivals({before, limit}) {
		let arrivals = await getArrivalsAtBusStop(this)
    if (before) arrivals = arrivals.filter(a => a.time < before)
    if (limit) arrivals = arrivals.slice(0, limit)
    return arrivals.map(arrivals => new Arrival(arrivals))
	}

	async busLines() {
		return (await getLinesByIds(this.busLineIds)).map(line => new BusLine(line))
	}
}
