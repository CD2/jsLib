import { observable } from "mobx"

export class Record {
  @observable fetching = false
  @observable fetched = false
  @observable fetch_error = false
  @observable id = null
  @observable data = {}

  constructor(cord) {
    this.cord = cord
  }

  reload() {
    this.fetch({ reload: true })
  }

  fetch({ reload = false } = {}) {
    if (this.fetching || (this.fetched && !reload)) return null
  }

  hasAttributes(attributes) {
    return this.missingAttributes.length === 0
  }

  missingAttributes(attributes) {
    return Object.keys(this.data).filter(key => attributes.indexOf(key) === -1)
  }
}
export default Record
