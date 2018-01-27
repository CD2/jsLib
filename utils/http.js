import axios from "axios"
import qs from "qs"
import memoize from "lodash/memoize"
import objectToFormData from "object-to-formdata"

const request = (method, url, data) => {
  console.warn(`Non api request sending`)

  return axios({ method, url, data, headers: { "X-CSRF-Token": window._token }})
}

export const get = (url, params = {}) => {
  console.warn(`Non api request sending`)
  return axios.get(url, { params })
}
export const post = (url, data = {}, { process = true } = {}) => {
  if (process) data = objectToFormData(data)
  return request(`post`, url, data)
}
export const put = (url, data = {}, { process = true } = {}) => {
  if (process) data = objectToFormData(data)
  return request(`put`, url, data)
}
export const del = (url, data = {}) => request(`delete`, url, data)

export const getUrlSearch = memoize((search = window.location.search) => {
  const parsedSearch = qs.parse(search, { ignoreQueryPrefix: true })
  const normalizedSearch = {}
  Object.entries(parsedSearch).forEach(([key, value]) => {
    key = key.startsWith(`?`) ? key.slice(1) : key
    normalizedSearch[key] = value
  })
  return normalizedSearch
})

export const getSubdomain = () => {
  const parts = window.location.hostname.split(`.`)
  return parts.length >= 3 ? parts[0] : null
}

export const getHostWithoutSubdomain = () => {
  let url = window.location.host
  url = url.replace(/(https?:\/\/)?(www.)?/i, ``)

  const last_thing = url.match(/((\.co\.uk|\.com|\.me|\.uk).*$)/, ``)[1]
  url = url.replace(/(\.co\.uk|\.com|\.me).*$/, ``)

  url = url.split(`.`)
  url = url[url.length - 1]
  return `${url}${last_thing}`
}