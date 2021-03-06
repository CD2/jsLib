import React from "react"
import ListSeparator from "./list_separator"
import PropTypes from "prop-types"
import { styled } from "lib/utils/theme"

@styled`
  > *:not(:last-child) {
    ${({ spacing, separator, theme }) => {
  if (!separator) {
    return `margin-bottom: ${theme.spacing[spacing] || spacing}px; display: block`
  }
}}

  }
  > * {
    ${({ endSpace, spacing, theme }) => {
  if (endSpace) {
    return `margin-bottom: ${theme.spacing[spacing] || spacing}px; display: block`
  }
}}
  }
  }
`
export class ListSimple extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    className: PropTypes.string,
    spacing: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }

  static defaultProps = {
    spacing: 10,
  }

  render() {
    const { children, style, className = `` } = this.props
    return (
      <div className={className} style={style}>
        {children}
      </div>
    )
  }
}
export default ListSimple
