import React from "react"
import PropTypes from "prop-types"
import { styled } from "lib/utils/theme"
import decorate from "lib/utils/decorate"

export class FaIcon extends React.Component {
  static prefix = `fa`

  static propTypes = {
    className: PropTypes.string,
    color: PropTypes.string,
    hoverColor: PropTypes.string,
    icon: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    size: PropTypes.number,
    style: PropTypes.object,
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
    const { onClick, style } = this.props
    return <i className={this.className} style={style} onClick={onClick} />
  }
}
export default decorate(
  styled`
    ${({ color, theme, size }) => {
    const col = color || theme.darkBackground
    const sze = size || 1
    return `
        color: ${col};
        font-size: ${sze}em;
        `
  }}
  ${({ hoverColor }) => {
    if (hoverColor) {
      return `
          &:hover{
            color: ${hoverColor};
          }
          `
    }
  }}
`,
  FaIcon,
)
