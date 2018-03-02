import { get } from "lib/utils/http"
import memoize from "lodash/memoize"

export function hasGeolocation() {
  return !!navigator.geolocation
}

export function getGeolocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) reject({ message: `unsupported` })
    navigator.geolocation.getCurrentPosition(
      result => {
        const { latitude, longitude, accuracy } = result.coords
        resolve({ lat: latitude, lng: longitude, accuracy })
      },
      error => {
        reject({ message: error.message })
      },
    )
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
const geolocationToPostcode = memoize(_geolocationToPostcode, ({ lat, lng }) => `${lat}${lng}`)
export { geolocationToPostcode }

const api_key = `AIzaSyAc2UY3q7g6gu8A3_ySkY02YrNeYpSfs3o`
const google_url = `https://maps.googleapis.com/maps/api/geocode/json?`
function _googleAddress(address) {
  const url = `${google_url}${encodeURI(address)}&key=${encodeURI(api_key)}`
  return get(url).then(response => {
    if (response.data.status === `ZERO_RESULTS`) {
      return []
    }
    return response.data.results[0].address_components
  })
}
const googleAddress = memoize(_googleAddress)
export { googleAddress }
