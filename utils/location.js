import { get } from 'lib/utils/http'
import memoize from 'lodash/memoize'

export function hasGeolocation() {
  return !!navigator.geolocation
}

export function getGeolocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) reject({ message: `unsupported` })
    navigator.geolocation.getCurrentPosition((result) => {
      const { latitude, longitude, accuracy } = result.coords
      resolve({ lat: latitude, lng: longitude, accuracy })
    }, (error) => {
      reject({ message: error.message })
    })
  })
}

const base_url = `https://api.postcodes.io/postcodes`

function _postcodeToGeolocation(postcode) {
  const url = `${base_url}/${encodeURI(postcode)}`
  return get(url).then(response => {
    const { latitude, longitude } = response.data.result
    return { lat: latitude, lng: longitude, accuracy: response.data.quality }
  })
}
const postcodeToGeolocation = memoize(_postcodeToGeolocation)
export { postcodeToGeolocation }

export function _geolocationToPostcode({ lat, lng }) {
  return new Promise((resolve, reject) => {
    get(base_url, { lat, lon: lng }).then(response => {
      const results = response.data.result
      if (!results) {
        reject({ msg: `unknown postcode` })
      } else {
        resolve(results[0].postcode)
      }
    })
  })
}
const geolocationToPostcode = memoize(_geolocationToPostcode, ({ lat, lng })=>`${lat}${lng}`)
export { geolocationToPostcode }
