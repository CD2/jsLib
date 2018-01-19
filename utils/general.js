import moment from "moment"

// export function dateFormat(dateString) {
//   return new moment(dateString).format('Do MMMM YYYY');
// }
//
// export function dateTimeFormat(dateString) {
//   return new moment(dateString).format('kk:ss, Do MMMM YYYY');
// }
//
// export function humanizeSeconds(seconds) {
//   return moment.duration(seconds, 'seconds').humanize();
// }
//
// export function timeAgoInWords(dateString) {
//   return new moment(dateString).fromNow();
// }
export function secondsToTime(seconds) {
  return moment.utc(seconds * 1000).format(`mm\\m ss\\s`)
}
