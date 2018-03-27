import React from "react"
import createHistory from "history/createBrowserHistory"
export const history = createHistory()

export const redirect = (url, { reload = false, state = {}} = {}) => {
  reload ? (window.location.href = url) : history.push(url, state)
}

export const renderComponent = (Component, default_props = {}) => {
  return loc => { //eslint-disable-line
    const { params } = loc.match
    Object.entries(params).forEach(([key, value]) => {
      const int_param = parseInt(value, 10)
      params[key] = isNaN(value) ? value : int_param
    })
    return React.createElement(Component, { ...default_props, ...params })
  }
}
