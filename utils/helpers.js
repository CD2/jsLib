/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import Constants from 'libDependencies/constants'

export const title = (title) => {
  title = Constants.SITE.NAME ? `${title} | ${Constants.SITE.NAME}` : ``
  return (<title>{`${title}`}</title>)
}

export const pluralize = (count, single, plural) => {
  return count === 1 ? single : plural || `${single}s`
}

export const simple_format = (text) => {
  return text.split(`\n`).map(p => <p key={p}>{p}</p>)
}

export const truncate = (text, { omission=`...`, length: truncate_at=20, separator }={}) => {
  const maximum_length = truncate_at - omission.length
  const stop = separator
    ? text.lastIndexOf(separator, maximum_length) || maximum_length
    : maximum_length
  return `${text.substring(0, stop)}${omission}`
}

export const titleCase = (text) => {
  return text.
    replace(/([^A-Z])([A-Z])/g, `$1 $2`).
    replace(/[_-]+/g, ` `).
    toLowerCase().
    replace(/(^\w|\b\w)/g, (m) => { return m.toUpperCase() }).
    replace(/\s+/g, ` `).
    replace(/^\s+|\s+$/, ``)
}
