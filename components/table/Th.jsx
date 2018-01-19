import React from "react"
import PropTypes from "prop-types"

import Filter from "./Filter"
import FaIcon from "lib/components/fa_icon"

import { observable, action, computed } from "mobx"
import { observer, inject } from "mobx-react"
import { styled } from "lib/utils/theme"

import decorate from "lib/utils/decorate"
export class Th extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    filterable: PropTypes.string,
    name: PropTypes.string,
    query: PropTypes.object,
    sortable: PropTypes.string,
    table: PropTypes.object,
  }

  @computed
  get sortIcon() {
    const { column } = this.props.table.sort
    if (column === this.props.name) {
      const icon = this.sort.dir === `ASC` ? `chevron-up` : `chevron-down`
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
    const { query, sortable } = this.props
    if (sortable) query.handleSortChange(sortable)
  }

  render() {
    return (
      <th
        className={`${this.props.className} ${this.props.sortable && `sortable`}`}
        onClick={this.handleClick}
      >
        {this.props.filterable && <FaIcon icon="filter" onClick={this.handleFilterClick} />}
        {this.props.children}
        {this.props.sortable &&
          this.props.query &&
          this.props.query.renderSortIcon(this.props.sortable)}
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
    i { color: white; }
    cursor: pointer;
    &.sortable {
      cursor: pointer;
    }
  `,
  inject(`query`),
  observer,
  Th,
)
