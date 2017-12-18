import { post, del, put, clearApiHeaders } from 'lib/utils/api_http'
import { redirect } from 'lib/utils/router'

export const signIn = (params) => {
  return post(`/auth/sign_in`, params).then(response => response.data)
}

const afterSignOut = () => redirect(`/`, { reload: true })

export const signOut = () => {
  clearApiHeaders()
  return del(`/auth/sign_out`).then(() => afterSignOut()).catch(() => afterSignOut())
}

export const signUp = (values) => {
  return post(`/auth`, values)
}

export const recoverPassword = (values) => {
  return post(`/auth/password`, values)
}

export const resetPassword = (values) => {
  return put(`/auth/password`, values, { send_tokens: false })
}
