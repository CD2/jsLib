import { observable, action } from "mobx"
import axios from "axios"

const get = (url, params) => axios.get(url, { params })
const post = (url, data) => axios.post(url, { data })

const defaultHttp = { get, post }

export class CordStore {
  constructor({ base_url, http_methods, reducer_key = `cord` } = {}) {
    this.base_url = base_url
    this.reducer_key = reducer_key
    this.http_methods = { ...this.http_methods, ...http_methods }

    window.store = this.data
  }

  http_methods = defaultHttp

  request = (method, path, data) => {
    const url = `${this.base_url}/${path}`
    return this.http_methods[method](url, data).then(response => {
      this.processResponse(response.data)
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

  defaultRecord = {
    fetching: false,
    fetched: false,
    fetch_error: false,
    data: {},
  }

  @observable
  data = observable.map({
    articles: {
      ids: {},
      records: {
        1: {
          data: {
            id: 1,
            body: `this si the body`,
          },
          fetching: false,
          fetched: true,
          fetch_error: false,
        },
      },
    },
  })

  getTableData(table_name) {
    if (!this.data.has(table_name)) {
      this.data.set(table_name, {
        records: observable.map(),
        ids: observable.map(),
      })
    }
    return this.data.get(table_name)
  }

  getRecord(cord, id) {
    const records = this.getTableData(cord.table_name).records
    if (!records[id]) {
      records.id = this.defaultRecord
    }
    return records[id]
  }

  @action
  fetchRecord(cord, id, { attributes = [], reload = false } = {}) {
    this.getRecord(cord, id).fetching = true
    const path = this.recordsPath(cord.path_name)
    this.get(path, { ids: id, attributes })
      .then(
        action(`FetchRecordFulfilled`, response => {
          this.getRecord(cord, id).fetching = false
          this.getRecord(cord, id).fetched = true
          this.getRecord(cord, id).fetch_error = false
        }),
      )
      .catch(
        action(`FetchRecordRejected`, error => {
          console.error(error, error)
          this.getRecord(cord, id).fetching = false
          this.getRecord(cord, id).fetch_error = true
        }),
      )
  }

  //
  // getDataKey(data) {
  //   return JSON.stringify(data)
  // }
  //
  // fetchIds(cord, data) {
  //   if (!this.idsLoaded(cord, data)) {
  //     const path = this.idsPath(cord.path)
  //     return this.get(path, data)
  //   }
  // }
  //
  // fetchIdsReturnPromise(cord, data) {
  //   return this.fetchIds(cord, data) || Promise.resolve(this.getIds(cord, data))
  // }
  //
  // getIds(cord, data) {
  //   // const key = this.getDataKey(data)
  //   return this.getTableData(cord.table_name).ids.get(data.scope)
  // }
  //
  // idsLoaded(cord, data) {
  //   // const key = this.getDataKey(data)
  //   return this.getTableData(cord.table_name).ids.has(data.scope)
  // }
  //
  // fetchRecord(cord, id, attributes=[], { reload=false }={}) {
  //   if (reload || !this.isRecordLoaded(cord, id, attributes)) {
  //     const path = this.recordsPath(cord.path)
  //     this.get(path, { ids: id, attributes })
  //   }
  // }
  //
  // getRecord(cord, id) {
  //   return this.getTableData(cord.table_name).records.get(id)
  // }
  //
  // isRecordLoaded(cord, id, attributes=[]) {
  //   const { records } = this.getTableData(cord.table_name)
  //
  //   if (!records.has(id)) return false
  //   const loaded_attributes = Object.keys(records.get(id))
  //   return attributes.every(attr => loaded_attributes.includes(attr))
  // }
  //
  // isRecordLoading(cord, id) {
  //   return true
  // }
  //
  // hasRecordErrored(cord, id) {
  //   return false
  // }
  //
  processResponse = data => {
    Object.entries(data).forEach(([table_name, responseData]) => {
      const table_data = this.getTableData(table_name)

      //IDS
      if (responseData.hasOwnProperty(`ids`)) {
        Object.entries(responseData.ids).map(([scope_name, ids]) => {
          return table_data.ids.set(scope_name, ids)
        })
      }

      //RECORDS
      if (responseData.hasOwnProperty(`records`)) {
        responseData.records.map(record => {
          const record_data = table_data.records[record.id]
          const new_record = { ...record_data, ...record }
          return (table_data.records[record.id].data = new_record)
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
