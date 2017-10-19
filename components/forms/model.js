import { observable, action, computed, toJS } from 'mobx'
import { validateForm } from 'lib/components/forms'

export default class Model {

  @observable values = observable.shallowMap()
  @observable changes = observable.shallowMap()
  @observable errors = observable.shallowMap()

  @computed get completeValues() {
    const full = observable.shallowMap(toJS(this.values))
    full.merge(this.changes)
    return full
  }

  constructor({ values={}, onSave, validations, ...options }={}) {
    this.values.replace(values)
    if (onSave !== undefined) this.onSave = onSave
    if (validations) this.validations = validations
    this.options = options
  }

  get(key) {
    return this.changes.has(key) ? this.changes.get(key) : this.values.get(key)
  }

  getAll() {
    return toJS(this.changes)
  }

  getError(key) {
    return this.errors.get(key)
  }

  @action set(key, value) {
    this.changes.set(key, value)
  }

  @action valid() {
    if (!this.validations) return true
    const errors = validateForm(this.completeValues, this.validations)

    this.errors.replace(errors)
    return Object.keys(errors).length === 0
  }

  save(options = null) {
    if (!this.valid()) return
    this.onSave(toJS(this.changes), options)
  }

  create(options=null) {
    if (!this.valid()) return
    this.onCreate(toJS(this.changes), options)
  }

  reset(newValues) {
    this.changes.clear()
    if (newValues) this.values.replace(newValues)
  }

  onSave(values) {
    throw new Error(`Must provide an onSave method to the model`)
  }

}
