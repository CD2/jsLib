import { observable, reaction } from 'mobx'

//when a pending request is added
// start a timer
// when timer completes
// pull all pending requests
// create one big request (or many if not compatible)
// send request
// update each batch request with response attribute

const batch_request_store = observable([])
let batch_request_timer = null
//batch request in progress
reaction(
  () => batch_request_store.length,
  () => {
    if (batch_request_timer !== null) return
    batch_request_timer = setTimeout(perform_batch_request, 1000)
  }
)

const perform_batch_request = () => {
  const requests = batch_request_store.slice()
  batch_request_store.clear()
  requests.forEach(request => {
    const data = request.get(`data`)

    request.set(`response`, `${data}${data}`)
  })
}

//new batch_request
export default (data) => {
  return new Promise((resolve, reject) => {
    const request = observable.map({ data })
    request.observe((...args) => {
      const response = request.get(`response`)
      resolve(response)
    })
    batch_request_store.push(request)
  })
}
