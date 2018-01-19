import { observable, action, computed } from "mobx"
import { get } from "lib/utils/api_http"
export default class Query {
  @observable fetching = false
  @observable fetched = false
  @observable error = false
  @observable _data = observable.box()

  @computed
  get data() {
    return this._data.get()
  }
  set data(value) {
    this._data.set(value)
  }

  constructor({ name, path, onSuccess, onError, initialValue }) {
    this.name = name
    this.path = path
    this.data = initialValue
    this.fulfilled = onSuccess || this.defaultSuccess
    this.rejected = onError || this.defaultError
  }

  @action.bound
  fetch({ reload = false, ...data } = {}) {
    //either currently fetching or already fetched and meant to reload data
    if (this.fetching || (this.fetched && !reload)) return
    this.fetching = true
    get(this.path, data)
      .then(
        action(`${this.name}Fulfilled`, response => {
          this.fetching = false
          this.fetched = true
          this.data = this.fulfilled(response, this)
        }),
      )
      .catch(
        action(`${this.name}Rejected`, error => {
          this.fetching = false
          this.error = true
          this.rejected(error, this)
        }),
      )
  }

  reload() {
    this.execute({ reload: true })
  }

  defaultSuccess = response => {
    return response.data
  }

  defaultError = error => {
    console.error(error)
  }
}
