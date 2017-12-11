import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { get } from 'lib/utils/api_http'
import Overlay from 'lib/components/overlay'
import decorate from 'lib/utils/decorate'
import { Form, Input } from 'lib/components/forms'
import ResultsArea from './results_area'

const search = (query, models) => {
  return get(`/search`, { query, models }).then(response => response.data)
}

export class SiteSearch extends React.Component {

  static propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string,
    }),
    models: PropTypes.object.isRequired,
  }

  static defaultProps = {
    models: {}
  }

  state = {
    searchValue: ``,
    query: ``,
    results: [],
    open: false,
  }

  componentWillReceiveProps(props) {
    if (props.location.pathname !== this.props.location.pathname) {
      this.clearResults()
    }
  }

  fetchResults(query) {
    if (query) {
      search(query, Object.keys(this.props.models) ).then(results => {
        this.setState({ results, query, open: true })
      })
    } else {
      this.clearResults()
    }
  }

  clearResults() {
    this.setState({
      searchValue: ``,
      query: ``,
      results: null,
      open: false,
    })
  }

  anyResults() {
    return this.state.results && this.state.results.length > 0
  }

  handleSearchChange = (e) => {
    this.setState({ searchValue: e.value })
    this.fetchResults(e.value)
  }

  handleFocus = (e) => {
    e.target.select()
    this.setState({ open: true })
  }

  handleBlur = () => {
    this.setState({ open: false })
  }

  handleClick = () => {
    this.setState({
      open: false,
      searchValue: ``,
    })
  }

  render() {
    const { open, results, query } = this.state
    return (
      <div className="app-bar__search">
        <Form>
          <Input
            type="search"
            placeholder={this.props.placeholder || `Search for the skills you want to learn`}
            value={this.state.searchValue}
            onChange={this.handleSearchChange}
            onFocus={this.handleFocus}
          />
          {open && <Overlay onClick={this.handleBlur} belowAppBar />}
          {open && this.anyResults() &&
          <ResultsArea
            results={results}
            query={query}
            onClick={this.handleClick}
            models={this.props.models}
          />
          }
        </Form>
      </div>
    )
  }

}
export default decorate(
  withRouter,
  SiteSearch
)
