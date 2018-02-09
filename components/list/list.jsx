import React from "react"
import ListSeparator from "./list_separator"
import PropTypes from "prop-types"
import { styled } from "lib/utils/theme"

@styled`
  > .list_item:not(:last-child) {
    ${({ spacing, separator, theme }) => {
      if (!separator) {
        return `padding-bottom: ${theme.spacing[spacing] || spacing}px`
      }
    }}

  }
  > .list_item {
    ${({ endSpace, spacing, theme }) => {
      if (endSpace) {
        return `padding-bottom: ${theme.spacing[spacing] || spacing}px`
      }
    }}
  }
  }
`
export class List extends React.Component {
  static propTypes = {
    children: PropTypes.any,
    className: PropTypes.string,
    itemClass: PropTypes.string,
    separator: PropTypes.bool,
    spacing: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }

  static defaultProps = {
    spacing: `medium`,
    separator: false,
    endSpace: false,
  }

  render() {
    const {
      className,
      children,
      separator,
      spacing,
      itemClass = ``,
    } = this.props
    const mappedChildren = React.Children.map(children, (child, i) => {
      if (!child) return
      let childClass = child.props.className || ``
      childClass += ` ${itemClass}`
      child = React.cloneElement(child, {
        key: `c_${i}`,
        ...child.props,
        className: childClass,
      })
      if (separator && i !== 0) {
        return [<ListSeparator spacing={spacing} key={i} />, child]
      }
      return child
    })

    return <div className={className}>{mappedChildren}</div>
  }
}
export default List
