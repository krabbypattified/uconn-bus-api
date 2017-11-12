let buildings = JSON.parse(require('fs').readFileSync(require('path').join(__dirname, 'buildings.json'), 'utf8'))
buildings = buildings.map(b => ({
  name: b.name,
  latitude: b.lat,
  longitude: b.lng,
  abbreviation: b.abbr,
  type: 'BUILDING',
}))

export default () => buildings
