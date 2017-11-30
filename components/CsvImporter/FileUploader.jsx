import React from 'react'
import PropTypes from 'prop-types'

import Button from 'lib/components/button'

export default class FileUploader extends React.Component {

  static propTypes = {
    onChange: PropTypes.func,
  }

  state = {
    file: null,
    headersRow: 1,
  }

  render = () => (
    <div>
      <h2>CSV Importer</h2>
      <p>Upload your file below to begin importing.</p>
      <input
        type="file"
        name="csvFile"
        onChange={e => this.setState({ file: e.target.files[0] })}
      />
      <label htmlFor="csvHeadersRow">Row containing the column headers</label>
      <input
        id="csvHeadersRow"
        value={this.state.headersRow}
        type="number"
        name="headersRow"
        onChange={e => this.setState({ headersRow: e.target.value })}
      />
      <Button onClick={() => this.props.onChange(this.state.file, this.state.headersRow)}>
        Submit
      </Button>
    </div>
  )

}
