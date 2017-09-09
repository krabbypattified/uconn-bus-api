import {getBusById, getStopByAltId} from './connector'
import Bus from './Bus'
import BusStop from './BusStop'

export default class Arrival {

	constructor(args) {
		Object.assign(this, args)
	}

	async bus() {
		return new Bus(await getBusById(this.busId))
	}

	async stop() {
		return new BusStop(await getStopByAltId(this.busStopAltId))
	}
}
