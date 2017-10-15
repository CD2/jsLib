import React from 'react'
import PropTypes from 'prop-types'

import { observable, action, computed } from 'mobx'
import { observer } from 'mobx-react'

@observer
export default class ImageField extends React.Component {

  @observable preview_src = ``

  static propTypes = {
    disabled: PropTypes.bool,
    multiple: PropTypes.bool,
    name: PropTypes.string,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onRawChange: PropTypes.func,
  }

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

  componentWillReceiveProps(props) {
    if (!props.value) return
    if (props.value instanceof File) {
      var reader = new FileReader()
      reader.onload = action((e) => this.preview_src = e.target.result)
      reader.readAsDataURL(props.value)
    } else {
      this.preview_src = props.value
    }
  }

  renderPreview() {
    const { value } = this.props
    if (value instanceof File) {
    }
    return (
      <div>
        <img src={this.preview_src} />
      </div>
    )
  }

  render() {
    const { name, multiple, onFocus } = this.props

    return (
      <div>
        {this.renderPreview()}
        <input
          type="file"
          name={name}
          multiple={multiple}
          onChange={this.handleChange}
          onFocus={onFocus}
          disabled={this.props.disabled}
        />
      </div>
    )
  }

}
