import React from "react"
import PropTypes from "prop-types"
import Papa from "papaparse"
import { observer } from "mobx-react"
import { observable, action, toJS } from "mobx"

import decorate from "lib/utils/decorate"
import { styled } from "lib/utils/theme"

import LoadingSpinner from "lib/components/loading_spinner"
import FileUploader from "./FileUploader"
import FailureSlide from "./FailureSlide"
import FinishSlide from "./FinishSlide"
import ColumnMapping from "./ColumnMapping"

export class CSVImporter extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    columns: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        key: PropTypes.string,
      }),
    ).isRequired,
    noCompleteMessage: PropTypes.bool,
    onComplete: PropTypes.func.isRequired,
    onFinish: PropTypes.func,
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

  @observable position: null
  @observable csv: null
  @observable file: null
  @observable headersRowIndex: 0
  @observable parsingErrors: null
  @observable mappings: null
  @observable submitting = false

  @action
  processCSV = (file, headersRow) => {
    const csv = Papa.parse(file, { skipEmptyLines: true })

    if (csv.errors.length > 0) {
      this.position = `parsingError`
      this.parsingErrors = csv.errors
    } else {
      this.headersRowIndex = headersRow - 1
      this.csv = csv.data
      this.position = `column_mapping`
    }
  }

  @action
  handleFileUpload = (file, headersRow) => {
    const reader = new FileReader()

    this.position = `loading`
    this.file = file
    reader.onload = e => this.processCSV(e.target.result, headersRow)
    reader.readAsText(file)
  }

  getMappedObjects = mappings => {
    const headersRow = this.csv.find((row, index) => index === this.headersRowIndex)
    const mappingPositions = Object.entries(mappings).reduce((positions, [key, csvKey]) => {
      positions[key] = headersRow.findIndex(csvColumn => csvColumn === csvKey)

      return positions
    }, {})
    const csvRows = this.csv.filter((row, index) => index !== this.headersRowIndex)

    return csvRows.map(row => {
      return Object.entries(mappingPositions).reduce((newObject, [key, position]) => {
        newObject[key] = row[position]
        return newObject
      }, {})
    })
  }

  handleComplete = mappings => {
    if (this.props.returnFile) {
      return this.props.onComplete(toJS(this.file), mappings)
    } else if (this.props.returnAsMappedObjects) {
      return this.props.onComplete(this.getMappedObjects(mappings))
    }

    return this.props.onComplete(toJS(this.csv), mappings)
  }

  @action
  handleFinish = () => {
    this.props.onFinish && this.props.onFinish()
    this.position = null
  }

  @action
  handleSubmit = mappings => {
    this.submitting = true
    this.position = `loading`
    this.handleComplete(mappings)
      .then(() => {
        if (!this.props.noCompleteMessage) this.position = `success`
        setTimeout(this.handleFinish, 5000)
      })
      .catch(() => {
        if (!this.props.noCompleteMessage) this.position = `failure`
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
    const { position, csv, headersRowIndex, parsingErrors } = this

    switch (position) {
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
      return <FinishSlide failure={this.position === `failure`} />
    case `loading`:
      return this.renderLoading()
    default:
      return <FileUploader onChange={this.handleFileUpload} />
    }
  }

  render() {
    return <div className={this.props.className}>{this.renderContent()}</div>
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
  CSVImporter,
)
