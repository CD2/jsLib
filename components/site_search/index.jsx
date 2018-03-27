import React from "react"
import PropTypes from "prop-types"
import { withRouter } from "react-router-dom"
import { observer } from "mobx-react"
import { observable, action } from "mobx"
import { get } from "lib/utils/api_http"
import Overlay from "lib/components/overlay"
import decorate from "lib/utils/decorate"
import { Form, Input } from "lib/components/forms"
import ResultsArea from "./results_area"
import { styled } from "../../utils/theme"

const search = (query, models) => {
  return get(`/search`, { query, models }).then(response => response.data)
}

export class SiteSearch extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
    models: PropTypes.object.isRequired,
    placeholder: PropTypes.string,
  }

  static defaultProps = {
    models: {},
  }

  componentWillReceiveProps(props) {
    if (props.location.pathname !== this.props.location.pathname) {
      this.clearResults()
    }
  }

  @observable searchValue = ``
  @observable query = ``
  @observable results = []
  @observable open = false

  @action
  fetchResults(query) {
    if (query) {
      search(query, Object.keys(this.props.models)).then(results => {
        this.results.replace(results)
        this.query = query
        this.open = true
      })
    } else {
      this.clearResults()
    }
  }

  @action
  clearResults() {
    this.searchValue = ``
    this.query = ``
    this.results = []
    this.open = false
  }

  anyResults = () => this.results && this.results.length > 0

  @action
  handleSearchChange = e => {
    this.searchValue = e.value
    this.fetchResults(e.value)
  }

  @action
  handleFocus = e => {
    e.target.select()
    this.open = true
  }

  @action handleBlur = () => (this.open = false)

  @action
  handleClick = () => {
    this.open = false
    this.searchValue = ``
  }

  render() {
    const { open, results, query, searchValue } = this
    return (
      <div className={`${this.props.className} app-bar__search`} style={{ position: `relative` }}>
        <Form>
          <Input
            type="search"
            placeholder={this.props.placeholder || `Search for anything...`}
            value={searchValue}
            onChange={this.handleSearchChange}
            onFocus={this.handleFocus}
          />
          {open && <Overlay belowAppBar clickThrough onClick={this.handleBlur} />}
          {open &&
            this.anyResults() && (
            <ResultsArea
              results={results}
              query={query}
              models={this.props.models}
              onClick={this.handleClick}
            />
          )}
        </Form>
      </div>
    )
  }
}
export default decorate(
  styled`
.form-input {
  z-index: 50000; }
`,
  withRouter,
  observer,
  SiteSearch,
)
