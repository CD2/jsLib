import BaseValidator from './base'

export class PasswordValidator extends BaseValidator {

  static message = `must be at least 8 characters`

  validate(value) {
    return value && value.length > 7
  }

}
export default PasswordValidator
