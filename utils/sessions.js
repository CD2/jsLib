import { post, del, put, clearApiHeaders } from "lib/utils/api_http"
import { redirect } from "lib/utils/router"
import session from  'stores/session'

export const signIn = params => {
  return session.signIn(params).then(response => response.data)
}

export const signOut = () => {
  return session.signOut()
}

export const signUp = values => {
  return post(`/auth`, values)
}

