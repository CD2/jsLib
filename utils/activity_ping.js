import { post } from "lib/utils/api_http"

export default function activityPing() {
  if (process.env.NODE_ENV === `development`) return null
  post(`/api/v2/time_line_entries/perform/ping`, {
    page: window.location.pathname,
  })
}
