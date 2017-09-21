export default class BaseValidator {

  static message

  constructor({message, ...options}={}) {
    this.error_message = message
    this.options = {...this.defaultOptions(), ...options}
  }

  defaultOptions() {
    return {}
  }

  message() {
    return this.error_message || this.constructor.message || 'is invalid'
  }

}
