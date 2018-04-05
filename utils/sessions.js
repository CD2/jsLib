import { post, del, put, clearApiHeaders } from "lib/utils/api_http"
import { redirect } from "lib/utils/router"

export const signIn = params => {
  return post(`/auth/sign_in`, params).then(response => response.data)
}

const afterSignOut = () => {
  clearApiHeaders()
  redirect(`/`, { reload: true })
}

export const signOut = () => {
  return del(`/auth/sign_out`).
    then(() => afterSignOut()).
    catch(() => afterSignOut())
}

export const signUp = values => {
  return post(`/auth`, values)
}

