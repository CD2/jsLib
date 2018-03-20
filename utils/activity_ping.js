import { post } from "lib/utils/api_http"
import TimeLineEntry from "models/TimeLineEntry"
export default function activityPing() {
  if (process.env.NODE_ENV === `development`) return null
  TimeLineEntry.perform(`ping`, {
    page: window.location.pathname,
  })
}
