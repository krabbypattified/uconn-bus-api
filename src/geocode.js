import fetch from './cache'


export default async ({lngLat: {latitude, longitude}}) => {

  let res = await fetch({
    root: 'https://maps.googleapis.com/maps/api/geocode/json',
    query: {
      key: 'AIzaSyBu1M4nRFBnEWQm4lsehWPFegNpED7q4DA',
      latlng: `${latitude},${longitude}`,
      result_type: 'premise|street_address'
    }
  })

  if (res.status !== 'OK') return

  return Place(res.results)
}




// Helpers
function Place(data) {
  let places = data.map(place => new SubPlace(place))

  // Nullify place if no SubPlace exists
  for (let i = 0; i < places.length; i++) {
    if (places[i].exists) break
    if (i = places.length - 1) return null
  }

  // SubPlace fallback getter
  return new Proxy(places, {
    get(target, prop) {

      // Address prop
      if (prop === 'address') {
        let address = {}
        for (let key in places[0].address) {
          for (let i = 0; i < Object.keys(places[0].address).length; i++) {
            let value = places[i].address[key]
            if (value) {
              address[key] = value
              break
            }
            address[key] = null
          }
        }
        return address
      }

      // Regular props
      for (let i = 0; i < places.length; i++) {
        let value = places[i][prop]
        if (value) return value
      }

      return null
    }
  })
}


class SubPlace {

  constructor(place) {

    this.place = place

    Object.assign(this, {
      premise: this.get('premise'),
      latitude: this.get('latitude'),
      longitude: this.get('longitude'),
      address: {
        number: this.get('street_number'),
        street: this.get('route'),
        city: this.get('neighborhood', 'locality', 'political'),
        state: this.get('administrative_area_level_1'),
        country: this.get('country'),
        zip: this.get('postal_code'),
      }
    })

    this.exists = this.premise || this.address.street || this.address.city

    if (!this.exists) return
    else if (this.premise) this.name = this.premise
    else if (this.address.number) this.name = `${this.address.number} ${this.address.street}`
    else if (this.address.street) this.name = this.address.street
    else if (this.address.city) this.name = this.address.city

  }

  get(...fallbacks) {
    for (let i = 0; i < fallbacks.length; i++) {
      if (fallbacks[i] === 'latitude') return this.place.geometry.location.lat
      if (fallbacks[i] === 'longitude') return this.place.geometry.location.lng
      let value = this.place.address_components.filter(c => c.types.includes(fallbacks[i]))[0]
      if (value) return value.short_name || value.long_name
    }
    return null
  }

}
