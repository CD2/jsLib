import React from 'react'
import PropTypes from 'prop-types'
import Papa from 'papaparse'
import { observer } from 'mobx-react'
import { observable } from 'mobx'

import decorate from 'lib/utils/decorate'
import { styled } from 'lib/utils/theme'

import LoadingSpinner from 'lib/components/loading_spinner'
import FileUploader from './FileUploader'
import FailureSlide from './FailureSlide'
import FinishSlide from './FinishSlide'
import ColumnMapping from './ColumnMapping'

export class CSVImporter extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    columns: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      key: PropTypes.string,
    })).isRequired,
    noCompleteMessage: PropTypes.bool,
    onComplete: PropTypes.func.isRequired,
    onFinish: PropTypes.func.isRequired,
    removeEmptyRows: PropTypes.bool,
    returnAsMappedObjects: PropTypes.bool,
    returnFile: PropTypes.bool,
  }

  static defaultProps = {
    noCompleteMessage: false,
    removeEmptyRows: false,
    returnAsMappedObjects: false,
    returnFile: false,
  }

  state = {
    position: null,
    csv: null,
    file: null,
    headersRowIndex: 0,
    parsingErrors: null,
    mappings: null,
  }

  @observable submitting = false

  processCSV = (file, headersRow) => {
    const csv = Papa.parse(file, { skipEmptyLines: true })

    if (csv.errors.length > 0) {
      this.setState({ position: `parsingError`, parsingErrors: csv.errors })
    } else {
      this.setState({ headersRowIndex: headersRow - 1, csv: csv.data, position: `column_mapping` })
    }
  }

  handleFileUpload = (file, headersRow) => {
    const reader = new FileReader()

    this.setState({ position: `loading`, file })
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

  handleComplete = (mappings) => {
    if (this.props.returnFile) {
      return this.props.onComplete(this.state.file, mappings)
    } else if (this.props.returnAsMappedObjects) {
      return this.props.onComplete(this.getMappedObjects(mappings))
    } else {
      return this.props.onComplete(this.state.csv, mappings)
    }
  }

  handleFinish = () => {
    this.props.onFinish && this.props.onFinish()
    this.setState({ position: null })
  }

  handleSubmit = mappings => {
    this.submitting = true
    this.setState({ position: `loading` })
    this.handleComplete(mappings).then(() => {
      if (!this.props.noCompleteMessage) this.setState({ position: `success` })
      setTimeout(this.handleFinish, 5000)
    }).catch(() => {
      if (!this.props.noCompleteMessage) this.setState({ position: `failure` })
      setTimeout(this.handleFinish, 5000)
    })

  }

  renderLoading = () => {
    if (this.submitting) {
      return (
        <div>
          <h3>Your CSV is being processed</h3>
          <LoadingSpinner />
        </div>
      )
    }

    return <LoadingSpinner />
  }

  renderContent = () => {
    const { position, csv, headersRowIndex, parsingErrors } = this.state

    switch(position) {
    case `column_mapping`:
      return (
        <ColumnMapping
          databaseColumns={this.props.columns}
          headersRowIndex={headersRowIndex}
          csv={csv}
          submitting={this.submitting}
          onSubmit={this.handleSubmit}
        />
      )
    case `parsingError`:
      return <FailureSlide errors={parsingErrors} />
    case `failure`:
    case `success`:
      return <FinishSlide failure={this.state.position === `failure`} />
    case `loading`:
      return this.renderLoading()
    default:
      return <FileUploader onChange={this.handleFileUpload} />
    }
  }

  render() {
    return (
      <div className={this.props.className}>
        {this.renderContent()}
      </div>
    )
  }

}

export default decorate(
  styled`
  .csv-importer__input {
    margin: 20px 0;

    input, select {
      display: block;
      margin-top: 10px;
    }
  }
  .csv-importer__value {
    margin: 10px;
    font-size: 0.8rem;
  }
  `,
  observer,
  CSVImporter
)
