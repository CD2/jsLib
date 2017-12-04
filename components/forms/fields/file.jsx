
import React from 'react'
import PropTypes from 'prop-types'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import FileDownload from "lib/components/file"

@observer
export class FileField extends React.Component {

  static propTypes = {
    accepts: PropTypes.array,
    file_name: PropTypes.string,
    multiple: PropTypes.bool,
    name: PropTypes.string,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onRawChange: PropTypes.func,
    onlySpreadsheets: PropTypes.bool,
    uid: PropTypes.string,
    value: PropTypes.object,
  }

  static defaultProps = {
    accepts: [],
    onlyImages: false,
    onlySpreadsheets: false,
  }


  componentWillReceiveProps(props) {
    if (props.value === null && this.props.value) this.fileInput.value = ``
    if (!props.value) return
    if (props.value instanceof File) {
      let reader = new FileReader()
      reader.onload = action((e) => this.preview_src = e.target.result)
      reader.readAsDataURL(props.value)
    } else {
      this.preview_src = props.value
    }
  }

  @observable preview_src = ``

  handleChange = (e) => {
    const { onRawChange, onChange } = this.props
    if (onRawChange) onRawChange(e)
    if (onChange) {
      const file = e.target.files[0] || {}

      onChange({
        name: e.target.name,
        value: file,
        filename: file.name,
        size: file.size,
        type: file.type,
      })
    }
  }

  render() {
    const { name, multiple, onFocus, onlySpreadsheets } = this.props
    let acceptedTypes = null

    if (onlySpreadsheets) {
      acceptedTypes = `.xls,.xlw,.xlt,.xml,.xlsx,.xlsm,.xltx,.xltm,.xlsb`
    }
    return (
      <div>
        <input
          ref={element => this.fileInput = element}
          type="file"
          name={name}
          multiple={multiple}
          accept={acceptedTypes || this.props.accepts.join()}
          onChange={this.handleChange}
          onFocus={onFocus}
        />
        {this.props.uid ? <FileDownload uid={this.props.uid}>
          {this.props.file_name ? this.props.file_name : `Download`}
        </FileDownload> : null}
      </div>
    )
  }

}
export default FileField
