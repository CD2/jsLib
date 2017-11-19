
import React from 'react'
import PropTypes from 'prop-types'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import Image from "lib/components/image"

@observer
export class ImageField extends React.Component {

  static propTypes = {
    accepts: PropTypes.array,
    multiple: PropTypes.bool,
    name: PropTypes.string,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onRawChange: PropTypes.func,
    onlyImages: PropTypes.bool,
    onlySpreadsheets: PropTypes.bool,
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

  renderPreview() {
    const { value } = this.props
    console.log(value)
    if (this.preview_src) return <img alt="" src={this.preview_src} height={240} />
    if (value) return <Image size={`150x150`} uid={value.uid} />
    if (this.props.model && this.props.model.get(`image_uid`)) {
      return <Image size={`150x150`} uid={this.props.model.get(`image_uid`)} />
    }
  }

  render() {
    const { name, multiple, onFocus, onlyImages, onlySpreadsheets } = this.props
    let acceptedTypes = null

    if (onlyImages) {
      acceptedTypes = `.jpg,.png,.jpeg,.gif,.tiff,.svg,bmp`
    } else if (onlySpreadsheets) {
      acceptedTypes = `.xls,.xlw,.xlt,.xml,.xlsx,.xlsm,.xltx,.xltm,.xlsb`
    }
    console.log(this.props)
    return (
      <div>
        <div>
          {this.renderPreview()}
        </div>
        <input
          ref={element => this.fileInput = element}
          type="file"
          name={name}
          multiple={multiple}
          accept={acceptedTypes || this.props.accepts.join()}
          onChange={this.handleChange}
          onFocus={onFocus}
        />
      </div>
    )
  }

}
export default ImageField
