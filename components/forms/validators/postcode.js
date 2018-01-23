/* eslint-disable max-len,no-useless-escape */
import BaseValidator from "./base"

export class PostcodeValidator extends BaseValidator {
  static message = `must be a valid postcode`

  validate(value) {
    return /^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z]))))\s?[0-9][A-Za-z]{2})$/.test(
      value,
    )
  }
}
export default PostcodeValidator
