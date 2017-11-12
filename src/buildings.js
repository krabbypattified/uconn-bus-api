let buildings = JSON.parse(require('fs').readFileSync(require('path').join(__dirname, 'buildings.json'), 'utf8'))
export default () => buildings
