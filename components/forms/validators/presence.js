import BaseValidator from './base'

export default class PresenceValidator extends BaseValidator {

  static message = 'is required'

  validate(value) {
    //TOOD: make this work with objects and arrays
    if (typeof value !== 'string') throw Error('Cant validate presence of anything except string')
    return value.trim() !== ''
  }


}
