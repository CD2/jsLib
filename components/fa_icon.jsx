import React from 'react'
import PropTypes from 'prop-types'
import {styled} from "utils/theme/index"
@styled`
  ${({ color, theme, size }) => {
    const col = color || theme.darkBackground 
    const sze = size || 1
    return (
      `
      color: ${col};
      font-size: ${sze}em;
      `
    )
  }}
  ${({ hoverColor }) => {
    if(hoverColor) {
      return (
        `
        &:hover{
          color: ${hoverColor};
        }
        `
      )
    }
  }}
`
export default class FaIcon extends React.Component {

  static PropTypes = {
    icon: PropTypes.string,
    hoverColor: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.number,
  }

  render() {
    const { icon, className } = this.props

    return (
      <i className={`fa fa-${icon} ${className}`} />
    )
  }

}
