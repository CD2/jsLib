import React from "react"
import PropTypes from "prop-types"
import { observer } from "mobx-react"
import { observable, action } from "mobx"

import decorate from "lib/utils/decorate"

import Button from "lib/components/button"

export class FileUploader extends React.Component {
  static propTypes = {
    onChange: PropTypes.func,
  }

  @observable file = null
  @observable headersRow = 1

  @action handleSetFile = e => (this.file = e.target.files[0])
  @action handleSetHeadersRow = e => (this.headersRow = e.target.value)

  render() {
    return (
      <div>
        <h2>CSV Importer</h2>
        <p>Upload your file below to begin importing.</p>
        <label htmlFor="csvFileRow" className="csv-importer__input">
          File
          <input
            id="csvFileRow"
            type="file"
            name="csvFile"
            className="csv-importer__input"
            onChange={this.handleSetFile}
          />
        </label>
        <label htmlFor="csvHeadersRow" className="csv-importer__input">
          Row containing the column headers
          <input
            id="csvHeadersRow"
            value={this.headersRow}
            type="number"
            name="headersRow"
            onChange={this.handleSetHeadersRow}
          />
        </label>
        <Button onClick={() => this.props.onChange(this.file, this.headersRow)}>
          Submit
        </Button>
      </div>
    )
  }
}

export default decorate(observer, FileUploader)
