import React from 'react'
import PropTypes from 'prop-types'
import TableHeading from './heading'
import { styled, t } from 'utils/theme'


@styled`
  , th {
    line-height: 48px;
    padding: 0 18px;
    white-space: nowrap;
    vertical-align: top;
    overflow-x: hidden;
    overflow-y: auto;
    text-overflow: ellipsis;
    text-align: left;
    max-width: 400px;
    color: ${t(`text`)};
    &.sticky {
      position: absolute;
      left: ${t(`gutterWidth`, w=>w/2)}px;
      width: ${t(`stickyTableWidth`)}px;
      background: ${t(`background`)};
      border-left: 1px solid ${t(`border`)};
      box-shadow: 3px 0 5px rgba(0,0,0,0.15);
    }
  }

`
export default class Column extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    filterable: PropTypes.shape({
      type: PropTypes.oneOf([`search`, `choice`])
    }),
    heading: PropTypes.string,
    renderHeading: PropTypes.bool,
    row: PropTypes.any,
    sort: PropTypes.shape({
      current: PropTypes.oneOf([`asc`, `desc`]),
      onChange: PropTypes.func,
    }),
    sticky: PropTypes.bool,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]),
  }

  static defaultProps = {
    renderHeading: false,
  }

  getValue() {
    const { row, value } = this.props
    if (typeof value === `string`) return row[value]
    return value(row)
  }

  getClassName(){
    let className = this.props.className
    className += ` ${this.props.value}`
    if (this.props.sticky) className += ` sticky`
    return className
  }

  handleFilterIconClick = (e) => {
    e.stopPropagation()
    this.setState({ filter_open: !this.state.filter_open })
  }

  renderHeading() {

  }

  render() {
    return this.props.renderHeading
      ? <TableHeading {...this.props} className={this.getClassName()} />
      : (
        <td className={this.getClassName()}>
          {this.getValue()}
        </td>
      )
  }

}
