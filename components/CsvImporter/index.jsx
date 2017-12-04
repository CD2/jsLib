import React from 'react'
import PropTypes from 'prop-types'
import Papa from 'papaparse'

import LoadingSpinner from 'lib/components/loading_spinner'
import FileUploader from './FileUploader'
import FailureSlide from './FailureSlide'
import ColumnMapping from './ColumnMapping'

export default class CSVImporter extends React.Component {

  static propTypes = {
    columns: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      key: PropTypes.string,
    })).isRequired,
    onComplete: PropTypes.func.isRequired,
    returnAsMappedObjects: PropTypes.bool,
  }

  static defaultProps = {
    returnAsMappedObjects: false,
  }

  state = {
    position: null,
    csv: null,
    headersRowIndex: 0,
    parsingErrors: null,
    mappings: null,
  }

  processCSV = (file, headersRow) => {
    const csv = Papa.parse(file)

    if (csv.errors.length > 0) {
      this.setState({ position: `failure`, parsingErrors: csv.errors })
    } else {
      this.setState({ headersRowIndex: headersRow - 1, csv: csv.data, position: `column_mapping` })
    }
  }

  handleFileUpload = (file, headersRow) => {
    const reader = new FileReader()

    this.setState({ position: `loading` })
    reader.onload = (e) => this.processCSV(e.target.result, headersRow)
    reader.readAsText(file)
  }

  getMappedObjects = mappings => {
    const headersRow = this.state.csv.find((row, index) => index === this.state.headersRowIndex)
    const mappingPositions = Object.entries(mappings).reduce((positions, [key, csvKey]) => {
      positions[key] = headersRow.findIndex(csvColumn => csvColumn === csvKey)

      return positions
    }, {})
    const csvRows = this.state.csv.filter((row, index) => index !== this.state.headersRowIndex)

    return csvRows.map(row => {
      return Object.entries(mappingPositions).reduce((newObject, [key, position]) => {
        newObject[key] = row[position]
        return newObject
      }, {})
    })
  }

  handleColumnMapping = mappings => {
    if (this.props.returnAsMappedObjects) {
      this.props.onComplete(this.getMappedObjects(mappings))
    } else {
      this.props.onComplete(this.state.csv, mappings)
    }
  }

  render() {
    const { position, csv, headersRowIndex, parsingErrors } = this.state

    switch(position) {
    case `column_mapping`:
      return (
        <ColumnMapping
          databaseColumns={this.props.columns}
          headersRowIndex={headersRowIndex}
          csv={csv}
          onSubmit={this.handleColumnMapping}
        />
      )
    case `failure`:
      return <FailureSlide errors={parsingErrors} />
    case `loading`:
      return <LoadingSpinner />
    default:
      return <FileUploader onChange={this.handleFileUpload} />
    }
  }

}
