import connectIds from './connections/ids'
import connectIdFetcher from './connections/id_fetcher'
import connectRecord from './connections/record'
import connectFields from './connections/fields'

export class Cord {

  constructor(name, { path, table_name, prop, as }={}) {
    this.name = name
    this.path = path !== undefined ? path : name
    this.table_name = table_name !== undefined ? table_name : name
    this.defaultAs = as !== undefined ? as : name
    this.defaultPropName = prop !== undefined ? prop : `${name}_id`
  }

  setup_store = (store) => this.store = store

  perform(action, data) {
    const url = this.store.actionsPath(this.path, action)
    return this.store.post(url, data)
  }

  connectIds = connectIds
  connectIdFetcher = connectIdFetcher
  connectRecord = connectRecord
  connectFields = connectFields

}
export default Cord
