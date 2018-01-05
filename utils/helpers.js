/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import Constants from 'libDependencies/constants'

export const title = (title) => {
  title += Constants.SITE.NAME ? ` | ${Constants.SITE.NAME}` : ``
  return (<title>{`${title}`}</title>)
}

export const number_as_currency = (number, currency='£') => {
  let num = number || 0
  return `${currency}${parseFloat(num).toFixed(2)}`
}
