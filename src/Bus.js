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

	async arrivals() {
		return (await getArrivalsForBus(this)).map(arrival => new Arrival(arrival))
	}
}
