import { post, del, put, clearApiHeaders } from "lib/utils/api_http"
import { redirect } from "lib/utils/router"
import { Session } from  'utils/store'

export const signIn = params => {
  return Session.signIn(params).then(response => response.data)
}

const afterSignOut = () => {
  clearApiHeaders()
  redirect(`/`, { reload: true })
}

export const signOut = () => {
  return Session.signOut().
    then(() => afterSignOut()).
    catch(() => afterSignOut())
}

export const signUp = values => {
  return post(`/auth`, values)
}

