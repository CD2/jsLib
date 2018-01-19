import React from "react"
import { observable, action, computed, toJS } from "mobx"

import FaIcon from "lib/components/fa_icon"

export class IndexQuery {
  @observable ids = []
  @observable fetching = false
  @observable fetched = false
  @observable fetch_error = false

  constructor(idFetcher, options = {}) {
    this.idFetcher = idFetcher
    this.options = options
    this.scope = options.scope || `all`
    this.onChange = options.onChange

    if (options.defaultSort) {
      const { column, dir } = options.defaultSort
      this.sort.column = column
      this.sort.dir = dir
    }
  }

  @observable searches = observable.map()

  setSearchValue(key, value) {
    this.searches.set(key, value)
  }

  getSearchValue(key) {
    return this.searches.get(key) || ``
  }

  @observable
  sort = {
    column: null,
    dir: null,
  }
  @action
  handleSortChange = sort_col => {
    if (this.sort.column === sort_col) {
      let nextSort = { ASC: `DESC`, DESC: `ASC` }[this.sort.dir]
      this.sort.dir = nextSort
    } else {
      this.sort.column = sort_col
      this.sort.dir = `ASC`
    }
    this.fetch()
  }
  renderSortIcon(column) {
    if (this.sort.column === column && this.sort.dir) {
      const icon = this.sort.dir === `ASC` ? `chevron-up` : `chevron-down`
      return <FaIcon icon={icon} />
    }
  }

  //FILTERS
  @observable filters = observable.map()

  @action
  getFilterState(filter_name) {
    if (!this.filters.has(filter_name)) {
      this.filters.set(filter_name, observable.map())
    }
    return this.filters.get(filter_name)
  }

  @action
  handleFilterChange = (filter_name, option) => {
    this.getFilterState(filter_name).set(option, !this.getFilterState(filter_name).get(option))
    this.fetch()
  }

  @action
  setFilter = (filterName, newFilters) => {
    this.getFilterState(filterName).replace(newFilters)
  }

  //QUERY

  @computed
  get query() {
    let params = {}

    if (this.sort.dir) params.sort = `${this.sort.column} ${this.sort.dir}`

    Object.entries(toJS(this.filters)).forEach(([filter_name, options]) => {
      if (!options) return
      params[filter_name] = Object.keys(options).filter(key => options[key])
    })

    Object.entries(this.searches.toJS()).forEach(([key, value]) => {
      params[key] = value
    })

    params = { ...params }
    return params
  }

  @action
  fetch() {
    this.fetching = true
    return this.idFetcher(this.scope, this.query).then(
      action(`fetchIdsFulfilled`, response => {
        this.fetching = false
        this.onChange && this.onChange(response[this.scope], this.ids)
        this.ids.replace(response[this.scope])
        return this.ids
      }),
    )
  }
}
export default IndexQuery
