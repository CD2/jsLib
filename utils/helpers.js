/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import Constants from 'libDependencies/constants'

export const title = (title) => {
  title += Constants.SITE.NAME ? ` | ${Constants.SITE.NAME}` : ``
  return (<title>{`${title}`}</title>)
}
