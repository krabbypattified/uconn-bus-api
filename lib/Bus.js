import {getArrivals, getLineById} from './connector'
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
		return (await getArrivals()).map(arrival => new Arrival(arrival))
	}
}
