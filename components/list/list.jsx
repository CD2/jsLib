import React from 'react'
import { styled } from 'utils/theme'

@styled`
  > .list_item:not(:last-child) {
    ${({spacing, separator, theme}) => {
      if (separator) {
        return (
          `
            padding-bottom: ${(theme.spacing[spacing] || spacing)}px;
            margin-bottom: ${(theme.spacing[spacing] || spacing)}px;
            border-bottom: 1px solid ${theme.border};
          `
        )
      } else {
        return `padding-bottom: ${theme.spacing[spacing] || spacing}px`
      }
    }}

  }
`
export default class List extends React.Component {

  static defaultProps = {
    spacing: 'medium',
    separator: false,
  }

  render() {
    const { children, className, itemClass='' } = this.props
    return (
      <div className={className}>
        {React.Children.map(children, child => {
          if (!child) return
          let childClass = child.props.className || ''
          childClass += ` ${itemClass}`
          return React.cloneElement(child, {...child.props, className: childClass })
        })}
      </div>
    )
  }

}
