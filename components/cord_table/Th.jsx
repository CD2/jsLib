import React from "react"
import PropTypes from "prop-types"

import Filter from "./Filter"
import FaIcon from "lib/components/fa_icon"

import { observable, action, computed } from "mobx"
import { observer } from "mobx-react"
import { styled } from "lib/utils/theme"

import decorate from "lib/utils/decorate"
export class Th extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    filterable: PropTypes.string,
    name: PropTypes.string,
    onSortChange: PropTypes.func,
    query: PropTypes.object,
    sortDir: PropTypes.string,
    sortable: PropTypes.string,
    table: PropTypes.object,
  }

  @computed
  get sortIcon() {
    if (this.props.sortDir) {
      const icon = this.props.sortDir === `asc` ? `chevron-up` : `chevron-down`
      return <FaIcon icon={icon} />
    }
    return undefined
  }

  @observable filtersOpen = false
  @action
  handleFilterClick = () => {
    this.filtersOpen = !this.filtersOpen
  }
  @computed
  get showFilters() {
    return this.props.filterable && this.filtersOpen
  }

  handleClick = () => {
    const { onSortChange } = this.props
    if (onSortChange) onSortChange()
  }

  render() {
    return (
      <th
        className={`${this.props.className} ${this.props.sortable &&
          `sortable`}`}
        onClick={this.handleClick}
      >
        {this.props.filterable && (
          <FaIcon icon="filter" onClick={this.handleFilterClick} />
        )}
        {this.props.children}
        {this.sortIcon}
        {this.showFilters && (
          <Filter
            name={this.props.filterable}
            filter={this.props.query.options.filters[this.props.filterable]}
            selected={this.props.query.filters[this.props.filterable]}
          />
        )}
      </th>
    )
  }
}
export default decorate(
  styled`
    cursor: pointer;
    &.sortable {
      cursor: pointer;
    }
  `,
  observer,
  Th,
)
