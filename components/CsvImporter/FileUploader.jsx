import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

import decorate from 'lib/utils/decorate'

import Button from 'lib/components/button'

export class FileUploader extends React.Component {

  static propTypes = {
    onChange: PropTypes.func,
  }

  state = {
    file: null,
    headersRow: 1,
  }

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
            onChange={e => this.setState({ file: e.target.files[0] })}
          />
        </label>
        <label htmlFor="csvHeadersRow" className="csv-importer__input">
          Row containing the column headers
          <input
            id="csvHeadersRow"
            value={this.state.headersRow}
            type="number"
            name="headersRow"
            onChange={e => this.setState({ headersRow: e.target.value })}
          />
        </label>
        <Button onClick={() => this.props.onChange(this.state.file, this.state.headersRow)}>
          Submit
        </Button>
      </div>
    )
  }

}

export default decorate(
  observer,
  FileUploader
)
