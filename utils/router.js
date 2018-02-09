import React from "react"
import createHistory from "history/createBrowserHistory"
export const history = createHistory()

//scroll to top on page change
history.listen((location, action) => {
  const cont = document.querySelector(`.main-area`)
  if (cont) cont.scrollTop = 0
})

export const redirect = (url, { reload = false, state = {} } = {}) => {
  reload ? (window.location.href = url) : history.push(url, state)
}

export const renderComponent = (Component, default_props = {}) => {
  const ComponentWithParams = loc => {
    const { params } = loc.match
    Object.entries(params).forEach(([key, value]) => {
      const int_param = parseInt(value, 10)
      params[key] = isNaN(value) ? value : int_param
    })
    return React.createElement(Component, { ...default_props, ...params })
  }
  return ComponentWithParams
}

export const routes = {
  sessions: {
    sign_in: `/sign_in`,
    sign_up: `/sign_up`,
    password_recovery: `/password/new`,
    password_reset: `/password/edit`,
  },

  profile: (profile_id, section = ``) => `/profiles/${profile_id}/${section}`,

  groups: () => `/groups`,
  group: (id, section = ``) => `${routes.groups()}/${id}/${section}`,

  companies: (path = `/`) => `/companies${path}`,
  company: (id, section = ``) => routes.companies(`/${id}/${section}`),

  forum: () => `/forum`,
  forum_question: id => `${routes.forum()}/question/${id}`,
  forum_answer: id => `${routes.forum()}/answer/${id}`,
}
