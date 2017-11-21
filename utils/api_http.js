import axios from 'axios'
import { redirect } from 'utils/router'
import objectToFormData from 'object-to-formdata'
import API_ROUTE from 'constants/api_host'
import qs from 'qs'

const api_auth_keys = [`access-token`, `client`, `expiry`, `token-type`, `uid`]
const key_prefix = `auth_`
const getApiHeaders = () => {
  const headers = {}
  api_auth_keys.forEach(key => headers[key] = localStorage.getItem(`${key_prefix}${key}`))
  return headers
}

export const setApiHeaders = (headers) => {
  if (headers.hasOwnProperty(`access-token`)) {
    api_auth_keys.forEach(key => localStorage.setItem(`${key_prefix}${key}`, headers[key]))
  }
}

export const clearApiHeaders = () => {
  api_auth_keys.forEach(key => localStorage.removeItem(`${key_prefix}${key}`))
}

export const buildUrl = (parts, params={}) => {
  parts = Array.isArray(parts) ? parts.map(part => part.trim(`/`)) : [parts.trim(`/`)]
  parts.unshift(API_ROUTE.trim(`/`))
  let url = parts.join(``)
  if (Object.keys(params).length > 0) url += `?${qs.stringify(params)}`
  return url
}

export const request = (
  method,
  path,
  { headers={}, data, process_data=true, send_tokens=true, ...options }={}
) => {
  const url = buildUrl(path)
  if (send_tokens) headers = { ...headers, ...getApiHeaders() }
  if (process_data && data) data = objectToFormData(data)

  return axios({ method, url, ...options, data, headers }).then(response => {
    setApiHeaders(response.headers)
    return response
  }).catch(error => {
    console.error(error.status, error)
    if (error.status === 401) redirect(`/`, { reload: true })
    else throw error
  })
}
export const get = (path, params={}) => request(`get`, path, { params })
export const post = (path, data={}, options) => request(`post`, path, { data, ...options })
export const put = (path, data={}, options) => request(`put`, path, { data, ...options })
export const del = (path, data={}, options) => request(`delete`, path, { data, ...options })

export const apiRoute = API_ROUTE
