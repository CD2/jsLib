import BaseValidator from './base'
import { toJS } from 'mobx'

export class PresenceValidator extends BaseValidator {

  static message = `is required`

  defaultOptions() {
    return {
      allow_blank: true,
    }
  }

  validate(rawValue) {
    const value = toJS(rawValue)
    //TODO: make this work with objects and arrays
    if (typeof value === `string`) return (this.options.allow_blank ? value : value.trim()) !== ``
    if (Array.isArray(value)) {
      return (this.options.allow_blank ? value : value.filter(x=>x)).length !== 0
    }
    if (typeof value === `boolean`) return true
    if (typeof value === `object` && value.toString() === `[object File]`) return value.name
    if (typeof value === `object`) return Object.keys(value).length !== 0
    return !!value
  }


}
export default PresenceValidator
