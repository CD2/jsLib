import React from "react"
import PropTypes from "prop-types"
import { observer } from "mobx-react"
import { observable, computed, action } from "mobx"

export default class RubyMoney {
  @action
  static doMathGud = value => {
    const f = parseInt(value.fractional)
    const su = parseInt(value.currency.subunit_to_unit)

    const units = Math.floor(f / su)
    const subunits = f % su
    return {
      units: units,
      subunits: subunits,
    }
  }

  static returnValue(value) {
    if (!value) return `noval`
    const result = this.doMathGud(value)
    if (!result.units) return 0
    return parseFloat(`${result.units}.${result.subunits}`)
  }

  static renderAddValue(value, math) {
    const result = this.returnValue(value) + math
    if (!result) return `---`
    return `${value.currency.symbol}${result}`
  }

  static renderValue(value) {
    if(!value) return null
    const result = this.returnValue(value)
    if (!result) return `---`
    return `${value.currency.symbol}${result}`
  }
}

// {
//   "fractional" => "10.0",
//   "currency" => {
//     "id" => "gbp",
//     "alternate_symbols" => [],
//     "decimal_mark" => ".",
//     "disambiguate_symbol" => nil,
//     "html_entity" => "&#x00A3;",
//     "iso_code" => "GBP",
//     "iso_numeric" => "826",
//     "name" => "British Pound",
//     "priority" => 3,
//     "smallest_denomination" => 1,
//     "subunit" => "Penny",
//     "subunit_to_unit" => 100,
//     "symbol" => "£",
//     "symbol_first" => true,
//     "thousands_separator" => ",",
//   },
//   "bank" => { "store" => { "index" => {  }, "options" => {  }, "mutex" => {  }, "in_transaction" => false }, "rounding_method" => nil },
// }
