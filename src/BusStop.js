import {getArrivalsAtBusStop, getLinesByIds} from './connector'
import Arrival from './Arrival'
import BusLine from './BusLine'

export default class BusStop {

	constructor(args) {
		Object.assign(this, args)
	}

	async arrivals() {
		return (await getArrivalsAtBusStop(this)).map(arrivals => new Arrival(arrivals))
	}

	async busLines() {
		return (await getLinesByIds(this.busLineIds)).map(line => new BusLine(line))
	}
}
