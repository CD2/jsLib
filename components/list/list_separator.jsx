import React from "react"
import { styled, t } from "lib/utils/theme"
import PropTypes from "prop-types"

@styled`
  border-bottom: 1px solid ${t(`border`)};
  ${({ spacing, theme }) => `
      padding-bottom: ${theme.spacing[spacing] || spacing}px;
      margin-bottom: ${theme.spacing[spacing] || spacing}px;
    `}}
`
export class ListSeparator extends React.Component {
  static propTypes = {
    className: PropTypes.string,
  }

  render() {
    return <div className={this.props.className} />
  }
}
export default ListSeparator
