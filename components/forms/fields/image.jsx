import React from 'react'
import PropTypes from 'prop-types'

import { observable, action } from 'mobx'
import { observer } from 'mobx-react'
import { styled, theme } from 'utils/theme'

@styled`
  .image-input__input {
    display: none;
  }

  .image-input__label {
    display: inline-block;
    border: ${theme.border} 1px solid;
    background-color: #FFF;
    border-radius: 4px;
    padding: 10px;
  }
`
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
      <div className={this.props.className}>
        {this.renderPreview()}
        <input
          className="image-input__input"
          type="file"
          name={name}
          id={`${name}File`}
          multiple={multiple}
          onChange={this.handleChange}
          onFocus={onFocus}
          disabled={this.props.disabled}
        />
        <label htmlFor={`${name}File`} className="image-input__label">Choose file</label>
      </div>
    )
  }

}
