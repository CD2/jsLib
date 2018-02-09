/* eslint-disable react/jsx-filename-extension */
import React from "react"
import Constants from "libDependencies/constants"

export const title = title => {
  title += Constants.SITE.NAME ? ` | ${Constants.SITE.NAME}` : ``
  return <title>{`${title}`}</title>
}

export const numberToCurrency = (number = 0, currency = `£`) => {
  return `${currency}${parseFloat(number).toFixed(2)}`
}

export const monetizeDisplay = monetizeObject => {
  if (!monetizeObject) return numberToCurrency(0.0)
  const currency = monetizeObject.currency && monetizeObject.currency.symbol
  return numberToCurrency(monetizeObject.fractional / 100, currency)
}
