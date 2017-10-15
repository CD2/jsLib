import React from 'react'
import ListSeparator from './list_separator'
import { styled } from 'utils/theme'

@styled`
  > .list_item:not(:last-child) {
    ${({ spacing, separator, theme }) => {
  if (!separator) {
    return `padding-bottom: ${theme.spacing[spacing] || spacing}px`
  }
}}

  }
  > .list_item {
    ${({ endSpace, spacing, separator, theme }) => {
  if (endSpace) {
    return `padding-bottom: ${theme.spacing[spacing] || spacing}px`
  }
}}
  }
`
export default class List extends React.Component {

  static defaultProps = {
    spacing: `medium`,
    separator: false,
    endSpace: false,
  }

  render() {
    const { className, separator, spacing, itemClass=`` } = this.props
    const children = React.Children.map(this.props.children, (child, i) => {
      if (!child) return
      let childClass = child.props.className || ``
      childClass += ` ${itemClass}`
      child = React.cloneElement(child, { key: `child_${i}`, ...child.props, className: childClass })
      if (separator && i!==0) {
        return [<ListSeparator spacing={spacing} key={i} />, child]
      } 
      return child
    })

    return (
      <div className={className}>
        {children}
      </div>
    )
  }

}
