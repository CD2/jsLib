import React from 'react'
import PropTypes from 'prop-types'
import { styled, t } from 'utils/theme'

@styled`
  ${({ background, theme }) => {
    const bg = background || theme.background
    return `background-color: ${bg};`
  }}
  > div {
    width: 100%;
    ${({ width, theme, wide }) => {
      const siteWidth = wide ? theme.wideSiteWidth : theme.siteWidth
      return `max-width: ${(width || siteWidth)}px;`
    }}
    margin: 0 auto;
    ${({ spacing, theme }) => {
      return `padding: ${(theme.spacing[spacing] || spacing || theme.spacing.small)}px ${theme.gutterWidth / 2}px;`
    }
  }
  position: relative;
`
export default class Wrapper extends React.Component {

  static PropTypes = {
    width: PropTypes.number,
    background: PropTypes.string,
    spacing: PropTypes.number,
    wide: PropTypes.bool,
  }

  render() {
    const { className, children } = this.props

    return (
      <div className={className}>
        <div>
          {children}
        </div>
      </div>
    )
  }

}
