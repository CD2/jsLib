import React from 'react'
import Fuzzy from 'fuse.js'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

import decorate from 'lib/utils/decorate'

import Button from 'lib/components/button'

export class ColumnMapping extends React.Component {

  static propTypes = {
    csv: PropTypes.array,
    databaseColumns: PropTypes.array,
    headersRowIndex: PropTypes.number,
    onSubmit: PropTypes.func,
    submitting: PropTypes.bool,
  }

  state = {
    values: {},
  }

  componentDidMount() {
    const csvColumns = this.getCSVColumns()
    const fuse = new Fuzzy(
      csvColumns.map(column => ({ value: column })),
      { keys: [`value`], shouldSort: true },
    )
    const searchedValues = this.props.databaseColumns.reduce((values, column) => {
      const searchResults = fuse.search(column.title)
      values[column.key] = searchResults.length > 0 ? searchResults[0].value : csvColumns[0]
      return values
    }, {})

    this.setState({ values: searchedValues })
  }

  getCSVColumns = () => {
    return this.props.csv[this.props.headersRowIndex]
  }

  handleMapping = (databaseKey, csvKey) => {
    this.setState(state => ({ values: { ...state.values, [databaseKey]: csvKey }}))
  }

  renderChosenColumnValues = (column) => {
    const { csv } = this.props
    const { values } = this.state
    const csvKey = values[column.key]

    if (csvKey) {
      const rows = csv.slice(1, 3)
      const csvKeyIndex = this.getCSVColumns().indexOf(csvKey)

      return rows.map((row, index) => (
        <div className="csv-importer__value" key={index}>{row[csvKeyIndex]}</div>
      ))
    }

    return null
  }

  renderMappingInput = (column, index) => (
    <div key={index}>
      <label className="csv-importer__input">
        {column.title}
        <select
          name={column.key}
          value={this.state.values[column.key]}
          onChange={(e) => this.handleMapping(column.key, e.target.value)}
        >
          {this.getCSVColumns().map(key => <option key={key} value={key}>{key}</option>)}
        </select>
      </label>
      {this.renderChosenColumnValues(column)}
    </div>
  )

  render() {
    return (
      <div>
        <h2>Column Mapping</h2>
        <p>
          Please check each of the columns from your csv are correctly assigned to a database column.
        </p>
        <div>
          {this.props.databaseColumns.map(this.renderMappingInput)}
        </div>
        <Button
          onClick={() => this.props.onSubmit(this.state.values)}
          processing={this.props.submitting}
        >
          Submit
        </Button>
      </div>
    )
  }

}

export default decorate(
  observer,
  ColumnMapping
)
