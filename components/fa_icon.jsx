import React from 'react'
import PropTypes from 'prop-types'
import { styled } from "utils/theme/index"
import decorate from 'utils/decorate'

export class FaIcon extends React.Component {

  static prefix= `fa`

  static propTypes = {
    icon: PropTypes.string.isRequired,
    hoverColor: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.number,
    onClick: PropTypes.func,
  }

  get prefix() {
    return this.constructor.prefix
  }

  get className() {
    let { className, icon } = this.props
    className += ` ${this.prefix} ${this.prefix}-${icon}`
    return className
  }

  render() {
    const { onClick } = this.props
    return (
      <i className={this.className} onClick={onClick} />
    )
  }
}
export default decorate(
  styled`
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
  `,
  FaIcon
)
