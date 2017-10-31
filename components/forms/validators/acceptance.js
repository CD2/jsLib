import BaseValidator from './base'

export class PresenceValidator extends BaseValidator {

  static message = `must be accepted`

  defaultOptions() {
    return {
      accept: [true, 1, `1`, `true`]
    }
  }

  validate(value) {
    return this.options.accept.includes(value)
  }


}
export default PresenceValidator