import {getStopsByIds} from './connector'
import BusStop from './BusStop'

export default class BusLine {

	constructor(args) {
		Object.assign(this, args)
	}

	async stops() {
		return (await getStopsByIds(this.stopIds)).map(stop => new BusStop(stop))
	}
}
