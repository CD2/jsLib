import BaseValidator from './base'
import { toJS } from 'mobx'

export default class PresenceValidator extends BaseValidator {

  static message = `is required`

  defaultOptions() {
    return {
      allow_blank: true,
      altName: null,
    }
  }

  isPresent(rawValue) {
    const value = toJS(rawValue)
    //TODO: make this work with objects and arrays
    if (typeof value === `string`) return (this.options.allow_blank ? value : value.trim()) !== ``
    if (Array.isArray(value)) {
      return (this.options.allow_blank ? value : value.filter(x=>x)).length !== 0
    }
    if (typeof value === `boolean`) return true
    if (value && typeof value === `object` && value.toString() === `[object File]`) {
      return value.name
    }
    if (value && typeof value === `object`) return Object.keys(value).length !== 0
    return !!value
  }

  validate(rawValue, values) {
    if (this.options.altName && values.has(this.options.altName)) {
      return this.isPresent(values.get(this.options.altName))
    }

    return this.isPresent(rawValue)
  }


}
