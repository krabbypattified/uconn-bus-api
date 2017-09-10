import {getArrivalsAtBusStop} from './connector'
import Arrival from './Arrival'

export default class BusStop {

	constructor(args) {
		Object.assign(this, args)
	}

	async arrivals() {
		return (await getArrivalsAtBusStop(this)).map(arrivals => new Arrival(arrivals))
	}
}
