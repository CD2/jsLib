import { TimeLineEntry } from "utils/store"
export default function activityPing() {
  if (process.env.NODE_ENV === `development`) return null
  TimeLineEntry.perform(`ping`, {
    page: window.location.pathname,
  })
}
