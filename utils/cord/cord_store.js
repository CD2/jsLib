import { observable, reaction } from 'mobx'
import axios from 'axios'

const get = (url, params) => axios.get(url, { params })
const post = (url, data) => axios.post(url, { data })

const defaultHttp = { get, post }

export class CordStore {

  constructor({ base_url, http_methods, reducer_key=`cord` }={}) {
    this.base_url = base_url
    this.reducer_key = reducer_key
    this.http_methods = { ...this.http_methods, ...http_methods }

    this.setup_batching_listener()
    window.store = this.data
  }


  //when a pending request is added
  // start a timer
  // when timer completes
  // pull all pending requests
  // create one big request (or many if not compatible)
  // send request
  // update each batch request with response attribute

  batch_request_store = observable([])
  batch_request_timer = null
  //batch request in progress
  setup_batching_listener() {
    reaction(
      () => this.batch_request_store.length,
      () => {
        if (this.batch_request_store.length === 0) return
        if (this.batch_request_timer !== null) return
        this.batch_request_timer = setTimeout(this.perform_batch_request, 10)
      }
    )
  }

  perform_batch_request = () => {
    this.batch_request_timer = null
    const requests = this.batch_request_store.slice()
    this.batch_request_store.clear()
    const requests_to_make = this.merge_requests(requests)
    Object.entries(requests_to_make).forEach(([path, data]) => {
      this.get(path, data)
    })
  }


  new_record_batch = (request) => {
    this.batch_request_store.push(request)
  }


  /*
   [
    { path, ids, attributes }
   ]
 */
  merge_requests = (requests) => {
    return requests.reduce((grouped, request) => {
      const { path } = request
      grouped[path] = grouped[path] || { ids: [], attributes: [], scope: [] }
      grouped[path].attributes = [...new Set([...grouped[path].attributes, ...request.attributes])]

      if (request.ids) grouped[path].ids = [...new Set([...grouped[path].ids, ...request.ids])]
      if (request.scope) grouped[path].scope = [...new Set([...grouped[path].scope, ...request.scope])]
      return grouped
    }, {})
  }


  http_methods = defaultHttp

  request = (method, path, data) => {
    const url = `${this.base_url}/${path}`
    return this.http_methods[method](url, data).then(response => {
      if (response.data) this.processResponse(response.data, data)
      return response.data
    })
  }

  get = (...args) => {
    return this.request(`get`, ...args)
  }

  post = (...args) => {
    return this.request(`post`, ...args)
  }

  idsPath(base_path) {
    return `${base_path}/ids`
  }

  fieldsPath(base_path) {
    return `${base_path}/fields`
  }

  recordsPath(base_path) {
    return base_path
  }

  actionsPath(base_path, action_name) {
    return `${base_path}/perform/${action_name}`
  }

  cords = []

  register(cord) {
    this.cords.push(cord)
    cord.setup_store(this)
  }

  @observable data = {}

  getTableData(table_name) {
    if (!this.data.hasOwnProperty(table_name)) {
      this.data[table_name] = { records: observable.shallowMap(), ids: observable.map() }
    }
    return this.data[table_name]
  }

  getDataKey(data) {
    return JSON.stringify(data)
  }

  fetchIds(cord, data) {
    if (!this.idsLoaded(cord, data)) {
      const path = this.idsPath(cord.path)
      return this.get(path, data)
    }
  }

  fetchFields(cord, attributes=[], { reload=false, scope=`all` }={}) {
    const hasScope = this.idsLoaded(cord, { scope })
    const scopeIds = hasScope ? this.getIds(cord, { scope }) : null
    const firstRecordOfScopeId = scopeIds && scopeIds.length > 0 ? scopeIds.get(0) : null // TODO other record could have more attributes loaded
    const hasAttributes = firstRecordOfScopeId && this.isRecordLoaded(cord, firstRecordOfScopeId, attributes)

    if (reload || (!hasScope || !hasAttributes)) {
      const path = this.fieldsPath(cord.path)

      this.new_record_batch({ path, attributes, scope: [scope] })
    }
  }

  fetchIdsReturnPromise(cord, data) {
    return this.fetchIds(cord, data) || Promise.resolve(this.getIds(cord, data))
  }

  getIds(cord, data) {
    // const key = this.getDataKey(data)
    return this.getTableData(cord.table_name).ids.get(data.scope)
  }

  idsLoaded(cord, data) {
    // const key = this.getDataKey(data)
    return this.getTableData(cord.table_name).ids.has(data.scope)
  }

  fetchRecord(cord, id, attributes=[], { reload=false }={}) {
    if (reload || !this.isRecordLoaded(cord, id, attributes)) {
      const path = this.recordsPath(cord.path)
      id = Array.isArray(id) ? id : [id]
      this.new_record_batch({ path, ids: id, attributes })
    }
  }

  getRecord(cord, id) {
    return this.getTableData(cord.table_name).records.get(id)
  }

  isRecordLoaded(cord, id, attributes=[]) {
    const { records } = this.getTableData(cord.table_name)

    if (!records.has(id)) return false
    const loaded_attributes = Object.keys(records.get(id))
    return attributes.every(attr => loaded_attributes.includes(attr))
  }

  isRecordLoading(cord, id) {
    return true
  }

  hasRecordErrored(cord, id) {
    return false
  }

  processResponse = (data, request) => {
    Object.entries(data).forEach(([table_name, singleCordData]) => {
      const table_data = this.getTableData(table_name)

      //IDS
      if (singleCordData && singleCordData.hasOwnProperty(`ids`)) {
        Object.entries(singleCordData.ids).map(([scope_name, ids]) => {
          return table_data.ids.set(scope_name, ids)
        })
      }

      //RECORDS
      if (singleCordData && singleCordData.hasOwnProperty(`records`)) {
        singleCordData.records.map(record => {
          const record_data = table_data.records.get(record.id)
          const new_record = { ...record_data, ...record }
          return table_data.records.set(record.id, new_record)
        })
      }

      //FIELDS
      if (singleCordData && singleCordData.hasOwnProperty(`fields`)) {
        Object.entries(singleCordData.fields).map(([scope_name, records]) => {
          const ids = records.map(record => {
            //store records
            const record_data = table_data.records.get(record.id)
            const new_record = { ...record_data, ...record }
            table_data.records.set(record.id, new_record)
            return record.id
          })

          //store ids
          table_data.ids.set(scope_name, ids)
        })
      }
    })
  }

  // initialState() {
  //   const cordInitialState = {
  //     records: {},
  //     ids: {},
  //   }
  //   const state = {}
  //   this.cords.forEach(cord => {
  //     state[cord.table_name] = {...cordInitialState}
  //   })
  //   return state
  // }


}
export default CordStore
