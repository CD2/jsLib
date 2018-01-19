import React from "react"
import PropTypes from "prop-types"

import { TwitterPicker } from "react-color"

export default class ColorField extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
  }

  handleChange = color => {
    const { onChange } = this.props
    if (onChange) onChange({ name: this.props.name, value: color.hex })
  }

  render() {
    return (
      <TwitterPicker
        triangle="hide"
        color={this.props.value}
        onChangeComplete={this.handleChange}
      />
    )
  }
}
