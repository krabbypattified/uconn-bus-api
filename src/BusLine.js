import {getStopsByIds, getLiveBusStats} from './connector'
import Bus from './Bus'
import BusStop from './BusStop'

export default class BusLine {

	constructor(args) {
		Object.assign(this, args)
	}

	async stops() {
		return (await getStopsByIds(this.stopIds)).map(stop => new BusStop(stop))
	}

	async buses() {
		return (await getLiveBusStats()).filter(bus => this.id === bus.busLineId).map(bus => new Bus(bus))
	}
}
