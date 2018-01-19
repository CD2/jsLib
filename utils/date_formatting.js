import moment from "moment"

export function dateFormat(dateString) {
  if (!dateString) return null
  return new moment(dateString).format(`Do MMMM YYYY`)
}

export function shortDateFormat(dateString) {
  if (!dateString) return null
  return new moment(dateString).format(`DD/MM/YYYY`)
}

export function timeFormat(dateString) {
  if (!dateString) return null
  return new moment(dateString).format(`kk:ss`)
}

export function dateTimeFormat(dateString) {
  if (!dateString) return null
  return new moment(dateString).format(`kk:ss, Do MMMM YYYY`)
}

export function humanizeSeconds(seconds) {
  return moment.duration(seconds, `seconds`).humanize()
}

export function timeAgoInWords(dateString) {
  return new moment(dateString).fromNow()
}
export function secondsToTime(seconds) {
  return moment.utc(seconds * 1000).format(`mm\\m ss\\s`)
}
