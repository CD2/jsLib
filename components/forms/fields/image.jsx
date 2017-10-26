
import React from 'react'
import PropTypes from 'prop-types'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import Image from "lib/components/image"

@observer
export default class ImageField extends React.Component {

  static propTypes = {
    multiple: PropTypes.bool,
    name: PropTypes.string,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onRawChange: PropTypes.func,
    value: PropTypes.object,
  }


  componentWillReceiveProps(props) {
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
    if (onChange) {onChange({
      name: e.target.name,
      value: e.target.files[0],
      filename: e.target.files[0].name,
      size: e.target.files[`0`].size,
      type: e.target.files[`0`].type,
    })}
  }

  renderPreview() {
    const { value } = this.props
    if(this.preview_src) return <img alt="" src={this.preview_src} height={240} />
    if(value) return <Image size={'150x150'} uid={value.image_uid} />
    return null
  }

  render() {
    const { name, multiple, onFocus } = this.props

    return (
      <div>
        <div>
          {this.renderPreview()}
        </div>
        <input
          type="file"
          name={name}
          multiple={multiple}
          onChange={this.handleChange}
          onFocus={onFocus}
        />
      </div>
    )
  }

}
