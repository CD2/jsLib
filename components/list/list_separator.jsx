import React from 'react'
import PropTypes from 'prop-types'
import { styled, t } from 'utils/theme'

@styled`
  border-bottom: 1px solid ${t(`border`)};
  ${({ spacing, theme }) => `
      padding-bottom: ${(theme.spacing[spacing] || spacing)}px;
      margin-bottom: ${(theme.spacing[spacing] || spacing)}px;
    `
  }}
`
export default class ListSeparator extends React.Component {

  static propTypes = {
    className: PropTypes.string,
  }

  render() {
    return (
      <div className={this.props.className} />
    )
  }

}
