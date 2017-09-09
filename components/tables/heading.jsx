import React from 'react'
import PropTypes from 'prop-types'
import ColumnFilter from './column_filter'

import chevron_up from 'images/chevron_up.svg'
import chevron_down from 'images/chevron_down.svg'

export default class TableHeading extends React.Component {

  static propTypes = {

  }

  state = {
    filter_open: false,
  }

  getSort() {
    const { sort, sort:{ current, onChange }={} } = this.props
    let callback, sort_icon
    if (sort) {
      callback = () => onChange('asc')
      if (current === 'asc') {
        sort_icon = <img src={chevron_up} />
        callback = () => onChange('desc')
      }
      if (current === 'desc') {
        sort_icon = <img src={chevron_down} />
        callback = () => onChange(null)
      }
    }
    return { callback, sort_icon }
  }

  getFilter() {
    const { filter } = this.props
    let filter_icon
    let filter_popup
    if (filter) {
      filter_icon = <b onClick={this.handleFilterIconClick}>FIL</b>
      if (this.state.filter_open) filter_popup = (<ColumnFilter {...filter} />)
    }
    return { filter_icon, filter_popup }
  }

  handleFilterIconClick = (e) => {
    e.stopPropagation()
    this.setState({filter_open: !this.state.filter_open})
  }

  render() {
    const { className } = this.props
    const { sort_icon, callback } = this.getSort()
    const { filter_icon, filter_popup } = this.getFilter()

    return (
      <th className={className} onClick={callback}>
        {filter_popup}
        {this.props.heading}
        {sort_icon}
        {filter_icon}
      </th>
    )
  }

}
