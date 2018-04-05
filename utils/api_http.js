import axios from "axios"
import { redirect } from "lib/utils/router"
import API_ROUTE from "constants/api_host"
import STORAGE from "constants/storage"
import qs from "qs"

const api_auth_keys = [`access-token`, `client`, `expiry`, `token-type`, `uid`]
const key_prefix = `auth_`

export const getApiHeaders = () => {
  const headers = {}
  try {
    api_auth_keys.forEach(key => (headers[key] = STORAGE.getItem(`${key_prefix}${key}`)))
  } catch (e) {
    console.error(`Cant obtain headers`, e)
  }

  return headers
}

export const setApiHeaders = headers => {
  if (headers.hasOwnProperty(`access-token`)) {
    api_auth_keys.forEach(key => STORAGE.setItem(`${key_prefix}${key}`, headers[key]))
  }
}

export const clearApiHeaders = () => {
  try {
    api_auth_keys.forEach(api_auth_keys.forEach(key => STORAGE.removeItem(`${key_prefix}${key}`)))
  } catch (e) {
    console.error(`Cant obtain headers`, e)
  }
}

export const buildUrl = (parts, params = {}) => {
  let url
  if (parts.indexOf(`http://`) === 0) url = parts
  else {
    parts = Array.isArray(parts) ? parts.map(part => part.trim(`/`)) : [parts.trim(`/`)]
    parts.unshift(API_ROUTE.trim(`/`))
    url = parts.join(``)
  }
  if (Object.keys(params).length > 0) url += `?${qs.stringify(params)}`
  return url
}

export const request = (
  method,
  path,
  { headers = {}, data, process_data = true, send_tokens = true, ...options } = {},
) => {
  const url = buildUrl(path)
  if (send_tokens) headers = { ...headers, ...getApiHeaders() }

  return axios({ method, url, ...options, data, headers }).
    then(response => {
      setApiHeaders(response.headers)
      return response
    }).
    catch(error => {
      console.error(error.status, error)
      if (error.status === 401) redirect(`/`, { reload: true })
      else throw error
    })
}
export const get = (path, params = {}) => request(`get`, path, { params })
export const post = (path, data = {}, options) => request(`post`, path, { data, ...options })
export const del = (path, data = {}, options) => request(`delete`, path, { data, ...options })

export const apiRoute = API_ROUTE
