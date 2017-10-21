import React from 'react'
import PropTypes from 'prop-types'

export default class TextArea extends React.Component {

  static propTypes = {
    initialValue: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onKeyPress: PropTypes.func,
    onRawChange: PropTypes.func,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.object,
  }

  handleChange = (e) => {
    const { onRawChange, onChange } = this.props
    if (onRawChange) onRawChange(e)
    if (onChange) onChange({ name: e.target.name, value: e.target.value })
  }

  render() {
    const { name, value, placeholder, initialValue, onFocus, onKeyPress } = this.props

    return (
      <textarea
        name={name}
        defaultValue={initialValue}
        value={value || ``}
        placeholder={placeholder}
        onChange={this.handleChange}
        onFocus={onFocus}
        onKeyPress={onKeyPress}
      />
    )
  }

}
