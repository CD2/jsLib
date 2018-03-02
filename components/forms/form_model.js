import { redirect } from "lib/utils/router"
import flashStore from "lib/stores/Flash"
import { observable, action, computed, toJS } from "mobx"
import { validateForm } from "lib/components/forms"

export default class FormModel {
  @observable values = observable.shallowMap()
  @observable changes = observable.shallowMap()
  @observable errors = observable.shallowMap()

  @computed
  get completeValues() {
    const full = observable.shallowMap(toJS(this.values))
    full.merge(this.changes)
    return full
  }

  constructor({ fields, options } = {}) {
    const values = fields.reduce((newValues, field) => {
      let newValue = null

      if (options.values) {
        newValue = options.values[field.defaultName || field.name]
      }
      if (field.formatValue && newValue) newValue = field.formatValue(newValue)
      if (newValue) newValues[field.name] = newValue

      return newValues
    }, {})
    const changes = fields.reduce((defaults, field) => {
      if (field.default && (!values || !values[field.name])) {
        defaults[field.name] = field.default
      }

      return defaults
    }, {})

    this.values.replace({ ...options.values, ...values })
    this.changes.replace(changes)

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

  hasChanges() {
    return Object.keys(toJS(this.changes)).length > 0
  }

  @action
  set(key, value) {
    this.changes.set(key, value)
  }

  @action
  valid() {
    if (!this.validations) return true
    const { onError } = this.options
    const errors = validateForm(this.completeValues, this.validations)
    const Validates = Object.keys(errors).length === 0

    this.errors.replace(errors)
    onError && onError(errors)

    return Validates
  }

  submit() {
    if (!this.valid()) return
    console.warn(`asdasdasd`)
    if (this.options.onSubmit) {
      if (this.options.doesntCatch) {
        return this.options.onSubmit(toJS(this.changes))
      }
      return this.options.onSubmit(toJS(this.changes)).catch(this.handleServerError)
    }
    if (this.options.perform) return this.perform()
  }

  handleServerError = (request = null) => {
    const { onError } = this.options
    if (request && request.response) {
      const data = request.response.data
      const errors = data.error_for ? data.error_for.message : {}
      const errorFlash = data.exception
        ? data.exception
            .replace(`#<ActiveRecord::RecordInvalid: Validation failed: `, ``)
            .replace(`>`, ``)
        : ``
      this.errors.replace(errors)
      onError && onError(errors)
      errorFlash && flashStore.add(errorFlash, { level: `error` })
      window.scrollTo(0, 0)
    } else {
    }
  }

  perform(payloadValues = null) {
    if (!this.hasChanges() && !payloadValues) return
    const { redirectTo, cord, flash, onSuccess, perform, formatPayload, scroll } = this.options
    let params = null
    const values = payloadValues || this.changes

    if (perform === `create`) {
      params = { [cord.name]: toJS(values) }
    } else {
      params = { ids: [this.values.get(`id`)], [cord.name]: toJS(values) }
    }

    const payload = formatPayload ? formatPayload(toJS(values)) : params

    cord
      .perform(perform, payload)
      .then(response => {
        onSuccess && onSuccess(values, response)
        if (scroll) window.scrollTo(0, 0)
        if (flash) flashStore.add(flash)
        if (redirectTo) redirect(redirectTo(toJS(values), response))
      })
      .catch(this.handleServerError)
  }

  reset(newValues) {
    this.changes.clear()
    if (newValues) this.values.replace(newValues)
  }
}
