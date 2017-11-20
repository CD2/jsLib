import { redirect } from 'utils/router'
import flashStore from 'stores/flash'
import { observable, action, computed, toJS } from 'mobx'
import { validateForm } from 'lib/components/forms'

export default class FormModel {

  @observable values = observable.shallowMap()
  @observable changes = observable.shallowMap()
  @observable errors = observable.shallowMap()

  @computed get completeValues() {
    const full = observable.shallowMap(toJS(this.values))
    full.merge(this.changes)
    return full
  }

  constructor({ fields, options }={}) {
    this.values.replace(options.values || {})

    const validations = fields.reduce((newValidations, field) => {
      newValidations[field.name] = field.validations || {}
      return newValidations
    }, {})

    if (Object.keys(validations).length > 0) this.validations = validations
    if (options.onSave) this.onSave = options.onSave
    this.options = options
  }

  get(key) {
    return this.changes.has(key) ? this.changes.get(key) : this.values.get(key)
  }

  getError(key) {
    return this.errors.get(key)
  }

  getErrors() {
    return toJS(this.errors)
  }

  getChanges() {
    return toJS(this.changes)
  }

  @action set(key, value) {
    this.changes.set(key, value)
  }

  @action valid() {
    if (!this.validations) return true
    const { onError } = this.options
    const errors = validateForm(this.completeValues, this.validations)
    const hasErrors = Object.keys(errors).length === 0

    this.errors.replace(errors)
    onError && onError(errors)

    return hasErrors
  }

  submit() {
    if (!this.valid()) return
    if (this.options.onSubmit) return this.options.onSubmit(toJS(this.changes))
    if (this.options.perform) return this.perform()
  }

  perform() {
    const { redirectTo, cord, flash, onSuccess, onError, perform, formatPayload } = this.options
    let params = null
    const values = this.changes

    if (perform === `create`) {
      params = { [cord.name]: toJS(values) }
    } else if (perform === `update`) {
      params = { ids: [this.values.get(`id`)], [cord.name]: toJS(values) }
    }

    const payload = formatPayload ? formatPayload(toJS(values)) : params

    cord.perform(perform, payload).then(response => {
      onSuccess && onSuccess(values, response)
      if (flash) flashStore.add(flash)
      if (redirectTo) redirect(redirectTo(toJS(values), response))
    }).catch(error => {
      if (onError) return onError(error)
      console.error(error)
      flashStore.add(
        error.
          response.
          data.
          exception.
          replace(`#<ActiveRecord::RecordInvalid: Validation failed: `, ``).
          replace(`>`, ``)
      )
    })
  }

  reset(newValues) {
    this.changes.clear()
    if (newValues) this.values.replace(newValues)
  }

}
